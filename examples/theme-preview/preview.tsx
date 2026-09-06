// Local JSX types: no React installation needed for this visual sample.
declare global {
  namespace JSX {
  export interface Element { readonly kind?: string }
  export interface IntrinsicElements {
    section: { className?: string; children?: unknown };
    h2: { children?: unknown };
    button: { disabled?: boolean; onClick?: () => void; children?: unknown };
  }
  }
}

interface CardProps { name: string; count?: number }

function HarborCard({ name, count = 0 }: CardProps): JSX.Element {
  const title = `${name}: ${count}`;
  return (
    <section className="harbor-card">
      {/* Compare native tags, custom components, and expression punctuation. */}
      <h2>{title} &amp; arrivals</h2>
      <button disabled={count === 0} onClick={() => console.log(name)}>
        {count > 0 ? "Inspect berths" : "No arrivals"}
      </button>
    </section>
  );
}

export const preview = <HarborCard name="Bronze" count={3} />;
