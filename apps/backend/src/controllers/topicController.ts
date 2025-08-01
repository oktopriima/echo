import {FastifyReply, FastifyRequest} from "fastify";
import logger from "../lib/logger";
import {CreateTopicService} from "../services/topics/create";

export const NewCreateTopic = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const {owner, keyword, categories, country, language, sorting} = request.body as {
      owner: string;
      keyword: string;
      categories?: string;
      country?: string;
      language?: string;
      sorting?: string;
    };

    const service = new CreateTopicService();
    const output = await service.call(owner, keyword, categories, country, language, sorting);

    if (output.fail()) {
      reply.code(output.httpCode()).send({
        success: false,
        message: output.message(),
      });

      return
    }

    reply.code(200).send({
      success: true,
      message: "Topic created successfully",
      data: output.result(),
    });
  } catch (error: any) {
    logger.error(error);
    reply.code(422).send({
      success: false,
      message: error.message || "Failed create topic",
    });
  }
};