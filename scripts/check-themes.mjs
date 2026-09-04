import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  await readFile(resolve(root, "package.json"), "utf8"),
);
const hexColor = /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i;

if (manifest.contributes?.themes?.length !== 2) {
  throw new Error("Expected exactly two contributed themes.");
}

for (const contribution of manifest.contributes.themes) {
  const path = resolve(root, contribution.path);
  const theme = JSON.parse(await readFile(path, "utf8"));
  const expectedType = contribution.uiTheme === "vs-dark" ? "dark" : "light";

  if (theme.type !== expectedType) {
    throw new Error(`${contribution.label} must have type ${expectedType}.`);
  }

  for (const [role, color] of Object.entries(theme.colors ?? {})) {
    if (!hexColor.test(color)) {
      throw new Error(
        `${contribution.label}: ${role} has invalid color ${color}.`,
      );
    }
  }

  if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length === 0) {
    throw new Error(`${contribution.label} has no TextMate token colors.`);
  }

  if (!theme.semanticHighlighting || !theme.semanticTokenColors) {
    throw new Error(`${contribution.label} has no semantic token colors.`);
  }
}

console.log("Validated Harbor Bronze Dark and Light.");
