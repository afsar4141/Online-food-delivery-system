import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);

  const change = (food, d) =>
    setCart((c) => {
      const qty = (c[food._id]?.qty || 0) + d;
      const next = { ...c };
      if (qty <= 0) delete next[food._id]; else next[food._id] = { food, qty };
      return next;
    });

  const lines = Object.values(cart);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.food.price, 0);
  const qtyOf = (id) => cart[id]?.qty || 0;
  const clear = () => setCart({});

  return (
    <CartContext.Provider value={{ lines, count, total, qtyOf, change, clear, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}
