import { chromium } from "playwright";
import path from "path";
import fs from "fs";

export const applyToJob = async (job: any) => {
  const { platform, jobLink, resumeUsedPath } = job;

  const resumePath = path.resolve(resumeUsedPath);
  if (!fs.existsSync(resumePath)) throw new Error("Resume file not found");

  if (platform === "LinkedIn") {
    const browser = await chromium.launch({ headless: false });
    const page = await (await browser.newContext()).newPage();

    await page.goto(jobLink);
    await page.setInputFiles('input[type="file"]', resumePath);

    // Handle rest of the flow here (clicks, submit, etc.)

    await browser.close();
  }
};
