import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCLP, applyDiscount } from "../utils/format";
import "./Cart.css";

export default function Cart() {
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

  const [couponText, setCouponText] = useState("");
  const [couponMsg, setCouponMsg] = useState(null); 

  // Filtrar productos visibles (ocultar id = 101)
  const visibleProducts = useMemo(
    () => carrito.filter((p) => Number(p.id) !== 101),
    [carrito]
  );

  const hasHiddenTestProduct = useMemo(
    () => carrito.some((p) => Number(p.id) === 101),
    [carrito]
  );

  // Calcular subtotal aplicando descuentos individuales
  const subtotal = useMemo(() => {
    return visibleProducts.reduce((acc, p) => {
      const price = applyDiscount(p.precio, p.descuento || 0);
      return acc + price * (p.cantidad || 0);
    }, 0);
  }, [visibleProducts]);

  // Determinar si existe producto con descuento individual
  const hasIndividualDiscount = useMemo(
    () => visibleProducts.some((p) => p.descuento && p.descuento > 0),
    [visibleProducts]
  );

  // Si hay cupón activo y no hay descuentos individuales, aplicar 20%
  const couponDiscountPercent = useMemo(() => {
    if (!activeCoupon) return 0;
    if (hasIndividualDiscount) return 0;
    // asumimos que activeCoupon contiene 'DUOC' cuando está aplicado
    return String(activeCoupon).toLowerCase() === "duoc" ? 0.2 : 0;
  }, [activeCoupon, hasIndividualDiscount]);

  const discountAmount = Math.round(subtotal * couponDiscountPercent);
  const total = subtotal - discountAmount;

  function handleApplyCoupon(e) {
    e && e.preventDefault();
    const res = applyCoupon(couponText);
    if (res && res.success) {
      setCouponMsg({ type: "success", text: res.message });
      setCouponText("");
    } else {
      setCouponMsg({ type: "error", text: res ? res.message : "Error" });
    }
  }

  function handleRemoveCoupon() {
    removeCoupon();
    setCouponMsg({ type: "success", text: "Cupon removido" });
  }

  return (
    <div className="cart-page container">
      <h2>Carrito de Compras</h2>

      {hasHiddenTestProduct && (
        <div className="test-product-note">
          <div>
            Hay un producto de prueba en el carrito (oculto del listado).
          </div>
          <div className="small">ID 101 (oculto)</div>
        </div>
      )}

      {visibleProducts.length === 0 ? (
        <div className="empty">No hay productos en el carrito.</div>
      ) : (
        <table className="cart-table">
          <tbody>
            {visibleProducts.map((p) => {
              const priceWithDiscount = applyDiscount(
                p.precio,
                p.descuento || 0
              );
              return (
                <tr key={p.id} className="cart-row">
                  <td style={{ width: 80 }}>
                    <img src={p.imagen} alt={p.nombre} className="cart-thumb" />
                  </td>
                  <td className="product-info">
                    <div className="name">{p.nombre}</div>
                    <div className="price">
                      {p.descuento ? (
                        <>
                          <span className="price-old">
                            {formatCLP(p.precio)}
                          </span>
                          <span className="price-new">
                            {formatCLP(priceWithDiscount)}
                          </span>
                        </>
                      ) : (
                        <span className="price-new">{formatCLP(p.precio)}</span>
                      )}
                    </div>
                  </td>
                  <td className="qty-controls">
                    <button
                      className="btn btn-light"
                      onClick={() => decrementar(p.id)}
                    >
                      -
                    </button>
                    <div>{p.cantidad}</div>
                    <button
                      className="btn btn-light"
                      onClick={() => incrementar(p.id)}
                    >
                      +
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div>
                      {formatCLP(priceWithDiscount * (p.cantidad || 0))}
                    </div>
                    <div>
                      <button
                        className="btn btn-danger-soft"
                        onClick={() => eliminarDelCarrito(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="coupon-row">
        <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: 8 }}>
          <div className="coupon-input" style={{ flex: 1 }}>
            <input
              className="form-control"
              placeholder="Código de cupón"
              value={couponText}
              onChange={(e) => setCouponText(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-neon">
              Aplicar
            </button>
          </div>
          {activeCoupon && (
            <div>
              <button
                type="button"
                className="btn btn-danger-soft"
                onClick={handleRemoveCoupon}
              >
                Quitar cupón
              </button>
            </div>
          )}
        </form>
        {couponMsg && (
          <div
            className={`coupon-msg ${
              couponMsg.type === "success" ? "success" : "error"
            }`}
          >
            {couponMsg.text}
          </div>
        )}
      </div>

      <div className="cart-summary" style={{ marginTop: 18 }}>
        <div>
          <div>Subtotal: {formatCLP(subtotal)}</div>
          {couponDiscountPercent > 0 && (
            <div>
              Descuento cupón ({Math.round(couponDiscountPercent * 100)}%): -
              {formatCLP(discountAmount)}
            </div>
          )}
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            Total: {formatCLP(total)}
          </div>
        </div>
        <div>
          <button className="finalize-btn" onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
