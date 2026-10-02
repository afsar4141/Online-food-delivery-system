import { useMemo, useState } from "react";
import useRestaurants from "./hooks/useRestaurants";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import RestaurantList from "./components/restaurant/RestaurantList";
import MenuModal from "./components/restaurant/MenuModal";
import CartDrawer from "./components/cart/CartDrawer";
import AuthModal from "./components/auth/AuthModal";
import OrderTracker from "./components/order/OrderTracker";

export default function App() {
  const { restaurants, loading, error } = useRestaurants();
  const { authOpen } = useAuth();
  const { open: cartOpen } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [active, setActive] = useState(null);
  const [orderId, setOrderId] = useState("");

  const list = useMemo(() => {
    const out = restaurants.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()));
    return out.sort((a, b) => (sort === "rating" ? b.rating - a.rating : a.title.localeCompare(b.title)));
  }, [restaurants, query, sort]);

  return (
    <div className="app">
      <Header />
      {orderId && <OrderTracker key={orderId} orderId={orderId} onDismiss={() => setOrderId("")} />}
      <Hero query={query} onQuery={setQuery} />
      <RestaurantList list={list} loading={loading} error={error} sort={sort} onSort={setSort} onSelect={setActive} />
      {active && <MenuModal restaurant={active} onClose={() => setActive(null)} />}
      {cartOpen && <CartDrawer onOrdered={setOrderId} />}
      {authOpen && <AuthModal />}
    </div>
  );
}