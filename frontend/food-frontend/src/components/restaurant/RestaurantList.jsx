import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ list, loading, error, sort, onSort, onSelect }) {
  return (
    <main>
      <div className="toolbar">
        <h2 className="section">{list.length} restaurants</h2>
        <label className="sort">Sort by
          <select value={sort} onChange={(e) => onSort(e.target.value)}>
            <option value="rating">Top rated</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </label>
      </div>
      {error ? <p className="err">{error}</p> : loading ? (
        <div className="grid">{[...Array(6)].map((_, i) => <div key={i} className="card skeleton" />)}</div>
      ) : list.length === 0 ? (
        <p className="empty">No restaurants found. Try a different search.</p>
      ) : (
        <div className="grid">
          {list.map((r) => <RestaurantCard key={r._id} r={r} onClick={() => onSelect(r)} />)}
        </div>
      )}
    </main>
  );
}
