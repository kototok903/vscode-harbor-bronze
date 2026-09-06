/** A harbor berth. Compare named data, types, and values. */
export interface Berth {
  readonly id: number;
  name: string;
  depth?: number;
}

export type Status = "open" | "closed";
export type Keys<T> = keyof T;
export type Manifest = Record<string, readonly Berth[]>;
export enum Signal { Stop = 0, Proceed = 1 }

const LIMIT = 12;
const mask = 0xff & 0b1010;
const empty: null = null;
const missing: undefined = undefined;
const enabled = true;
const pattern = /(?<port>[a-z]+)\d{2,4}$/giu;

export function identity<T extends Berth>(value: T): T {
  return value;
}

export class Harbor implements Iterable<Berth> {
  static readonly category = "coastal";
  #berths: Berth[] = [];

  constructor(public readonly name: string) {}

  add(berth: Berth): this {
    this.#berths.push(identity(berth));
    return this;
  }

  get count(): number { return this.#berths.length; }

  *[Symbol.iterator](): Iterator<Berth> {
    yield* this.#berths;
  }
}

export async function describe(port: Harbor): Promise<string> {
  const options = { name: port.name, count: port.count, enabled };
  const { name, count = LIMIT } = options;
  const values = new Map<string, number>([[name, count]]);
  await Promise.resolve(values);
  return `${name.toUpperCase()}: ${values.get(name) ?? 0} / ${LIMIT}`;
}

const harbor = new Harbor("Bronze").add({ id: 1, name: "North", depth: 3.5 });
for (const berth of harbor) {
  if (berth.depth !== undefined && berth.depth > 2) {
    console.log(identity(berth), Signal.Proceed, pattern.test(berth.name));
  }
}
void describe(harbor);
void [mask, empty, missing];
