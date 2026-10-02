export default function Hero({ query, onQuery }) {
  return (
    <section className="hero">
      <h1>Hungry? Get it hot at your door.</h1>
      <p>Order from restaurants near you and follow every step of delivery.</p>
      <input className="search" type="search" placeholder="Search restaurants"
        value={query} onChange={(e) => onQuery(e.target.value)} aria-label="Search restaurants" />
    </section>
  );
}
