import { expect, test } from "bun:test";
import { accessiblePaper, parse } from "./4";

const sample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

test("accessible", () => {
  const layout = parse(sample);

  expect(accessiblePaper(layout, 0, 0)).toBe(false);
  expect(accessiblePaper(layout, 0, 1)).toBe(false);
  expect(accessiblePaper(layout, 0, 2)).toBe(true);
  expect(accessiblePaper(layout, 0, 7)).toBe(false);
  expect(accessiblePaper(layout, 2, 6)).toBe(true);
});
