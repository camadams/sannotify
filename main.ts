import db from "./db";
import { eq } from "drizzle-orm";
import { findDifferenceIndices, getAllResorts } from "./helpers/util";
import { availabilityTable } from "./db/schema";
import { resorts_array } from "./helpers/contants";
async function main() {
  console.log({ hi: 1 });

  const resorts_scrap_response = await getAllResorts();
  console.log(resorts_scrap_response.resorts.length);
  for (const resort_scrap_response of resorts_scrap_response.resorts) {
    //get resorts availability string
    const camp_name = resort_scrap_response.camp_name;
    const park_name = resort_scrap_response.park_name;
    console.log({ camp_name, park_name });
    const camp_id = resorts_array
      .find((camp) => camp.name === park_name)
      ?.camp.find((camp) => camp.name === camp_name)?.id;
    console.log({ camp_id });
    if (!camp_id) {
      console.log("camp not found");
      throw Error("camp not found");
    }
    const resort_scrap_response_avaliability_array =
      resort_scrap_response.Availability;
    let newAvailabilityString: string = "";

    for (const availability of resort_scrap_response_avaliability_array) {
      const count = availability.split("_")[1];

      newAvailabilityString +=
        (newAvailabilityString.length == 0 ? "" : ",") + count;
    }

    //check if exists, update or insert
    const res = await db
      .select()
      .from(availabilityTable)
      .where(eq(availabilityTable.camp_id, camp_id));
    if (res.length === 0) {
      //insert
      await db
        .insert(availabilityTable)
        .values({ camp_id, availability: newAvailabilityString });
    } else {
      //update
      await db
        .update(availabilityTable)
        .set({ availability: newAvailabilityString })
        .where(eq(availabilityTable.camp_id, camp_id));

      //check for changes
      const oldAvailability = res[0].availability;
      const oldArr = oldAvailability.split(",").map(Number);
      const newArr = newAvailabilityString.split(",").map(Number);

      // if they are out of sync, dont notify
      let mustNotify = true;
      if (oldArr.length - newArr.length >= 2) {
        console.log("lengths do not match");
        mustNotify = false;
      }
      if (mustNotify) {
        //notify
        if (oldArr.length - newArr.length === 1) {
          oldArr.shift();
        }
        const diff = findDifferenceIndices(oldArr, newArr);
        // console.log(diff);
      }
    }
  }
}

main();
