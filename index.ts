import { day1Pt1, day1Pt2, day1Pt2Brute } from "./src/1";
import { day2 } from "./src/2";
import { day3 } from "./src/3";
import { day4, day4Pt2 } from "./src/4";
import { day5, day5pt2 } from "./src/5";
import { day6, day6pt2 } from "./src/6";
import { day7, day7pt2 } from "./src/7";
import { day8, day8pt2 } from "./src/8";
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
  // 1hr
  case "3.1":
    day3(await getInput(3));
    break;
  // 1:46
  case "3.2":
    day3(await getInput(3), true);
    break;
  // 33 min
  case "4.1":
    day4(await getInput(4));
    break;
  // 12 min
  case "4.2":
    day4Pt2(await getInput(4));
    break;
  // 25 min
  case "5.1":
    day5(await getInput(5));
    break;
  // 30 mins
  case "5.2":
    day5pt2(await getInput(5));
    break;
  // 31 mins
  case "6.1":
    day6(await getInput(6));
    break;
  // 20 mins
  case "6.2":
    day6pt2(await getInput(6));
    break;
  // 13 mins
  case "7.1":
    day7(await getInput(7));
    break;
  // 40 mins
  case "7.2":
    day7pt2(await getInput(7));
    break;
  case "8.1":
    day8(await getInput(8));
    break;
  // 4 mins
  case "8.2":
    day8pt2(await getInput(8));
    break;
}
