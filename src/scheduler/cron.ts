import cron from "node-cron";
import { runWorker } from "./jobScheduler";

cron.schedule("*/5 * * * *", () => {
  console.log("Running Job Scheduler");
  runWorker();
});
