import {EventRegistry, QueryArticlesIter} from "eventregistry";
import {NEWS_API_KEY} from "../config/app";

const er = new EventRegistry({apiKey: NEWS_API_KEY});

interface NewsParams {
  keyword?: string;
  pageSize?: number;
  country?: string;
  category?: string;
  lang?: string;
  sortedBy?: string;
}

export async function getNews(params: NewsParams): Promise<any[]> {
  const q = new QueryArticlesIter(er, {
    maxItems: 10,
    lang: "eng",
    isDuplicateFilter: "skipDuplicates",
  });

  if (params.sortedBy) {
    q.setVal("sortBy", params.sortedBy);

    if (params.sortedBy == "date") {
      q.setVal("dateStart", new Date().toISOString().split("T")[0])
      q.setVal("dateEnd", new Date().toISOString().split("T")[0])
    }
  }

  if (params.pageSize) {
    q.setVal("maxItems", params.pageSize);
  }

  if (params.keyword) {
    q.setVal("keyword", params.keyword);
    q.setVal("conceptUri", await er.getConceptUri(params.keyword));
  }

  if (params.country) {
    q.setVal("sourceLocationUri", await er.getLocationUri(params.country));
  }

  if (params.category) {
    q.setVal("categoryUri", await er.getCategoryUri(params.category));
  }

  if (params.lang) {
    const langArr = params.lang
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);
    q.setVal("lang", langArr);
  }

  const results: any[] = [];
  return await new Promise((resolve, reject) => {
    q.execQuery(
      (item) => {
        results.push(item);
      },
      (err) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
}

export async function getTrendingNews(): Promise<any[]> {
  const q = new QueryArticlesIter(er, {
    sortBy: "date",
    maxItems: 20,
    lang: "eng",
    category: "technology",
    isDuplicated: "skipDuplicates",
  });

  const results: any[] = [];
  return await new Promise((resolve, reject) => {
    q.execQuery(
      (item) => {
        results.push(item);
      },
      (err) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  })
}
