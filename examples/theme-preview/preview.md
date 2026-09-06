# Harbor Bronze

## Emphasis and links

Ordinary text, **bold emphasis**, _italic emphasis_, **_both_**, and ~~removed~~.
Compare `inline code` with [a named link](https://example.com/harbor "Harbor")
and an autolink: <https://example.com/harbor>.

> A blockquote with **emphasis**, `code`, and a [reference][harbor].

Math: $\sum_{i=1}^n i^2 = n(n + 1)(2n + 1) / 6$ \
$\Omega (g(n)) = \{ f(n) \mid \exist c > 0, \exist n_0 > 0$, such that $\forall n \geq n_0, f(n) \geq c \cdot g(n) \}$

- Unordered item
- Another item
  - Nested item

1. Ordered item
2. Another item

- [x] Open berth
- [ ] Closed berth

| Name  | Depth | Status |
| :---- | ----: | :----: |
| North |   3.5 |  Open  |
| South |   2.0 | Closed |

---

```typescript
interface Berth {
  name: string;
  depth: number;
}
function describe(berth: Berth): string {
  return `${berth.name}: ${berth.depth}m`;
}
describe({ name: "Bronze", depth: 3.5 });
```

```diff
-const depth = 2;
+const depth = 3.5;
```

<details>
<summary>Embedded HTML</summary>

An escaped character: \*literal asterisk\*. An entity: &amp;.

</details>

[harbor]: https://example.com/harbor "Reference link"
