import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { formatCLP, applyDiscount } from "../utils/format";

export default function CartFixed() {
  const {
    carrito,
    incrementar,
    decrementar,
    eliminarDelCarrito,
    finalizarCompra,
    applyCoupon,
    removeCoupon,
    activeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState(null);

  const hasExclusiveDiscount = carrito.some(
    (p) => p.descuento && p.descuento > 0
  );

  const subtotal = carrito.reduce((acc, p) => {
    const base = p.descuento ? applyDiscount(p.precio, p.descuento) : p.precio;
    return acc + base * (p.cantidad || 1);
  }, 0);

  const couponDiscount =
    activeCoupon &&
    String(activeCoupon).toLowerCase() === "duoc" &&
    !hasExclusiveDiscount
      ? 0.2
      : 0;
  const finalTotal = Math.round(subtotal * (1 - couponDiscount));

  const visibleItems = carrito.filter((it) => it.id !== 101);
  const couponIsError =
    couponMessage &&
    /no|invál|no se/i.test(String(couponMessage).toLowerCase());

  const handleApply = () => {
    if (!couponInput || !couponInput.trim())
      return setCouponMessage("Ingrese un código de cupón");
    const res = applyCoupon(couponInput.trim());
    setCouponMessage(res.message);
    if (res.success) setCouponInput("");
  };

  return (
    <div className="cart-page container">
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.some((it) => it.id === 101) && (
            <div className="test-product-note">
              <div>
                El producto "Soporte para laptop ajustable" está marcado como
                prueba y no se muestra en el listado porque no tiene imagen
                oficial.
              </div>
              <div>
                <button
                  className="btn-danger-soft"
                  onClick={() => eliminarDelCarrito(101)}
                >
                  Eliminar del carrito
                </button>
              </div>
            </div>
          )}

          <div className="cart-table">
            {visibleItems.map((item) => (
              <div key={item.id} className="cart-row d-flex align-items-center">
                <div style={{ width: 90 }}>
                  <img
                    src={item.imagen}
                    className="cart-thumb"
                    alt={item.nombre}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="product-info">
                    <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                    <div
                      style={{ fontSize: 13, color: "rgba(199,210,255,0.6)" }}
                    >
                      {item.categoria}
                    </div>
                  </div>
                </div>

                <div style={{ width: 160 }}>
                  {item.descuento ? (
                    <>
                      <span className="price-old">
                        {formatCLP(item.precio)}
                      </span>
                      <div className="price-new">
                        {formatCLP(applyDiscount(item.precio, item.descuento))}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontWeight: 700 }}>
                      {formatCLP(item.precio)}
                    </div>
                  )}
                </div>

                <div style={{ width: 160 }}>
                  <div className="qty-controls">
                    <button
                      aria-label="disminuir"
                      className="btn-neon"
                      onClick={() => decrementar(item.id)}
                    >
                      -
                    </button>
                    <span style={{ margin: "0 12px" }}>{item.cantidad}</span>
                    <button
                      aria-label="aumentar"
                      className="btn-neon"
                      onClick={() => incrementar(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ width: 120, fontWeight: 700 }}>
                  {formatCLP(
                    (item.descuento
                      ? applyDiscount(item.precio, item.descuento)
                      : item.precio) * item.cantidad
                  )}
                </div>

                <div style={{ width: 140 }}>
                  <button
                    className="btn-danger-soft"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="coupon-row">
        <div className="coupon-input d-flex" style={{ gap: 12 }}>
          <input
            className="form-control"
            placeholder="Código de cupón (por ejemplo: DUOC)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />

          {activeCoupon ? (
            <button
              className="btn-danger-soft"
              onClick={() => {
                removeCoupon();
                setCouponMessage("Cupón removido");
              }}
            >
              Quitar
            </button>
          ) : (
            <button className="btn-neon" onClick={handleApply}>
              Aplicar
            </button>
          )}
        </div>

        {couponMessage && (
          <div className={`coupon-msg ${couponIsError ? "error" : "success"}`}>
            {couponMessage}
          </div>
        )}

        <div className="cart-summary">
          <h4>
            Total: {formatCLP(finalTotal)}{" "}
            {couponDiscount > 0 && (
              <small style={{ color: "#7ef0b4" }}>(Descuento aplicado)</small>
            )}
          </h4>
          <button className="finalize-btn" onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
