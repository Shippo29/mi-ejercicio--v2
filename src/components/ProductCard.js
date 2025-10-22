import React from "react";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { formatCLP, applyDiscount } from "../utils/format";

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useCart();
  const title = product.nombre || product.name;
  const price = product.precio || product.price;
  const discount = product.descuento || 0;
  const finalPrice = discount ? applyDiscount(price, discount) : price;
  const desc = product.descripcion || product.description;
  const img = product.imagen || product.image || product.imageUrl;

  return (
    <div className="card">
      <div className="card-img" style={{ backgroundImage: `url(${img})` }} />
      <div className="card-body">
        <h3>{title}</h3>
        <p className="price">
          {discount ? (
            <>
              <span className="price-old">{formatCLP(price)}</span>
              <span className="price-new">{formatCLP(finalPrice)}</span>
            </>
          ) : (
            <span className="price-new">{formatCLP(price)}</span>
          )}
        </p>
        <p className="desc">{desc}</p>
        <button className="add-btn" onClick={() => agregarAlCarrito(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
