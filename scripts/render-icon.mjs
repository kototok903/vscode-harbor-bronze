import { readFile, writeFile } from "node:fs/promises";

import { Resvg } from "@resvg/resvg-js";

const sourceUrl = new URL("../assets/icon.svg", import.meta.url);
const outputUrl = new URL("../assets/icon.png", import.meta.url);
const svg = await readFile(sourceUrl);
const png = new Resvg(svg, {
  background: "rgba(0, 0, 0, 0)",
  fitTo: { mode: "width", value: 256 }
})
  .render()
  .asPng();

await writeFile(outputUrl, png);
console.log("Rendered assets/icon.png at 256×256 with a transparent background.");
