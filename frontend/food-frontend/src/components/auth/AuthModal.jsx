import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal, { ModalHead } from "../common/Modal";

export default function AuthModal() {
  const { mode, setMode, login, register, setAuthOpen } = useAuth();
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const close = () => setAuthOpen(false);

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setMsg("");
    try {
      if (mode === "register") await register(form); else await login(form.email, form.password);
    } catch (err) { setMsg(err.message); }
    setBusy(false);
  };

  return (
    <Modal onClose={close} as="form" className="modal auth" onSubmit={submit}>
      <ModalHead onClose={close}><h2>{mode === "login" ? "Welcome back" : "Create account"}</h2></ModalHead>
      {mode === "register" && (
        <>
          <input placeholder="Full name" required onChange={set("userName")} />
          <input placeholder="Phone" required onChange={set("phone")} />
          <input placeholder="Delivery address" required onChange={set("address")} />
          <input placeholder="Security answer (for password reset)" required onChange={set("answer")} />
        </>
      )}
      <input type="email" placeholder="Email" required onChange={set("email")} />
      <input type="password" placeholder="Password" required onChange={set("password")} />
      {msg && <p className="err">{msg}</p>}
      <button className="primary" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}</button>
      <button type="button" className="link" onClick={() => { setMode(mode === "login" ? "register" : "login"); setMsg(""); }}>
        {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
      </button>
    </Modal>
  );
}
