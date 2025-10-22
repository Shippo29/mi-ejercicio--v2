import React, { useEffect, useState } from "react";
import "./ProductModal.css";
import { formatCLP, applyDiscount } from "../utils/format";

export default function ProductModal({ producto, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (!producto) return;
    const list = window.getReviewsForProduct
      ? window.getReviewsForProduct(producto.id)
      : [];
    setReviews(list);
  }, [producto]);

  function submitReview() {
    const userName = window.getCurrentUser
      ? window.getCurrentUser()
        ? window.getCurrentUser().nombre
        : "Anon"
      : "Anon";
    if (!text) return alert("Escribe una reseña");
    if (window.addReview)
      window.addReview(producto.id, userName, Number(rating), text);
    const list = window.getReviewsForProduct
      ? window.getReviewsForProduct(producto.id)
      : [];
    setReviews(list);
    setText("");
    if (window.showToast) window.showToast("Gracias por tu reseña.");
  }

  if (!producto) return null;
  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose}>
          ✕
        </button>
        <div className="pm-body">
          <div
            className="pm-img"
            style={{ backgroundImage: `url(${producto.imagen})` }}
          />
          <div className="pm-info">
            <h3>{producto.nombre}</h3>
            <p className="pm-cat">{producto.categoria}</p>
            <p className="pm-price">
              {producto.descuento ? (
                <>
                  <span className="price-old">
                    {formatCLP(producto.precio)}
                  </span>
                  <span className="price-new">
                    {formatCLP(
                      applyDiscount(producto.precio, producto.descuento)
                    )}
                  </span>
                </>
              ) : (
                <span className="price-new">{formatCLP(producto.precio)}</span>
              )}
            </p>
            <p>{producto.descripcion}</p>

            <hr />
            <h6>Reseñas</h6>
            <div id="reviewsList">
              {reviews.length === 0 ? (
                <p className="text-muted">Sin reseñas aún.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="mb-2">
                    <strong>{r.userName || "Usuario"}</strong> - {r.rating}⭐
                    <br />
                    <small className="text-muted">
                      {new Date(r.date).toLocaleString()}
                    </small>
                    <p>{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            <h6>Agregar reseña</h6>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control mb-2"
              placeholder="Tu opinión"
            />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-select mb-2"
            >
              <option value={5}>5 - Excelente</option>
              <option value={4}>4 - Muy bueno</option>
              <option value={3}>3 - Bueno</option>
              <option value={2}>2 - Regular</option>
              <option value={1}>1 - Malo</option>
            </select>
            <button className="pm-add" onClick={submitReview}>
              Enviar reseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
