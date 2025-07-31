import fp from "fastify-plugin";
import auth0Verify from "fastify-auth0-verify";
import {TOKEN_DOMAIN, TOKEN_AUDIENCE} from "src/config/app";
import axios, {AxiosResponse} from "axios";
import logger from "src/lib/logger";
import {FastifyInstance} from "fastify";

declare module "fastify" {
  // eslint-disable-next-line no-unused-vars
  interface FastifyRequest {
    token?: string;
  }
}

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(auth0Verify, {
    domain: TOKEN_DOMAIN,
    audience: TOKEN_AUDIENCE,
  });

  if (!fastify.hasDecorator("customAuthenticate")) {
    fastify.decorate(
      "customAuthenticate",
      async function (
        request: import("fastify").FastifyRequest,
        reply: import("fastify").FastifyReply
      ): Promise<undefined> {
        const authHeader: string | undefined = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return reply.code(401).send({
            success: false,
            message: "Missing or malformed Authorization header",
          });
        }

        const token: string = authHeader.split(" ")[1];
        if (!token || token.trim() === "") {
          return reply.code(401).send({
            success: false,
            message: "Bearer token is empty",
          });
        }

        try {
          await fastify.authenticate(request, reply);
          const res: AxiosResponse<any, any> = await axios.get(`${TOKEN_DOMAIN}/userinfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          request.user = res.data;
          request.token = token;
        } catch (err: any) {
          logger.error(err);
          return reply.code(401).send({
            success: false,
            message: "Invalid or expired token",
          });
        }
      }
    );
  }
});
