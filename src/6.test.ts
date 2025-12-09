import { expect, test } from "bun:test";
import { parse } from "./6";

const sample = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

test("parsing", () => {
  const expected = {
    ops: ["*", "+", "*", "+"],
    nums: [
      ["123", "328", "51", "64"],
      ["45", "64", "387", "23"],
      ["6", "98", "215", "314"],
    ],
  };
  expect(parse(sample)).toStrictEqual(expected);
});
