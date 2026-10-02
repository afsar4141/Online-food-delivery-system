export default function Modal({ onClose, side = false, as: Tag = "div", className = "modal", children, ...rest }) {
  return (
    <div className={`overlay ${side ? "right" : ""}`} onClick={onClose}>
      <Tag className={className} onClick={(e) => e.stopPropagation()} {...rest}>{children}</Tag>
    </div>
  );
}

export function ModalHead({ onClose, children }) {
  return (
    <div className="modal-head">
      {children}
      <button type="button" className="x" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
