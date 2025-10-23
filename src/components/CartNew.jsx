import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { formatCLP, applyDiscount } from "../utils/format";

export default function CartNew() {
  const {
    carrito = [],
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
  const [bumpedId, setBumpedId] = useState(null);
  const [shipping, setShipping] = useState({ direccion: "", comuna: "" });

  // Ocultar producto de prueba id=101 del listado
  const visible = (carrito || []).filter((p) => p && p.id !== 101);

  const hasItemDiscount = (carrito || []).some(
    (p) => p && p.descuento && p.descuento > 0
  );

  const subtotal = (carrito || []).reduce((acc, p) => {
    const qty = p.cantidad || 1;
    const price = p.descuento ? applyDiscount(p.precio, p.descuento) : p.precio;
    return acc + price * qty;
  }, 0);

  const couponPercent =
    activeCoupon &&
    String(activeCoupon).toLowerCase() === "duoc" &&
    !hasItemDiscount
      ? 0.2
      : 0;
  const total = Math.round(subtotal * (1 - couponPercent));

  const couponIsError =
    couponMessage &&
    /no|invál|no se/i.test(String(couponMessage).toLowerCase());

  const onApply = () => {
    if (!couponInput || !couponInput.trim())
      return setCouponMessage("Ingrese un código de cupón");
    const res = applyCoupon(couponInput.trim());
    if (res && typeof res === "object") {
      setCouponMessage(
        res.message || (res.success ? "Cupón aplicado" : "Cupón inválido")
      );
      if (res.success) setCouponInput("");
    } else {
      setCouponMessage(String(res || "Error aplicando cupón"));
    }
  };

  const onRemove = () => {
    if (removeCoupon) removeCoupon();
    setCouponMessage("Cupón removido");
  };

  return (
    <div className="cart-page container">
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.some((it) => it && it.id === 101) && (
            <div className="test-product-note">
              <div>
                El producto "Soporte para laptop ajustable" está marcado como
                prueba y no aparece en la lista principal.
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
            {visible.map((item) => (
              <div
                key={item.id}
                className={`cart-row d-flex align-items-center enter`}
              >
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
                      className="btn-neon"
                      onClick={() => {
                        decrementar(item.id);
                        setBumpedId(item.id);
                      }}
                      aria-label={`Disminuir cantidad de ${item.nombre}`}
                    >
                      -
                    </button>
                    <span
                      className={bumpedId === item.id ? "qty-bump" : ""}
                      style={{ margin: "0 12px" }}
                    >
                      {item.cantidad}
                    </span>
                    <button
                      className="btn-neon"
                      onClick={() => {
                        incrementar(item.id);
                        setBumpedId(item.id);
                      }}
                      aria-label={`Aumentar cantidad de ${item.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ width: 120, fontWeight: 700 }}>
                  {formatCLP(
                    (item.descuento
                      ? applyDiscount(item.precio, item.descuento)
                      : item.precio) * (item.cantidad || 1)
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
            <button className="btn-danger-soft" onClick={onRemove}>
              Quitar
            </button>
          ) : (
            <button className="btn-neon" onClick={onApply}>
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
            Total: {formatCLP(total)}{" "}
            {couponPercent > 0 && (
              <small style={{ color: "#7ef0b4" }}>(Descuento aplicado)</small>
            )}
          </h4>

          <div style={{ marginTop: 10, marginBottom: 8 }}>
            <strong>Dirección de envío</strong>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                className="form-control"
                placeholder="Dirección"
                value={shipping.direccion}
                onChange={(e) =>
                  setShipping((s) => ({ ...s, direccion: e.target.value }))
                }
              />
              <input
                className="form-control"
                placeholder="Comuna"
                value={shipping.comuna}
                onChange={(e) =>
                  setShipping((s) => ({ ...s, comuna: e.target.value }))
                }
              />
            </div>
          </div>

          <button
            className="finalize-btn"
            onClick={() => finalizarCompra(shipping)}
            disabled={!shipping.direccion || !shipping.comuna}
            title={
              !shipping.direccion || !shipping.comuna
                ? "Completa dirección y comuna antes de finalizar"
                : "Finalizar compra"
            }
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
