// O(n^2 + n^2 log n + 1000n) = O(n^2 log n)
//  build distances + sort distances + connect groups
// O(n^2 log1000 + 1000 logn alpha(n))
// build min heap + pop min heap for groups

// For part 2, naive implementation
// O(n^2 + n^2 log n + n^3) = O(n^3)

export function day8(input: string) {
  // Very reminiscent of agglomerative clustering
  const points = input
    .split("\n")
    .map((item) => item.trim())
    .map((item) => {
      const splits = item.split(",");
      return {
        x: Number(splits[0]!),
        y: Number(splits[1]!),
        z: Number(splits[2]!),
      };
    });
  // generate all distances
  // sort based on shortest -> longest O(nlogn)
  //    - potentially use min-heap -> O(nlogk)
  // merge 1000 pairs
  // .  - union find
  // multiply together sizes of 3 largest groups

  // console.log(points.length);

  const distances = [];

  // O(n^2)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++)
      distances.push([i, j, distance(points[i]!, points[j]!)]);
  }

  // O(n^2 log n^2) = O(n^2 log n)
  distances.sort((a, b) => {
    return a[2]! - b[2]!;
  });

  // <index of the points, group #>
  const pairs = new Map<number, number>();
  // <group #, [pointIndexes]>
  const groups = new Map<number, number[]>();
  let groupNum = 0;

  // O(1000n)
  for (let i = 0; i < 1000; i++) {
    const p1 = distances[i]![0]!;
    const p2 = distances[i]![1]!;

    // Neither has a group
    if (!pairs.has(p1) && !pairs.has(p2)) {
      groups.set(groupNum, [p1, p2]);
      pairs.set(p1, groupNum);
      pairs.set(p2, groupNum);
      groupNum++;
      continue;
    }

    // p1 has a group
    if (pairs.has(p1) && !pairs.has(p2)) {
      const group = pairs.get(p1)!;
      pairs.set(p2, group);
      groups.set(group, [...groups.get(group)!, p2]);
      continue;
    }

    // p2 has a group
    if (!pairs.has(p1) && pairs.has(p2)) {
      const group = pairs.get(p2)!;
      pairs.set(p1, group);
      // if (groups.get(group) === undefined) {
      //   // 840 941 77
      //   console.log("Undefined", p1, p2, group, pairs, groups);
      // }
      groups.set(group, [...groups.get(group)!, p1]);
      continue;
    }

    // both have a group
    const g1 = pairs.get(p1)!;
    const g2 = pairs.get(p2)!;

    if (g1 === g2) continue;

    // Merge g2 into g1
    if (groups.get(g1)!.length >= groups.get(g2)!.length) {
      groups.set(g1, [...groups.get(g1)!, ...groups.get(g2)!]);
      // O(group size), worst case O(n)
      groups.get(g2)!.map((point) => pairs.set(point, g1));
      groups.delete(g2);
    } else {
      groups.set(g2, [...groups.get(g2)!, ...groups.get(g1)!]);
      // O(group size)
      groups.get(g1)!.map((point) => pairs.set(point, g2));
      groups.delete(g1);
    }
  }

  const sizes = [];

  for (const [, points] of groups) {
    sizes.push(points.length);
  }

  sizes.sort((a, b) => {
    return b - a;
  });

  console.log(sizes[0]! * sizes[1]! * sizes[2]!);
}

type Point = {
  x: number;
  y: number;
  z: number;
};

export function distance(p1: Point, p2: Point) {
  const xd = p1.x - p2.x;
  const yd = p1.y - p2.y;
  const zd = p1.z - p2.z;

  return Math.sqrt(xd * xd + yd * yd + zd * zd);
}

export function day8pt2(input: string) {
  const points = input
    .split("\n")
    .map((item) => item.trim())
    .map((item) => {
      const splits = item.split(",");
      return {
        x: Number(splits[0]!),
        y: Number(splits[1]!),
        z: Number(splits[2]!),
      };
    });

  const distances = [];

  // O(n^2)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++)
      distances.push([i, j, distance(points[i]!, points[j]!)]);
  }

  // O(n^2 log n^2) = O(n^2 log n)
  distances.sort((a, b) => {
    return a[2]! - b[2]!;
  });

  // <index of the points, group #>
  const pairs = new Map<number, number>();
  // <group #, [pointIndexes]>
  const groups = new Map<number, number[]>();
  let groupNum = 0;

  for (let i = 0; i < distances.length; i++) {
    const p1 = distances[i]![0]!;
    const p2 = distances[i]![1]!;

    if (pairs.size === points.length && groups.size === 1) {
      const res =
        points[distances[i - 1]![0]!]!.x * points[distances[i - 1]![1]!]!.x;
      console.log(res);
      return;
    }
    if (!pairs.has(p1) && !pairs.has(p2)) {
      // Neither has a group
      groups.set(groupNum, [p1, p2]);
      pairs.set(p1, groupNum);
      pairs.set(p2, groupNum);
      groupNum++;
      continue;
    }

    // p1 has a group
    if (pairs.has(p1) && !pairs.has(p2)) {
      const group = pairs.get(p1)!;
      pairs.set(p2, group);
      groups.set(group, [...groups.get(group)!, p2]);
      continue;
    }

    // p2 has a group
    if (!pairs.has(p1) && pairs.has(p2)) {
      const group = pairs.get(p2)!;
      pairs.set(p1, group);
      // if (groups.get(group) === undefined) {
      //   // 840 941 77
      //   console.log("Undefined", p1, p2, group, pairs, groups);
      // }
      groups.set(group, [...groups.get(group)!, p1]);
      continue;
    }

    // both have a group
    const g1 = pairs.get(p1)!;
    const g2 = pairs.get(p2)!;

    if (g1 === g2) continue;

    // Merge g2 into g1
    if (groups.get(g1)!.length >= groups.get(g2)!.length) {
      groups.set(g1, [...groups.get(g1)!, ...groups.get(g2)!]);
      // O(group size), worst case O(n)
      groups.get(g2)!.map((point) => pairs.set(point, g1));
      groups.delete(g2);
    } else {
      groups.set(g2, [...groups.get(g2)!, ...groups.get(g1)!]);
      // O(group size)
      groups.get(g1)!.map((point) => pairs.set(point, g2));
      groups.delete(g1);
    }
  }

  const sizes = [];

  for (const [, points] of groups) {
    sizes.push(points.length);
  }

  sizes.sort((a, b) => {
    return b - a;
  });

  console.log(sizes[0]! * sizes[1]! * sizes[2]!);
}
