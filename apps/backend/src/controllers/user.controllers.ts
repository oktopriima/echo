import {FastifyRequest, FastifyReply} from "fastify";
import logger from "src/lib/logger";

export const UserGetProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    reply.code(200).send({
      success: true,
      data: request.user,
    });
  } catch (error: any) {
    logger.error(error);
    reply.code(422).send({
      success: false,
      message: error.message || "Failed get user profile",
    });
  }
};
