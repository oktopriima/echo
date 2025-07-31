import { FastifyRequest, FastifyReply } from "fastify";
import logger from "src/lib/logger";
import { NewsListService } from "src/services/news/list";
import { NewsTrendingService } from "../services/news/trending";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../config/pagination";
import { plainToInstance } from "class-transformer";
import { ListArticleResponse } from "src/dto/article.dto";

export const NewsListController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { q } = request.query as { q?: string };
    const query = q || "";

    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = request.query as {
      page?: number;
      size?: number;
    };

    const service = new NewsListService();
    const output = await service.call(query, page, size);
    if (output.fail()) {
      reply.code(output.httpCode()).send({
        success: false,
        message: output.message(),
      });

      return;
    }

    const result = output.result();
    const articles = plainToInstance(ListArticleResponse, result.data, {
      excludeExtraneousValues: true,
    });

    reply.code(200).send({
      success: true,
      data: articles,
      meta: {
        page: result.page,
        size: result.size,
        total: result.total,
        total_page: result.total_page,
      },
    });

    return;
  } catch (error: any) {
    logger.error(error);
    reply.code(422).send({
      success: false,
      message: error.message || "Failed to fetch news list",
    });
  }
};

export const NewsTrendingController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const service = new NewsTrendingService();
    const output = await service.call();
    if (output.fail()) {
      reply.code(output.httpCode()).send({
        success: false,
        message: output.message(),
      });
    }

    const articles = plainToInstance(ListArticleResponse, output.result(), {
      excludeExtraneousValues: true,
    });
    reply.code(200).send({
      success: true,
      data: articles,
    });
  } catch (error: any) {
    logger.error(error);
    reply.code(422).send({
      success: false,
      message: error.message || "Failed to fetch trending news",
    });
  }
};
