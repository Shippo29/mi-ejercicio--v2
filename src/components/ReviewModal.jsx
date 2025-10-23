import React, { useState, useMemo } from "react";
import "./ReviewModal.css";
import { toast } from "react-toastify";
import { addReview } from "../utils/reviews";

const defaultCategories = [
  { key: "calidad", label: "Calidad" },
  { key: "atencion", label: "Atención" },
  { key: "diseno", label: "Diseño" },
  { key: "valor", label: "Relación calidad-precio" },
];

function Stars({ value, onChange, ariaLabel }) {
  return (
    <div className="stars" role="radiogroup" aria-label={ariaLabel}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${n <= value ? "on" : "off"}`}
          onClick={() => onChange(n)}
          aria-checked={n === value}
          role="radio"
          title={`${n} estrella${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewModal({ visible, onClose, product }) {
  const [text, setText] = useState("");
  const [ratings, setRatings] = useState(() => {
    const obj = {};
    defaultCategories.forEach((c) => (obj[c.key] = 0));
    return obj;
  });

  const global = useMemo(() => {
    const vals = Object.values(ratings);
    if (!vals.length) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round((sum / vals.length) * 10) / 10;
  }, [ratings]);

  if (!visible) return null;

  function setRating(key, value) {
    setRatings((s) => ({ ...s, [key]: value }));
  }

  function submitReview(e) {
    e.preventDefault();
    if (!text.trim()) {
      toast.warning("Escribe una reseña antes de enviar");
      return;
    }
    // Guardar usando util global (será compatible con lista global y key por-producto)
    try {
      const pid = product?.id ?? product?.id ?? "unknown";
      const currentUser = window.getCurrentUser
        ? window.getCurrentUser()
        : null;
      const userName = currentUser
        ? currentUser.nombre || currentUser.name || "Anónimo"
        : "Anónimo";
      addReview(pid, userName, { ratings, global }, text.trim());
      // notify other parts of the app that reviews changed
      try {
        window.dispatchEvent(
          new CustomEvent("reviewsChanged", { detail: { productId: pid } })
        );
      } catch (e) {}
    } catch (err) {
      console.warn("No se pudo guardar la reseña", err);
    }

    toast.success("Reseña enviada", { autoClose: 2000 });
    setText("");
    // reset ratings
    setRatings(() => {
      const obj = {};
      defaultCategories.forEach((c) => (obj[c.key] = 0));
      return obj;
    });
    if (onClose) onClose();
  }

  return (
    <div className="review-modal" role="dialog" aria-modal="true">
      <div className="review-modal-backdrop" onClick={onClose} />
      <div className="review-modal-panel" role="document">
        <header className="review-modal-header">
          <h3>
            Escribir reseña — {product?.nombre || product?.name || "Producto"}
          </h3>
          <button
            className="review-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <form className="review-form" onSubmit={submitReview}>
          <div className="ratings-grid">
            {defaultCategories.map((c) => (
              <div className="rating-row" key={c.key}>
                <div className="rating-label">{c.label}</div>
                <Stars
                  value={ratings[c.key]}
                  onChange={(v) => setRating(c.key, v)}
                  ariaLabel={c.label}
                />
              </div>
            ))}
          </div>

          <div className="global-rating">
            <div className="global-text">
              Valoración global: <strong>{global}</strong>
            </div>
            <div className="global-stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`gstar ${n <= Math.round(global) ? "on" : "off"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <label htmlFor="reviewText" className="sr-only">
            Reseña
          </label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu reseña aquí..."
            rows={6}
          />

          <div className="review-actions">
            <button type="button" className="btn secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Enviar reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
