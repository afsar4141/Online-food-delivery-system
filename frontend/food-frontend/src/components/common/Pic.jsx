import { useState } from "react";

export default function Pic({ src, alt }) {
  const [bad, setBad] = useState(false);
  return src && !bad ? <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} /> : <span>🍽️</span>;
}
