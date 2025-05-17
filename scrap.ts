import puppeteer from "puppeteer";
import fs from "fs";

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
    timeout: 60000,
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
        console.log(`Found ${newResorts.length} resorts in response`);
        ans.resorts.push(...newResorts);
      } catch (error) {
        console.error("Error reading response:", error);
      }
    }
  });

  page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));
  const url =
    "https://www.sanparks.org/reservations/accommodation/filters/parks/6%7C7%7C9/arrivalDate/2025-10-01/departureDate/2025-10-02/camps/0%7C74%7C257%7C76%7C264%7C130%7C223%7C224%7C225%7C268/types/0%7C1%7C2%7C4%7C5%7C6%7C7%7C8%7C9%7C12/features/0";

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 90000,
    });

    try {
      await page.waitForResponse(
        (response) => response.url().includes("getAvailabilityMatch.php"),
        { timeout: 60000 }
      );
      let appSecondaryButton = await page.waitForSelector(
        "app-secondary-button",
        {
          timeout: 60000,
          visible: true,
        }
      );

      let count = 0;
      while (appSecondaryButton) {
        await appSecondaryButton.click();

        await page.waitForResponse(
          (response) => response.url().includes("getAvailabilityMatch.php"),
          { timeout: 60000 }
        );

        try {
          appSecondaryButton = await page.waitForSelector(
            "app-secondary-button",
            {
              timeout: 60000,
              visible: true,
            }
          );

          if (appSecondaryButton) {
            let innerText = await appSecondaryButton.getProperty("innerText");
            const text = await innerText.jsonValue();
            if (text === "RETURN TO MAP") {
              break;
            }
          }
        } catch (error) {
          console.log("Error or timeout waiting for button:", error.message);
          break;
        }

        count++;
      }
    } catch (error) {
      console.error("Error during page interaction:", error.message);
    }
  } catch (error) {
    console.error("Error loading page:", error.message);
  } finally {
    console.log(`Found total of ${ans.resorts.length} resorts`);
    console.log("Closing browser...");
    await browser.close();
  }
  return ans;
}

scrap()
  .then(() => {
    console.log("Script completed successfully");
  })
  .catch((error) => {
    console.error("Script failed with error:", error);
  });
