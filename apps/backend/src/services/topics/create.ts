import {ServiceBase} from "../base";
import {ServiceResponse} from "../response";
import logger from "../../lib/logger";
import * as topicRepository from "../../repository/topics_repository";

class CreateTopicService extends ServiceBase {
  call = async (
    owner: string,
    keyword: string,
    categories?: string,
    country?: string,
    language?: string,
    sorting?: string,
  ): Promise<ServiceResponse> => {
    try {
      const result = await topicRepository.createTopic({
        owner,
        keyword,
        categories,
        country,
        language,
        sorting,
      });

      if (!result) {
        return this.error(null, "Failed to create topic");
      }

      return this.success(result);
    } catch (error) {
      logger.error(error);
      return this.catchError(error, null, "Failed to create topic");
    }
  }
}

export {CreateTopicService};

