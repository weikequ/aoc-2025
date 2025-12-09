export function day7(input: string) {
  const lines = input.split("\n");

  const startIndex = lines[0]!.indexOf("S");

  let prevBeams = new Set<number>();

  prevBeams.add(startIndex);

  let splits = 0;

  for (let row = 1; row < lines.length; row++) {
    const currentBeams = new Set<number>();
    for (const prevBeam of prevBeams) {
      if (lines[row]!.charAt(prevBeam) === ".") {
        currentBeams.add(prevBeam);
      } else {
        splits++;
        currentBeams.add(prevBeam + 1);
        currentBeams.add(prevBeam - 1);
      }
    }
    prevBeams = currentBeams;
  }

  console.log(splits);
}

// Got the method pretty quick, but implementation and memoization took a while
export function day7pt2(input: string) {
  const lines = input.split("\n");

  const startIndex = lines[0]!.indexOf("S");

  // console.log(lines.length);

  const memo = new Map<number, Map<number, number>>();

  function recurse(prev: number, row: number): number {
    if (row >= lines.length) {
      return 1;
    }
    if (memo.has(prev) && memo.get(prev)!.has(row)) {
      // console.log("Cache hit", prev, row);
      return memo.get(prev)!.get(row)!;
    }

    let totalPaths: number;

    if (lines[row]!.charAt(prev) === ".") {
      totalPaths = recurse(prev, row + 1);
    } else {
      totalPaths = recurse(prev - 1, row + 1) + recurse(prev + 1, row + 1);
    }

    if (!memo.has(prev)) memo.set(prev, new Map<number, number>());
    memo.get(prev)!.set(row, totalPaths);

    return totalPaths;
  }

  console.log(recurse(startIndex, 1));
}
