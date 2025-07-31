import Fastify, {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import fastifyCors from "@fastify/cors";
import apiRoutes from "./routes/api.route";
import authPlugin from "./plugins/auth";
import logger from "./lib/logger";

export default function buildApp(): FastifyInstance {
  const app: FastifyInstance = Fastify({
    logger: true,
  });

  app.register(authPlugin);
  app.register(fastifyCors);
  app.register(apiRoutes, {
    prefix: "api",
  });

  app.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply): void => {
    logger.error(err);

    reply.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  });

  return app;
}
