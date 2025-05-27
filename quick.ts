import fs from "fs";
import { parks_array } from "./frontend/src/helpers/contants";

// fs.readFile("res.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const json = JSON.parse(data);
//   const resorts = json.resorts;
//   for (const resort of resorts) {
//     const park_name = resort.park_name;
//     const camp_name = resort.camp_name;

//     var park = parks_array.find((resort) => resort.name === park_name);

//     var camp = park?.camp.find((camp) => camp.name === camp_name);

//     if (camp) {
//       if (!camp["accom"]) {
//         camp["accom"] = [];
//       }
//       camp["accom"].push({
//         id: resort.accommodationtypeno,
//         name: resort.unit_code_name,
//       });
//     }
//     // const resort_id = resortCamps?.id;

//     // resorts_array[resort_id].camp.push({
//     //   id: resort.id,
//     //   name: resort.camp_name,
//     // });
//     // console.log(resortCamps);
//     // if (!resortCamps) {
//     //   console.log({ park_name, camp_name });
//     // }
//     // console.log(resort_id);
//   }
//   fs.writeFileSync("new.json", JSON.stringify(parks_array, null, 2));
// });

const emptyAccoms = parks_array
  .filter((camp) =>
    camp.camp?.some((site) => !site.accom || site.accom.length === 0)
  )
  .map((camp) => ({
    parkName: camp.name,
    emptySites: camp.camp
      ?.filter((site) => !site.accom || site.accom.length === 0)
      .map((site) => site.name),
  }));

console.log("Camps with empty accommodations:", emptyAccoms);
