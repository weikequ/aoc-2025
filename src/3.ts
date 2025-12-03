export function parse(input: string) {
  return input.split("\n").map((item) => item.trim());
}

export function day3(input: string, part2 = false, n = 12) {
  const banks = parse(input);

  const result = banks.reduce((acc, bank) => {
    const lsp = part2
      ? findLargestSequentialN(bank, n)
      : findLargestSequentialPair(bank);
    return acc + lsp;
  }, 0);

  console.log(result);
}

// Have 3 pointers, left, right, current
// -left only moves when current finds a number bigger than left and it's not at the last position
//    -when left moves, right moves to left+1, current moves to left+2
// -right moves when current finds a number bigger than right
export function findLargestSequentialPair(bank: string) {
  let l = 0;
  let r = 1;
  let cur = 1;

  while (cur < bank.length) {
    if (
      cur < bank.length - 1 &&
      Number(bank.charAt(cur)) > Number(bank.charAt(l))
    ) {
      l = cur;
      r = cur + 1;
      cur++;
      // console.log("Found new l:", bank.charAt(l) + bank.charAt(r));
      continue;
    }
    if (Number(bank.charAt(cur)) > Number(bank.charAt(r))) {
      r = cur;
      // console.log("Found new r:", bank.charAt(l) + bank.charAt(r));
    }
    cur++;
  }

  return Number(bank.charAt(l)) * 10 + Number(bank.charAt(r));
}

export function flspBrute(bank: string) {
  let max = Number(bank.charAt(0) + bank.charAt(1));

  for (let l = 0; l < bank.length - 1; l++) {
    for (let r = l + 1; r < bank.length; r++) {
      max = Math.max(max, Number(bank.charAt(l) + bank.charAt(r)));
    }
  }

  return max;
}

// Always assume n < bank.length
export function findLargestSequentialN(bank: string, n: number) {
  // find the max number in the string from 0 to length - n at position x_0
  // find the max number in the string from x_0 + 1 to length - (n-1) - (x_0)

  const len = bank.length;
  const maxIndexes: number[] = [];

  // Initialize the default indexes at [0, 1, ... n]
  for (let i = 0; i < n; i++) maxIndexes.push(i);

  // Find the first index
  maxIndexes[0] = findMax(bank, 0, len - n);

  // i bank l r, for n = 12

  // 987654321111111
  // 0 |9876|54321111111 0 3
  // 1 9|8765|4321111111 1 4
  // 2 98|7654|321111111 2 5
  // ...

  // 811111111111119
  // 0  |8111|11111111119 0 3
  // 1  8|1111|1111111119 1 4
  // ...
  // 11 81111111111|1119| 11 14

  // 234234234234278
  // 0 |2342|34234234278 0 3
  // 1 234|23|4234234278 3 4
  // 2 23423|4|234234278 5 5
  // ...

  // maxIndex[i] - num - l - r
  // 0 - [6879]543 211 111 11
  // 1 - 687   9    [54321111111] - 4 - 4

  // 0 - [6894]543 211 111 11       0                                       len - n = (15 - 12) = 3
  // 1 - 68 *9* [45] 4321111111     maxIdnexes[i - 1] + 1 = 2 + 1 = 3       len - (n - i) - maxIndexes[i - 1] = 15 - 11 - 2 = 4

  // Find all subsequent indexes
  // Special case - if the bounds is equal to n-i, then we can set all the
  //    indexes and return
  for (let i = 1; i < n; i++) {
    // Left bound is the previous maxIndex + 1
    const l = maxIndexes[i - 1]! + 1;

    // Right bound is the highest index that can be used
    // while still having enough numbers for the rest
    const r = len - (n - i);

    // Special case - if leftbound and right bound are equal,
    // it means that there's no other possibility, so update
    // the maxIndexes[i] and move on
    // This will cause the rest of the loops to proceed in'
    // this manner as well
    if (l === r) {
      maxIndexes[i] = l;
      continue;
    }

    maxIndexes[i] = findMax(bank, l, r);
  }

  return Number(
    maxIndexes.reduce((acc, maxIndex) => {
      return acc + bank.charAt(maxIndex);
    }, "")
  );
}

/**
 * Returns the index of the max number within a string within the bounds
 * will ALWAYS return the smallest index found
 * @param bank the bank sequence
 * @param l left inclusive bound
 * @param r right inclusive bound
 * @returns
 */
export function findMax(bank: string, l: number, r: number) {
  let max = Number(bank.charAt(l));
  let maxIndex = l;

  for (let i = l + 1; i <= r; i++) {
    const current = Number(bank.charAt(i));
    if (current > max) {
      max = current;
      maxIndex = i;
    }
  }

  return maxIndex;
}
