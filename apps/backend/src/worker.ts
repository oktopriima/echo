import cron from "node-cron";
import logger from "./lib/logger";
import {NewFetchService} from "./services/newsFetch/fetch";

const startWorker = async (): Promise<void> => {
  cron.schedule("0 7 * * *", () => {
    try {
      console.log("Running a daily task every day at 7:00 AM");
      newsFetch();
    } catch (error) {
      logger.error(error);
    }
  });
}

export default startWorker;

const newsFetch = async (): Promise<void> => {
  const service = new NewFetchService();
  const result = await service.call()

  if (result.fail()) {
    console.log("Failed to fetch news");
    console.error(result.message());
  }

  console.log("News fetched successfully")
}