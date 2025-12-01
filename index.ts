import { day1Pt1, day1Pt2, day1Pt2Brute } from "./src/1";
import { getInput } from "./src/utils";
const number = Bun.argv[2];

switch (number) {
  case "1.1":
    await day1Pt1(await getInput(1));
    break;
  case "1.2":
    await day1Pt2(await getInput(1));
    break;
  case "1.2brute":
    await day1Pt2Brute(await getInput(1));
    break;
}
