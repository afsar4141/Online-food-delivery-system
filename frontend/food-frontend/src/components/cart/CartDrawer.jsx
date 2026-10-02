import { useState } from "react";
import { placeOrder } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { inr } from "../../utils/format";
import Modal, { ModalHead } from "../common/Modal";
import Stepper from "../common/Stepper";

export default function CartDrawer({ onOrdered }) {
  const { lines, total, change, clear, setOpen } = useCart();
  const { token, logout, openAuth } = useAuth();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const close = () => setOpen(false);

  const submit = async () => {
    if (!token) { close(); openAuth("login"); return; }
    setBusy(true); setMsg("");
    try {
      const items = lines.flatMap((l) => Array(l.qty).fill(l.food));
      const d = await placeOrder(items, token);
      clear(); close(); onOrdered(d.newOrder._id);
    } catch (err) {
      if (/authorize|token/i.test(err.message)) { logout(); close(); openAuth("login"); }
      else setMsg(err.message);
    }
    setBusy(false);
  };

  return (
    <Modal onClose={close} side as="aside" className="drawer">
      <ModalHead onClose={close}><h2>Your cart</h2></ModalHead>
      {lines.length === 0 ? (
        <p className="empty">Your cart is empty. Pick a restaurant and add something tasty.</p>
      ) : (
        <>
          <ul className="lines">
            {lines.map(({ food, qty }) => (
              <li key={food._id}>
                <span>{food.title}</span>
                <Stepper qty={qty} onChange={(d) => change(food, d)} />
                <b>{inr(food.price * qty)}</b>
              </li>
            ))}
          </ul>
          <dl className="totals"><div className="grand"><dt>Total</dt><dd>{inr(total)}</dd></div></dl>
          {msg && <p className="err">{msg}</p>}
          <button className="primary" disabled={busy} onClick={submit}>
            {busy ? "Placing…" : token ? "Place order" : "Log in to order"}
          </button>
        </>
      )}
    </Modal>
  );
}
