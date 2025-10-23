import React, { useState } from "react";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { formatCLP, applyDiscount } from "../utils/format";
import ReviewModal from "./ReviewModal";

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useCart();
  const [reviewOpen, setReviewOpen] = useState(false);
  const discount = product.descuento || 0;
  const finalPrice = discount
    ? applyDiscount(product.precio, discount)
    : product.precio;

  return (
    <div className="card">
      <div
        className="card-img"
        style={{ backgroundImage: `url(${product.imagen})` }}
        onClick={() => setReviewOpen(true)}
        role="button"
        aria-label={`Abrir reseña para ${product.nombre}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setReviewOpen(true)}
      />
      <div className="card-body">
        <h3>{product.nombre}</h3>
        <p className="price">
          {discount ? (
            <>
              <span className="price-old">{formatCLP(product.precio)}</span>
              <span className="price-new">{formatCLP(finalPrice)}</span>
            </>
          ) : (
            <span className="price-new">{formatCLP(product.precio)}</span>
          )}
        </p>
        <p className="desc">{product.descripcion}</p>
        <button className="add-btn" onClick={() => agregarAlCarrito(product)}>
          Agregar al carrito
        </button>
      </div>

      <ReviewModal
        visible={reviewOpen}
        onClose={() => setReviewOpen(false)}
        product={product}
      />
    </div>
  );
}
