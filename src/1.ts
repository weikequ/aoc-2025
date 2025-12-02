import { Logger } from "./utils";

function parseInput(input: string) {
  return input.split("\r\n");
}

/**
 *
 * Result: Total 59 minutes to solve (including setup though)
 */
export async function day1Pt1(input: string) {
  const inputList = parseInput(input);
  let cur = 50;
  let res = 0;

  const logger = new Logger("1.1");

  for (const rotStr of inputList) {
    const rot =
      rotStr.charAt(0) === "R"
        ? Number(rotStr.substring(1))
        : -Number(rotStr.substring(1));

    let newVal = (cur + rot) % 100;

    if (newVal === 0) res++;

    if (newVal < 0) newVal = 100 + newVal;

    cur = newVal;

    logger.log(`Rotation: ${rot}\t\t\tCurrent: ${cur}`);
  }

  console.log(`Result: ${res}`);
  logger.print();
}

/**
 * Now, instead of how many times it lands at 0, it is how many times
 * we pass 0 at each rotation. Last time, implicitly, there wasn't any
 * rotations greater than 99. However, this time, a specific example of
 * R1000 is given, so we need to ensure that that edge case is handled
 * as well.
 *
 * Ha. Since I took the modulus before subtracting it by the total last
 * time, I've already accounted for the rotations greater than 99...
 * Now that I look at the input dataset again, there's definitely rotations
 * greater than 99 in there.
 *
 * Result: 41 minutes - lots of debugging slight edge cases. Might be
 * a bit better if I started with tests instead
 */
export async function day1Pt2(input: string) {
  const inputList = parseInput(input);
  let cur = 50;
  let res = 0;

  const logger = new Logger("1.2");

  for (const rotStr of inputList) {
    const rot =
      rotStr.charAt(0) === "R"
        ? Number(rotStr.substring(1))
        : -Number(rotStr.substring(1));

    // Let's break down the cases
    // newVal is positive, < 100 -> zero rotations
    // newVal is positive, >= 100 -> newVal / 100 rotations
    // newVal is negative, > -100 -> 1 rotation
    // newVal is negative, <= -100 -> 1 + newVal / 100 rotations

    let newVal = (cur + rot) % 100;
    let newRots = Math.abs(Math.trunc((cur + rot) / 100));

    if (newVal < 0) {
      newVal = 100 + newVal;
      if (cur !== 0) newRots++;
    }

    if (newVal === 0 && rot < 0) newRots++;

    cur = newVal;
    res += newRots;

    logger.log(
      `Rotation: ${rot}\t\t\tCurrent: ${cur}\t\t\tResult: ${res}\t\t\tNew Rotations: ${newRots}`
    );
  }

  console.log(`Result: ${res}`);
  logger.print();
}

/**
 * Result: Brute force approach solved in around 10 mins
 */
export async function day1Pt2Brute(input: string) {
  const inputList = parseInput(input);
  let cur = 50;
  let res = 0;

  const logger = new Logger("1.2brute");

  for (const rotStr of inputList) {
    const rot =
      rotStr.charAt(0) === "R"
        ? Number(rotStr.substring(1))
        : -Number(rotStr.substring(1));

    for (let i = 0; i < Math.abs(rot); i++) {
      if (rot > 0) cur++;
      else cur--;

      if (cur === 0 || cur === 100) res++;

      if (cur > 99) cur = 0;
      if (cur < 0) cur = 99;
    }

    logger.log(`Rotation: ${rot}\t\t\tCurrent: ${cur}\t\t\tResult: ${res}`);
  }

  console.log(`Result: ${res}`);
  logger.print();
}
