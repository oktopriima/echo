import {ServiceBase} from "../base";
import {ServiceResponse} from "../response";
import * as topicRepository from "../../repository/topics_repository";
import * as articleRepository from "../../repository/articles_repository";
import {getNews} from "../../plugins/newsapi";
import { v4 as uuidv4 } from 'uuid';


class NewFetchService extends ServiceBase {
  call = async (): Promise<ServiceResponse> => {
    // get the topics
    const topics = await topicRepository.findAllTopics();

    for (const topic of topics) {
      console.log("fetching news for topic:", topic.keyword);

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
    }

    return this.success(null);
  }
}

export {NewFetchService};