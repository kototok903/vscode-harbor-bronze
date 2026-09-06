# Harbor Bronze syntax gallery

Open this folder in the Extension Development Host, then select a Harbor Bronze theme.
Files are for visual inspection; there is nothing to install or run.

Compare each file with `editor.semanticHighlighting.enabled` set to `true` and
`false` in the host's settings. Semantic colors require the relevant language
extension/server.
Use **Developer: Inspect Editor Tokens and Scopes** to see why a token has its color.

| File                             | What to inspect                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `preview.ts`                     | Types, classes, interfaces, generics, declarations/calls, fields, constants, interpolation |
| `preview.tsx`                    | JSX components, native tags, attributes, embedded expressions                              |
| `preview.js`                     | JSDoc, destructuring, regex, private fields, generators                                    |
| `go/preview.go`                  | Structs, interfaces, receivers, built-in types, channels, struct tags                      |
| `preview.py`                     | Decorators, annotations, comprehensions, f-strings, call arguments                         |
| `preview.rs`                     | Lifetimes, traits, macros, attributes, enums, patterns                                     |
| `preview.cpp`                    | Preprocessor, templates, pointers, namespaces, operators                                   |
| `preview.html` / `preview.css`   | Tags, attributes, entities, selectors, properties, units                                   |
| `preview.jsonc` / `preview.yaml` | Keys, values, comments, nesting, YAML anchors                                              |
| `preview.sh` / `preview.sql`     | Shell expansion and heredocs; SQL keywords and identifiers                                 |
| `preview.md`                     | Headings, emphasis, links, quotes, inline/fenced code                                      |
| `preview.diff`                   | Added/deleted lines and context-diff changed lines                                         |
| `invalid.json`                   | Deliberately invalid syntax; inspect TextMate `invalid` scopes                             |
