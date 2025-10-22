import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function normalizeProduct(p) {
  return {
    id: p.id,
    nombre: p.nombre || p.name || "Producto",
    precio: Number(p.precio ?? p.price ?? 0),
    imagen: p.imagen || p.image || "/img/ps5.jpg",
  };
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
      return [];
    }
  });
  const [activeCoupon, setActiveCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (window.animateCartBadge) window.animateCartBadge();
    // dispatch event for external listeners
    document.dispatchEvent(
      new CustomEvent("cartChanged", {
        detail: { count: carrito.reduce((a, b) => a + b.cantidad, 0) },
      })
    );
  }, [carrito]);

  function guardarCarrito(list) {
    setCarrito(list);
  }

  function agregarAlCarrito(product) {
    const p = normalizeProduct(product);
    setCarrito((prev) => {
      const item = prev.find((x) => x.id === p.id);
      if (item) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, cantidad: x.cantidad + 1 } : x
        );
      }
      return [
        ...prev,
        {
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          descuento: product.descuento || 0,
          cantidad: 1,
          imagen: p.imagen,
        },
      ];
    });
    if (window.showToast)
      window.showToast(`${p.nombre} agregado al carrito 🛒`);
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  }

  function cambiarCantidad(id, nuevaCantidad) {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: Number(nuevaCantidad) } : p
      )
    );
  }

  function incrementar(id) {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  }

  function decrementar(id) {
    setCarrito((prev) => {
      const item = prev.find((p) => p.id === id);
      if (!item) return prev;
      if (item.cantidad > 1)
        return prev.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
      return prev.filter((p) => p.id !== id);
    });
  }

  function actualizarContador() {
    return carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  }

  function mostrarCarrito() {
    // La UI React debe usar el estado directamente; esta función queda como shim
    return carrito;
  }

  function finalizarCompra() {
    if (carrito.length === 0) {
      if (window.showToast) return window.showToast("Carrito vacío");
      alert("Carrito vacío");
      return;
    }
    const currentUser = window.getCurrentUser ? window.getCurrentUser() : null;
    const userDiscount =
      currentUser && currentUser.discount ? currentUser.discount : 0;
    let total = 0;
    // Si el carrito contiene un producto que ya tiene un descuento propio (por ejemplo el teclado con descuento),
    // no permitimos aplicar el extraDiscount del código DUOC para evitar acumulación.
    const hasExclusiveDiscount = carrito.some(
      (it) => it.descuento && it.descuento > 0
    );
    carrito.forEach((item) => {
      const baseDiscount = item.descuento || userDiscount || 0;
      let extraDiscount = 0;
      // Extra discount can come from applied coupon (activeCoupon) or user referralCode if no coupon
      const couponToCheck = activeCoupon
        ? activeCoupon
        : currentUser && currentUser.referralCode
        ? String(currentUser.referralCode)
        : null;
      if (
        couponToCheck &&
        String(couponToCheck).toLowerCase() === "duoc" &&
        !hasExclusiveDiscount
      )
        extraDiscount = 0.2;
      const totalDiscount = Math.min(baseDiscount + extraDiscount, 0.8);
      const price = Math.round(item.precio * (1 - totalDiscount));
      total += price * item.cantidad;
    });
    const points = Math.floor(total / 1000);
    // use CLP formatter for messages
    const { formatCLP } = require("../utils/format");
    if (currentUser) {
      if (window.addPointsToUser)
        window.addPointsToUser(currentUser.id, points + 10);
      const msg = `Compra finalizada. Total: ${formatCLP(total)}. Has ganado ${
        points + 10
      } puntos.`;
      if (window.showToast) window.showToast(msg);
      else alert(msg);
    } else {
      const msg = `Compra finalizada. Total: ${formatCLP(
        total
      )}. Inicia sesión para acumular puntos.`;
      if (window.showToast) window.showToast(msg);
      else alert(msg);
    }
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({
      id: Date.now(),
      items: carrito,
      total,
      userId: currentUser ? currentUser.id : null,
      date: new Date().toISOString(),
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    setCarrito([]);
    // clear coupon after purchase
    setActiveCoupon(null);
  }

  function applyCoupon(code) {
    if (!code) return { success: false, message: "Ingrese un código" };
    const c = String(code).trim().toLowerCase();
    // Only support DUOC for now
    if (c !== "duoc") return { success: false, message: "Código inválido" };
    const hasExclusiveDiscount = carrito.some(
      (it) => it.descuento && it.descuento > 0
    );
    if (hasExclusiveDiscount) {
      return {
        success: false,
        message:
          "El código DUOC no puede aplicarse junto a productos con descuento exclusivo en el carrito",
      };
    }
    setActiveCoupon("DUOC");
    return { success: true, message: "Cupón DUOC aplicado: 20% de descuento" };
  }

  function removeCoupon() {
    setActiveCoupon(null);
  }

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    incrementar,
    decrementar,
    guardarCarrito,
    actualizarContador,
    mostrarCarrito,
    finalizarCompra,
    applyCoupon,
    removeCoupon,
    activeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
