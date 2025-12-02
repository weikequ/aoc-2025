export type Range = {
  start: string;
  end: string;
};

export function parse(input: string) {
  return input.split(",").map((range) => {
    const splits = range.split("-");
    return {
      start: splits[0] ?? "",
      end: splits[1] ?? "",
    };
  });
}

/**
 * Invalid ID's are ids made only of some sequence of
 * digits repeated twice
 *
 * Result:
 * -  Part 1 47m
 * -  Part 2 32m
 *
 */
export function day2(input: string, part2 = false) {
  const ranges = parse(input);
  const invalidIDs: string[] = [];

  for (const range of ranges) {
    const newInvalidIDs = getInvalidIds(range, part2);
    if (newInvalidIDs.length !== 0) invalidIDs.push(...newInvalidIDs);
  }

  console.log(invalidIDs);

  const sum = invalidIDs.reduce((acc, id) => {
    return acc + Number(id);
  }, 0);

  console.log(sum);
}

/**
 * Since it's any patterns repeated twice, a simple way is to
 * bisect the string and check if the substrings are equal.
 *
 */
export function getInvalidIds(range: Range, part2 = false): string[] {
  const result: string[] = [];
  let current = Number(range.start);
  const end = Number(range.end);

  while (current <= end) {
    if (part2 ? isInvalidMultiple(current) : isInvalid(current))
      result.push(current.toString());
    current++;
  }

  return result;
}

export function isInvalid(id: number): boolean {
  const idStr = id.toString();
  const len = idStr.length;
  if (len % 2 !== 0) return false;
  const firstHalf = idStr.substring(0, len / 2);
  const secondHalf = idStr.substring(len / 2);
  return firstHalf === secondHalf;
}

export function isInvalidMultiple(id: number): boolean {
  // can check from 2 times -> id.length times
  // skip all checks where id.length % i !=== 0
  const idStr = id.toString();
  for (let times = 2; times <= idStr.length; times++) {
    if (idStr.length % times !== 0) continue;
    const subLen = idStr.length / times;

    let counters: number[] = [];
    for (let i = 0; i < times; i++) counters.push(i * subLen);

    let res = true;
    for (let i = 0; i < subLen; i++) {
      if (
        !counters.reduce(
          (acc, counter) => {
            return {
              prev: idStr.charAt(counter),
              result: acc.result && acc.prev === idStr.charAt(counter),
            };
          },
          {
            prev: idStr.charAt(counters[0]!),
            result: true,
          }
        ).result
      ) {
        res = false;
        break;
      }
      counters = counters.map((counter) => counter + 1);
    }

    if (res) return true;
  }

  return false;
}
