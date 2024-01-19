const numbers = new Array(20).fill(0).map((_, index) => index + 1);

const throwOptions = numbers.flatMap((number) => [1, 2, 3].map((multiplier) => ({ multiplier, number })));
throwOptions.push({ multiplier: 1, number: 25 });
throwOptions.push({ multiplier: 1, number: 50 });

function getAllOptions(throwCount: number): Round[] {
  if (throwCount === 0) return [];
  return throwOptions.flatMap((option): Round[] => {
    const nextTurns = getAllOptions(throwCount - 1).map((r) => [option, ...r]);

    if (canBeLastThrow(option)) return [[option], ...nextTurns];

    return nextTurns;
  });
}

function sumRound(round: Round) {
  let sum = 0;
  for (const t of round) sum += !t ? 0 : t.multiplier * t.number;
  return sum;
}

function stringifyRound(round: Round) {
  return round.map((r) => `${r.multiplier} x ${r.number}`).join(" - ");
}

function canBeLastThrow(t: Throw) {
  return t && (t.multiplier === 2 || t.number > 25);
}
type Throw = typeof throwOptions[number];
export type Round = Throw[];

export { getAllOptions, stringifyRound, sumRound };
