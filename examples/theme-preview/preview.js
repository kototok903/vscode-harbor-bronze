/**
 * @typedef {{ name: string, depth: number }} Berth
 * @param {Berth} berth - The named data to inspect.
 * @returns {string} A formatted description.
 */
export function describe(berth) {
  const { name, depth = 0 } = berth;
  const expression = /^(?<name>[A-Z][a-z]+)\s+\d{2}$/u;
  return `${name}: ${depth.toFixed(1)}m\n${expression.source}`;
}

export class Harbor {
  #visits = 0;
  static category = "coastal";
  constructor(name) { this.name = name; }
  get visits() { return this.#visits; }
  visit(...boats) {
    this.#visits += boats.length;
    return boats.map((boat, index) => ({ ...boat, index }));
  }
}

export function* tides() {
  yield 0x2a;
  yield 1_000;
  yield 3.14e-2;
}

const berth = { name: "North", depth: 4.5 };
const harbor = new Harbor("Bronze");
const result = harbor.visit(berth, { ...berth, name: "South" });
console.log(describe(berth), result?.[0]?.name ?? "unknown", [...tides()]);
console.log(typeof harbor, harbor instanceof Harbor, "depth" in berth);
