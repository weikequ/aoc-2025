export type Problem = {
  ops: string[];
  nums: string[][];
};
export function parse(input: string) {
  const lines = input.split("\n").map((item) => item.trim());
  const ops = lines[lines.length - 1]!.split(" ").filter(
    (item) => item.trim() !== ""
  );
  const nums: string[][] = [];
  for (let i = 0; i < lines.length - 1; i++) {
    nums.push(lines[i]!.split(" ").filter((item) => item.trim() !== ""));
  }
  return { ops, nums };
}

export function day6(input: string) {
  const problem = parse(input);

  const totals = [];
  for (let i = 0; i < problem.ops.length; i++)
    totals.push(problem.ops[i] === "+" ? 0 : 1);

  for (let row = 0; row < problem.nums.length; row++) {
    for (let col = 0; col < problem.nums[0]!.length; col++) {
      if (problem.ops[col] === "+")
        totals[col]! += Number(problem.nums[row]![col]!);
      else totals[col]! *= Number(problem.nums[row]![col]!);
    }
  }

  // console.log(problem.ops, problem.nums);
  // console.log(problem.ops.length, problem.nums.length, problem.nums[0]!.length);

  console.log(totals);

  const res = totals.reduce((acc, item) => {
    return acc + item;
  }, 0);

  console.log(res);
}

export function day6pt2(input: string) {
  const lines = input.split("\n");
  const len = lines[0]!.length;

  const opsRow = 4;

  let currentTotal = 0;
  let currentOps = "+";
  const totals = [];

  for (let col = 0; col < len; col++) {
    const opsLineChar = lines[opsRow]!.charAt(col);

    if (opsLineChar !== " ") {
      totals.push(currentTotal);
      currentOps = opsLineChar;
      if (currentOps === "+") currentTotal = 0;
      else currentTotal = 1;
    }

    let num = "";
    for (let row = 0; row < lines.length - 1; row++) {
      num = num + lines[row]!.charAt(col);
    }

    if (num.trim() === "") continue;

    if (currentOps === "+") currentTotal = currentTotal + Number(num);
    else currentTotal = currentTotal * Number(num);
  }

  totals.push(currentTotal);

  console.log(totals);

  const res = totals.reduce((acc, item) => {
    return acc + item;
  }, 0);

  console.log(res);
}
