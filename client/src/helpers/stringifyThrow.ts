const stringifyThrow = (value: number | string, multiplier: number): string =>
  (multiplier === 2 && value === 25) || value === 50
    ? "BULL"
    : `${multiplier > 1 ? ["D", "T"][multiplier - 2] : ""}${value}`;

export { stringifyThrow };
