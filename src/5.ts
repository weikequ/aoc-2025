type Range = {
  start: string;
  end: string;
};

export function parse(input: string) {
  return {
    ranges: input
      .split("\n\n")[0]!
      .split("\n")
      .map((item) => {
        return {
          start: item.split("-")[0]!.trim(),
          end: item.split("-")[1]!.trim(),
        };
      }),
    ids: input
      .split("\n\n")[1]!
      .split("\n")
      .map((item) => item.trim()),
  };
}

/**
 * Can go 2 directions:
 *  - Check that each ID is in the ranges
 *  - Check that each Range contains the IDs
 *
 * Pick the first option, as it allows us to early exit
 * as well as being definitive (no need to come back to the
 * same ID after checking)
 */
export function day5(input: string) {
  const { ranges, ids } = parse(input);

  let fresh = 0;

  for (const id of ids) {
    for (const range of ranges) {
      if (withinRange(id, range)) {
        fresh++;
        break;
      }
    }
  }

  console.log(fresh);
}

export function withinRange(id: string, range: Range) {
  return Number(id) >= Number(range.start) && Number(id) <= Number(range.end);
}

export function day5pt2(input: string) {
  const { ranges } = parse(input);

  // O(nlogn)
  ranges.sort(sortRangeAscStart);

  const newRanges: Range[] = [];

  let curStart = ranges[0]!.start;
  let curEnd = ranges[0]!.end;

  // O(n)
  for (let i = 1; i < ranges.length; i++) {
    if (withinRange(ranges[i]!.start, { start: curStart, end: curEnd })) {
      curEnd = Math.max(Number(ranges[i]!.end), Number(curEnd)).toString();
    } else {
      newRanges.push({ start: curStart, end: curEnd });
      curStart = ranges[i]!.start;
      curEnd = ranges[i]!.end;
    }
  }

  // Push the final entry onto the new array
  newRanges.push({ start: curStart, end: curEnd });

  const res = newRanges.reduce((acc, range) => {
    return acc + (Number(range.end) - Number(range.start) + 1);
  }, 0);

  console.log(res);
}

export function sortRangeAscStart(a: Range, b: Range) {
  return Number(a.start) - Number(b.start);
}
