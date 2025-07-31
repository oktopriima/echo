import {ServiceBase} from "../base";
import {ServiceResponse} from "../response";
import logger from "../../lib/logger";
import * as articleRepository from "src/repository/articles_repository";

class NewsListService extends ServiceBase {
  call = async (query: string, page: number, size: number): Promise<ServiceResponse> => {
    try {
      const result = await articleRepository.search({
        keyword: query,
        page: Number(page) || 1,
        pageSize: Number(size) || 10
      });

      return this.success({
        data: result.articles,
        total: result.total,
        page: page,
        size: size,
        total_page: Math.ceil(result.total / size),
      });
    } catch (error) {
      logger.error(error);
      return this.catchError(error, null, "Failed to fetch news list");
    }
  };
}

export {NewsListService};
