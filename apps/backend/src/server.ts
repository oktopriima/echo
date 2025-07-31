import "./config/env";
import "reflect-metadata";
import buildApp from "./app";
import {APP_PORT, APP_HOST} from "./config/app";
import {FastifyInstance} from "fastify";
import startWorker from "./worker";

console.log("📦 Starting server setup...");

const app: FastifyInstance = buildApp();

startWorker();

const start: () => Promise<void> = async (): Promise<void> => {
  try {
    if (!app || typeof app.listen !== "function") {
      console.error("❌ buildApp() didn't return a Fastify instance.");
      process.exit(1);
    }

    await app.listen({port: Number(APP_PORT), host: APP_HOST});
    console.log(`🚀 Server is running at http://${APP_HOST}:${APP_PORT}`);
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

start();
