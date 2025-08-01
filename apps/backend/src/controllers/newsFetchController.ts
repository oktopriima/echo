import {FastifyReply, FastifyRequest} from "fastify";
import {SingleFetchService} from "../services/newsFetch/singleFetch";
import {NewFetchService} from "../services/newsFetch/fetch";

export const SingleNewsFetchController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const {id} = request.params as { id: number };

    const service = new SingleFetchService();
    const output = await service.call(Number(id));
    if (output.fail()) {
      reply.code(output.httpCode()).send({
        success: false,
        message: output.message(),
      });
      return;
    }

    reply.code(200).send({
      success: true,
      message: "News fetched successfully",
    });

  } catch (error: any) {
    console.log(error)
    reply.code(422).send({
      success: false,
      message: error.message || "Failed fetch news",
    });
  }
};

export const AllTopicsFetchController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const service = new NewFetchService();
    const output = await service.call();
    if (output.fail()) {
      reply.code(output.httpCode()).send({
        success: false,
        message: output.message(),
      });
      return;
    }

    reply.code(200).send({
      success: true,
      message: "All topics fetched successfully",
    });

  } catch (error: any) {
    console.log(error)
    reply.code(422).send({
      success: false,
      message: error.message || "Failed fetch news",
    });
  }
}