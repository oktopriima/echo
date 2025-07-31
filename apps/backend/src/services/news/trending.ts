import {ServiceBase} from "../base";
import {ServiceResponse} from "../response";
import {getTrendingNews} from "../../plugins/newsapi";
import logger from "../../lib/logger";

class NewsTrendingService extends ServiceBase {
  call = async (): Promise<ServiceResponse> => {
    try {
      const news = await getTrendingNews();

      return this.success(news);
    } catch (error) {
      logger.error(error);
      return this.catchError(error, null, "Failed to fetch trending news");
    }
  };
}

export {NewsTrendingService};