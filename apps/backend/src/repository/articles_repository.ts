import prisma from "../plugins/prisma";
// @ts-ignore
import {articles} from "@prisma/client";
import {DEFAULT_PAGE, DEFAULT_SIZE} from "../config/pagination";

export const create = async (data: {
  date: String,
  time: string,
  dateTime: Date,
  dateTimePub: Date,
  title: string,
  body: string,
  source: any,
  metadata: any,
  apiSource: string,
  url: string,
  image: string,
  uuid: string,
  uri: string,
}): Promise<articles | null> => {

  const article = await prisma.articles.findFirst({
    where: {
      uri: data.uri
    }
  });

  if (article) {
    return article;
  }

  // @ts-ignore
  return prisma.articles.create({data});
}

type SearchParams = {
  keyword?: string;
  page?: number;
  pageSize?: number;
};

export const search = async ({
                               keyword,
                               page = DEFAULT_PAGE,
                               pageSize = DEFAULT_SIZE
                             }: SearchParams) => {
  const whereClause = keyword
    ? {
      OR: [
        {title: {contains: keyword, mode: "insensitive"}},
        {body: {contains: keyword, mode: "insensitive"}},
      ],
    }
    : {};

  const skip = (page - 1) * pageSize;

  const articles = await prisma.articles.findMany({
    where: whereClause,
    skip,
    take: pageSize,
    orderBy: {dateTime: "desc"}
  });

  const total = await prisma.articles.count({
    where: whereClause,
  });

  return {articles, total};
};
