import { useEffect, useState } from "react";
import { getMenu } from "../../api/client";
import { useCart } from "../../context/CartContext";
import { inr } from "../../utils/format";
import Modal, { ModalHead } from "../common/Modal";
import Pic from "../common/Pic";
import Stepper from "../common/Stepper";

export default function MenuModal({ restaurant, onClose }) {
  const [menu, setMenu] = useState(null);
  const { qtyOf, change } = useCart();

  useEffect(() => {
    getMenu(restaurant._id).then((d) => setMenu(d.food || [])).catch(() => setMenu([]));
  }, [restaurant._id]);

  return (
    <Modal onClose={onClose} role="dialog" aria-label={restaurant.title}>
      <ModalHead onClose={onClose}>
        <div><h2>{restaurant.title}</h2><p>{restaurant.time || "Menu"}</p></div>
      </ModalHead>
      {menu === null ? <p className="empty">Loading menu…</p> : menu.length === 0 ? (
        <p className="empty">No dishes added for this restaurant yet.</p>
      ) : (
        <ul className="menu">
          {menu.map((m) => {
            const qty = qtyOf(m._id);
            return (
              <li key={m._id}>
                <div className="em"><Pic src={m.imageUrl} alt={m.title} /></div>
                <div><h4>{m.title}</h4><p>{m.description}</p><b>{inr(m.price)}</b></div>
                {qty === 0 ? (
                  <button className="add" disabled={!restaurant.isOpen || !m.isAvailabe} onClick={() => change(m, 1)}>
                    {m.isAvailabe ? "Add" : "Sold out"}
                  </button>
                ) : <Stepper qty={qty} onChange={(d) => change(m, d)} />}
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}
