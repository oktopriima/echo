/**
 * Custom authentication method to be added to the FastifyInstance.
 *
 * @param request - The incoming Fastify request object.
 * @param reply - The Fastify reply object used to send responses.
 * @returns A promise that resolves when authentication is complete.
 */

import {FastifyRequest, FastifyReply, FastifyInstance} from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    customAuthenticate(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void>;
  }
}
