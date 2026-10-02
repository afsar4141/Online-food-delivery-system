export default function Stepper({ qty, onChange }) {
  return (
    <div className="stepper">
      <button onClick={() => onChange(-1)} aria-label="Remove one">−</button>
      <span>{qty}</span>
      <button onClick={() => onChange(1)} aria-label="Add one">+</button>
    </div>
  );
}
