import puppeteer, { Page } from "puppeteer";
import fs from "fs";
import { getURL } from "./helpers/url";

export async function scrap() {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  console.log("Creating new page...");
  const page = await browser.newPage();

  page.setDefaultTimeout(60000);

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
  );

  let ans = { resorts: [] } as { resorts: Record<string, string>[] };

  page.on("response", async (response) => {
    if (
      response.request().method() === "POST" &&
      response.url().includes("getAvailabilityMatch.php")
    ) {
      let json;
      try {
        json = await response.json();
        let newResorts = json.DATA.resort as Record<string, string>[];
        let a = newResorts[0].a;

        console.log(`Found ${newResorts.length} resorts in response`);
        ans.resorts.push(...newResorts);
      } catch (error) {
        console.error("Error reading response:", error);
      }
    }
  });

  page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));
  const url = await getURL();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForResponse((response) =>
      response.url().includes("getAvailabilityMatch.php")
    );
    let listButton = await page.$('a[data-type="list"]');

    await listButton?.click();

    let loadMoreButton = await getLoadMoreButton(page);

    let count = 0;
    while (loadMoreButton) {
      await loadMoreButton.click();
      await page.waitForResponse((response) =>
        response.url().includes("getAvailabilityMatch.php")
      );
      loadMoreButton = await getLoadMoreButton(page);
      if (!loadMoreButton) {
        break;
      }
      count++;
    }
  } catch (error) {
    console.error("Error loading page:", error.message);
  } finally {
    console.log(`Found total of ${ans.resorts.length} resorts`);
    console.log("Closing browser...");
    await browser.close();
  }
  fs.writeFileSync("res.json", JSON.stringify(ans, null, 2));
  return ans;
}
async function getLoadMoreButton(page: Page) {
  let appSecondaryButton = await page.waitForSelector("app-secondary-button");
  let innerText = await appSecondaryButton?.getProperty("innerText");
  const text = await innerText?.jsonValue();
  return text == "RETURN TO MAP" ? null : appSecondaryButton;
}
scrap()
  .then(() => {
    console.log("Script completed successfully");
  })
  .catch((error) => {
    console.error("Script failed with error:", error);
  });
