import Pic from "../common/Pic";

export default function RestaurantCard({ r, onClick }) {
  return (
    <button className={`card ${r.isOpen ? "" : "closed"}`} onClick={onClick}>
      <div className="thumb"><Pic src={r.logoUrl || r.imageUrl} alt={r.title} /></div>
      <div className="info">
        <h3>{r.title}</h3>
        <div className="meta">
          <span className="rating">★ {Number(r.rating).toFixed(1)}</span>
          {r.time && <span>{r.time}</span>}
          <span>{r.delivery ? "Delivery" : "Pickup only"}</span>
        </div>
      </div>
      {!r.isOpen && <em className="badge">Closed now</em>}
    </button>
  );
}
