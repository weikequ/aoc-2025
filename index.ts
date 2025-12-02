import { day1Pt1, day1Pt2, day1Pt2Brute } from "./src/1";
import { day2 } from "./src/2";
import { getInput } from "./src/utils";
const number = Bun.argv[2];

switch (number) {
  // 59 m
  case "1.1":
    await day1Pt1(await getInput(1));
    break;
  // 41 m
  case "1.2":
    await day1Pt2(await getInput(1));
    break;
  // 10 m
  case "1.2brute":
    await day1Pt2Brute(await getInput(1));
    break;
  // 47 min
  case "2.1":
    day2(await getInput(2));
    break;
  // 32 min
  case "2.2":
    day2(await getInput(2), true);
    break;
}
