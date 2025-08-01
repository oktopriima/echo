import prisma from "../plugins/prisma";
// @ts-ignore
import {topics} from "@prisma/client";

export const findAllTopics = async (): Promise<topics | null> => {
  return prisma.topics.findMany();
}

export const findTopicById = async (id: number): Promise<topics | null> => {
  return prisma.topics.findFirst({
    where: {
      id: id,
    }
  });
}

export const createTopic = async (data: {
  owner: string,
  keyword?: string,
  categories?: string,
  country?: string,
  language?: string,
  sorting?: string,
}): Promise<topics | null> => {
  return prisma.topics.create({data})
}
