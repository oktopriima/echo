import prisma from "../plugins/prisma";
// @ts-ignore
import {topics} from "@prisma/client";

export const findAllTopics = async (): Promise<topics | null> => {
  return await prisma.topics.findMany();
}

export const findTopicById = async (id: number): Promise<topics | null> => {
  return await prisma.topics.findFirst({
    where: {
      id: id,
    }
  });
}
