import fs from "fs";
import db from "./db";
import { eq } from "drizzle-orm";
import { resortsTable } from "./db/schema";
import { findDifferenceIndices, getAllResorts } from "./util";
async function main() {
  const resorts = getAllResorts();
  for (const resort of resorts) {
    const name = resort.accommodationtypeno;
    const sub_unitcode = resort.sub_unitcode.trim();

    const res = await db
      .select()
      .from(resortsTable)
      .where(eq(resortsTable.sub_unitcode, sub_unitcode));

    const AvailabilityResponse = resort.Availability;
    let newAvailabilityString: string = "";
    for (const availability of AvailabilityResponse) {
      const count = availability.split("_")[1];

      newAvailabilityString +=
        (newAvailabilityString.length == 0 ? "" : ",") + count;
    }
    if (res.length === 0) {
      await db
        .insert(resortsTable)
        .values({ name, sub_unitcode, avaliabilty: newAvailabilityString });
    } else {
      const oldAvailability = res[0].avaliabilty;
      const oldArr = oldAvailability.split(",").map(Number);
      const newArr = newAvailabilityString.split(",").map(Number);

      let mustNotify = true;
      if (oldArr.length - newArr.length >= 2) {
        console.log("lengths do not match");
        mustNotify = false;
      }
      if (mustNotify) {
        if (oldArr.length - newArr.length === 1) {
          oldArr.shift();
        }
        const diff = findDifferenceIndices(oldArr, newArr);
        console.log(diff);
      }
    }
    console.log({ newAvailabilityString });
    await db
      .update(resortsTable)
      .set({ avaliabilty: newAvailabilityString })
      .where(eq(resortsTable.sub_unitcode, sub_unitcode));

    // break;
  }
}

main();
