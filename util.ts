import fs from "fs";
import { scrap } from "./scrap";

export function findDifferenceIndices(
  oldAvailability: number[],
  newAvailability: number[]
): number[] {
  return oldAvailability.map((oldVal, i) =>
    Math.max(0, newAvailability[i] - oldVal)
  );
}

export function getAllResorts() {
  if (true) {
    const data = fs.readFileSync("resp.txt", "utf8");
    const json = JSON.parse(data);

    const resorts = json.DATA.resort;
    return resorts;
  }
  return scrap();
}
