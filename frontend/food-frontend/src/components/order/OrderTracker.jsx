import { useEffect, useState } from "react";

const STEPS = ["Order placed", "Preparing", "On the way", "Delivered"];

export default function OrderTracker({ orderId, onDismiss }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 3) return;
    const t = setTimeout(() => setStep(step + 1), 4000);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section className="tracker" aria-live="polite">
      <h2>{step === 3 ? "Your order has arrived" : "Your order is on the way"}</h2>
      <p className="oid">Order #{orderId.slice(-6).toUpperCase()}</p>
      <ol>{STEPS.map((s, i) => <li key={s} className={i <= step ? "done" : ""}><i />{s}</li>)}</ol>
      {step === 3 && <button className="link" onClick={onDismiss}>Dismiss</button>}
    </section>
  );
}
