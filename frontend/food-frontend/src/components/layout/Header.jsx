import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const { user, logout, openAuth } = useAuth();
  const { count, setOpen } = useCart();
  return (
    <header className="nav">
      <a className="brand" href="/">Plate<span>Run</span></a>
      <div className="nav-right">
        {user ? (
          <>
            <span className="hello">Hi, {user.userName}</span>
            <button className="ghost" onClick={logout}>Log out</button>
          </>
        ) : (
          <button className="ghost" onClick={() => openAuth("login")}>Log in</button>
        )}
        <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          Cart {count > 0 && <b>{count}</b>}
        </button>
      </div>
    </header>
  );
}
