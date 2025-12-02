import { expect, test } from "bun:test";
import {
  getInvalidIds,
  isInvalid,
  isInvalidMultiple,
  parse,
  type Range,
} from "./2";

const sampleInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

test("parsing", () => {
  const expected = [
    {
      start: "11",
      end: "22",
    },
    {
      start: "95",
      end: "115",
    },
    {
      start: "998",
      end: "1012",
    },
    {
      start: "1188511880",
      end: "1188511890",
    },
    {
      start: "222220",
      end: "222224",
    },
    {
      start: "1698522",
      end: "1698528",
    },
    {
      start: "446443",
      end: "446449",
    },
    {
      start: "38593856",
      end: "38593862",
    },
    {
      start: "565653",
      end: "565659",
    },
    {
      start: "824824821",
      end: "824824827",
    },
    {
      start: "2121212118",
      end: "2121212124",
    },
  ];
  expect(parse(sampleInput)).toStrictEqual(expected);
});

test("invalidIds function", () => {
  const inputs = parse(sampleInput);

  type Test = {
    input: Range;
    expected: string[];
  };

  const tests: Test[] = [
    {
      input: inputs[0]!,
      expected: ["11", "22"],
    },
    {
      input: inputs[1]!,
      expected: ["99"],
    },
    {
      input: inputs[2]!,
      expected: ["1010"],
    },
    {
      input: inputs[3]!,
      expected: ["1188511885"],
    },
    {
      input: inputs[4]!,
      expected: ["222222"],
    },
    {
      input: inputs[5]!,
      expected: [],
    },
    {
      input: inputs[6]!,
      expected: ["446446"],
    },
    {
      input: inputs[7]!,
      expected: ["38593859"],
    },
  ];

  function testFn(input: Range, expected: string[]) {
    expect(getInvalidIds(input)).toStrictEqual(expected);
  }

  tests.map((test) => testFn(test.input, test.expected));

  for (let i = 8; i < inputs.length; i++) {
    testFn(inputs[i]!, []);
  }
});

test("isInvalid function", () => {
  const tests = [
    {
      input: 12341234,
      expected: true,
    },
    {
      input: 2343212414,
      expected: false,
    },
    {
      input: 222,
      expected: false,
    },
    {
      input: 2222,
      expected: true,
    },
    {
      input: 11111111,
      expected: true,
    },
    {
      input: 1188511885,
      expected: true,
    },
    {
      input: 38383838,
      expected: true,
    },
    {
      input: 383838,
      expected: false,
    },
  ];

  tests.map((test) => {
    expect(isInvalid(test.input)).toBe(test.expected);
  });
});

test("isInvalidMultiple function", () => {
  const tests = [
    {
      input: 12341234,
      expected: true,
    },
    {
      input: 2343212414,
      expected: false,
    },
    {
      input: 222,
      expected: true,
    },
    {
      input: 2222,
      expected: true,
    },
    {
      input: 11111111,
      expected: true,
    },
    {
      input: 1188511885,
      expected: true,
    },
    {
      input: 38383838,
      expected: true,
    },
    {
      input: 383838,
      expected: true,
    },
  ];

  tests.map((test) => {
    expect(isInvalidMultiple(test.input)).toBe(test.expected);
  });
});
