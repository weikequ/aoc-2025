import { expect, test } from "bun:test";
import { parse, sortRangeAscStart } from "./5";

// Stupid ass windows has \r everywhere....
const sampleData = `85235893313283-89438275951996
239257316749767-240723948248614
474553643141685-480394983694668\n\n223534213278924
47361568253553
283890592828669
319263696077975`;

test("parsing", async () => {
  const expected = {
    ranges: [
      {
        start: "85235893313283",
        end: "89438275951996",
      },
      {
        start: "239257316749767",
        end: "240723948248614",
      },
      {
        start: "474553643141685",
        end: "480394983694668",
      },
    ],
    ids: [
      "223534213278924",
      "47361568253553",
      "283890592828669",
      "319263696077975",
    ],
  };
  expect(parse(sampleData)).toStrictEqual(expected);
});

test("part2", () => {
  const ranges = [
    {
      start: "239257316749767",
      end: "240723948248614",
    },
    {
      start: "85235893313283",
      end: "89438275951996",
    },
    {
      start: "474553643141685",
      end: "480394983694668",
    },
  ];

  const expected = [
    {
      start: "85235893313283",
      end: "89438275951996",
    },
    {
      start: "239257316749767",
      end: "240723948248614",
    },
    {
      start: "474553643141685",
      end: "480394983694668",
    },
  ];

  expect(ranges.sort(sortRangeAscStart)).toStrictEqual(expected);
});
