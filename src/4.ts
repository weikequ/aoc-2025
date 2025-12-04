export function parse(input: string) {
  return input.split("\n").map((item) => item.trim());
}

export function day4(input: string) {
  const layout = parse(input);

  let res = 0;
  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[row]!.length; col++) {
      if (accessiblePaper(layout, row, col)) {
        res++;
      }
    }
  }

  console.log(res);
}

export function day4Pt2(input: string) {
  const layout = parse(input);

  let total = 0;
  let res = 0;

  do {
    res = 0;

    for (let row = 0; row < layout.length; row++) {
      for (let col = 0; col < layout[row]!.length; col++) {
        if (accessiblePaper(layout, row, col)) {
          res++;
          const oldRow = layout[row]!;
          const newRow =
            oldRow.substring(0, col) + "." + oldRow.substring(col + 1);
          layout[row] = newRow;
        }
      }
    }

    total += res;
  } while (res > 0);

  console.log(total);
}

export function accessiblePaper(layout: string[], row: number, col: number) {
  if (layout[row]?.charAt(col) !== "@") return false;

  const directions: [number, number][] = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  let count = 0;
  for (const direction of directions) {
    const checkRow = layout[direction[0] + row];
    if (checkRow === undefined) continue;
    const symbol = checkRow.charAt(direction[1] + col);
    if (symbol === "") continue;
    if (symbol === "@") {
      count++;
      if (count > 3) return false;
    }
  }

  return true;
}
