import {ServiceBase} from "../base";
import {ServiceResponse} from "../response";
import * as topicRepository from "../../repository/topics_repository";
import {getNews} from "../../plugins/newsapi";
import * as articleRepository from "../../repository/articles_repository";
import {v4 as uuidv4} from "uuid";

class SingleFetchService extends ServiceBase {
  call = async (id: number): Promise<ServiceResponse> => {
    const topic = await topicRepository.findTopicById(id);
    if (!topic) {
      return this.error(null, "Failed to fetch topic");
    }

    const articles = await getNews({
      keyword: topic.keyword,
      country: topic.country,
      category: topic.category,
      lang: topic.lang,
      sortedBy: topic.sorting,
    });

    for (const article of articles) {
      await articleRepository.create({
        uri: article.uri,
        date: article.date,
        time: article.time,
        dateTime: new Date(article.dateTime),
        dateTimePub: new Date(article.dateTimePub),
        title: article.title,
        body: article.body,
        source: article.source,
        metadata: article,
        apiSource: "newsapi.io",
        url: article.url,
        image: article.image,
        uuid: uuidv4(),
      });
    }

    return this.success(articles);
  }
}

export {SingleFetchService};