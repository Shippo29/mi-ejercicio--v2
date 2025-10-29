import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productosData from "../data/productos";
import { formatCLP } from "../utils/format";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  isAdminEmail,
} from "../utils/users";
import { getReviews } from "../utils/reviews";
import "./AdminPage.css";

export default function AdminPage() {
  const productos = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("productos")) || productosData.slice()
      );
    } catch (e) {
      return productosData.slice();
    }
  }, []);

  const orders = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch (e) {
      return [];
    }
  }, []);

  const { topProducts, totalUnits } = useMemo(() => {
    const map = {};
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        const id = it.id;
        const qty = Number(it.cantidad || 0) || 0;
        const price = Number(it.precio || 0) || 0;
        if (!map[id]) map[id] = { id, qty: 0, revenue: 0 };
        map[id].qty += qty;
        map[id].revenue += price * qty;
      });
    });
    const arr = Object.values(map).map((m) => {
      const prod = productos.find((p) => p.id === m.id) || {};
      return {
        id: m.id,
        nombre: prod.nombre || prod.name || `ID ${m.id}`,
        qty: m.qty,
        revenue: m.revenue,
      };
    });
    arr.sort((a, b) => b.qty - a.qty);
    const totalUnits = arr.reduce((s, x) => s + x.qty, 0);
    return { topProducts: arr, totalUnits };
  }, [orders, productos]);

  // Usuarios
  const [users, setUsers] = useState(() => getUsers());

  // edición
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    correo: "",
    password: "",
  });
  const [confirmForgot, setConfirmForgot] = useState(false);

  function openEdit(u) {
    setEditingUser(u);
    setEditForm({
      nombre: u.nombre || "",
      correo: u.correo || "",
      password: "",
    });
    setConfirmForgot(false);
  }

  function deleteUser(userId) {
    const current = getCurrentUser();
    const allowed =
      current && (current.isAdmin || isAdminEmail(current.correo));
    if (!allowed) return alert("No tienes permisos para eliminar usuarios.");
    const ok = window.confirm(
      "¿Eliminar este usuario? Esta acción no se puede deshacer."
    );
    if (!ok) return;
    const all = getUsers();
    const idx = all.findIndex((x) => x.id === userId);
    if (idx === -1) return alert("Usuario no encontrado");
    all.splice(idx, 1);
    saveUsers(all);
    setUsers(all);
    if (current && current.id === userId) {
      localStorage.removeItem("currentUser");
      navigate("/home");
    }
    if (typeof window.showToast === "function")
      window.showToast("Usuario eliminado");
  }

  function saveEdit() {
    if (!confirmForgot) {
      alert(
        "Marca la casilla que confirma que el usuario olvidó sus datos antes de editar."
      );
      return;
    }
    const all = getUsers();
    const idx = all.findIndex((x) => x.id === editingUser.id);
    if (idx === -1) return alert("Usuario no encontrado");
    const updated = {
      ...all[idx],
      nombre: editForm.nombre,
      correo: String(editForm.correo || "")
        .trim()
        .toLowerCase(),
    };
    if (editForm.password) updated.password = editForm.password;
    all[idx] = updated;
    saveUsers(all);
    setUsers(all);
    setEditingUser(null);
    setEditForm({ nombre: "", correo: "", password: "" });
    setConfirmForgot(false);
    if (typeof window.showToast === "function")
      window.showToast("Usuario actualizado");
  }

  // Reseñas
  const [reviews, setReviews] = useState(() => getReviews() || []);

  function extractRating(review) {
    if (!review) return null;
    if (typeof review.rating === "number" && !isNaN(review.rating))
      return Number(review.rating);
    if (review.ratings && typeof review.ratings === "object") {
      const r = review.ratings;
      if (typeof r.global === "number" && !isNaN(r.global))
        return Number(r.global);
      if (typeof r.total === "number" && !isNaN(r.total))
        return Number(r.total);
      if (typeof r.avg === "number" && !isNaN(r.avg)) return Number(r.avg);
      const nums = Object.values(r).filter(
        (v) => typeof v === "number" && !isNaN(v)
      );
      if (nums.length) return nums.reduce((a, b) => a + b, 0) / nums.length;
    }
    if (typeof review.global === "number" && !isNaN(review.global))
      return Number(review.global);
    if (typeof review.score === "number" && !isNaN(review.score))
      return Number(review.score);
    return null;
  }

  useEffect(() => {
    function onReviewsChanged() {
      try {
        setReviews(getReviews() || []);
      } catch (e) {}
    }
    window.addEventListener("reviewsChanged", onReviewsChanged);
    function onStorage(e) {
      if (!e.key) return;
      if (e.key === "reviews" || e.key.startsWith("reviews_prod_"))
        onReviewsChanged();
    }
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("reviewsChanged", onReviewsChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const productRatings = useMemo(() => {
    const map = {};
    (reviews || []).forEach((r) => {
      const id = r.productId;
      if (!map[id])
        map[id] = { reviewsTotal: 0, ratingsCount: 0, sum: 0, list: [] };
      map[id].reviewsTotal += 1;
      const rating = extractRating(r);
      if (rating !== null) {
        map[id].ratingsCount += 1;
        map[id].sum += Number(rating);
      }
      map[id].list.push(r);
    });
    const arr = Object.keys(map).map((k) => {
      const p = productos.find((x) => x.id === Number(k)) || {};
      const avg = map[k].ratingsCount ? map[k].sum / map[k].ratingsCount : 0;
      const topReview =
        (map[k].list || []).sort((a, b) => {
          const ra = extractRating(a) || 0;
          const rb = extractRating(b) || 0;
          return rb - ra;
        })[0] || null;
      return {
        productId: Number(k),
        nombre: p.nombre || p.name || `ID ${k}`,
        avg,
        count: map[k].reviewsTotal,
        ratingsCount: map[k].ratingsCount,
        topReview,
      };
    });
    arr.sort((a, b) => b.avg - a.avg);
    return arr;
  }, [reviews, productos]);

  const bestProduct = productRatings[0] || null;

  // Modal de confirmación para salir
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const originalLogoutRef = useRef(null);

  const navigate = useNavigate();

  function confirmExit(yes) {
    setExitModalOpen(false);
    if (!yes) {
      setPendingNavigation(null);
      return;
    }
    if (!pendingNavigation) {
      if (originalLogoutRef.current) originalLogoutRef.current();
      else navigate("/home");
      return;
    }
    if (pendingNavigation.type === "logout") {
      if (originalLogoutRef.current) originalLogoutRef.current();
      else navigate("/home");
      return;
    }
    if (pendingNavigation.type === "hash") {
      const target =
        (pendingNavigation.value || "#home").replace(/^#/, "") || "home";
      navigate(`/${target}`);
      setPendingNavigation(null);
      return;
    }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Panel de administración</h1>
          <p className="admin-sub">
            Visión general de la tienda — métricas, usuarios y reseñas
          </p>
        </div>
        <div className="admin-actions">
          <button
            className="btn btn-secondary btn-logout"
            onClick={() => {
              setPendingNavigation({ type: "logout" });
              setExitModalOpen(true);
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {exitModalOpen && (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <div
            className="admin-modal-backdrop"
            onClick={() => setExitModalOpen(false)}
          />
          <div className="admin-modal-panel" role="document">
            <header className="admin-modal-header">
              <h3>¿Quieres salir del panel de administrador?</h3>
              <p className="muted">
                Confirma para salir y cerrar la sesión administrativa.
              </p>
            </header>
            <div className="admin-modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => confirmExit(false)}
              >
                No, volver
              </button>
              <button
                className="btn btn-primary"
                onClick={() => confirmExit(true)}
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="admin-grid">
        <div className="admin-col admin-col-left">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Productos más vendidos</h3>
            </div>
            <div className="admin-card-body">
              {topProducts.length === 0 ? (
                <p className="muted">No hay ventas registradas aún.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-right">Unidades</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td className="text-right">{p.qty}</td>
                        <td className="text-right">{formatCLP(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="admin-card-footer">
              <strong>Total unidades vendidas:</strong> {totalUnits}
            </div>
          </div>

          <div className="admin-card mt">
            <div className="admin-card-header">
              <h3>Usuarios registrados</h3>
            </div>
            <div className="admin-card-body">
              {users.length === 0 ? (
                <p className="muted">No hay usuarios registrados.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.nombre}</td>
                        <td>{u.correo}</td>
                        <td>
                          {u.createdAt ||
                            u.fechaNacimiento ||
                            (u.id ? new Date(u.id).toLocaleDateString() : "—")}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => openEdit(u)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteUser(u.id)}
                              title="Eliminar usuario"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {editingUser && (
                <div className="admin-edit-panel">
                  <h5>Editar — {editingUser.nombre}</h5>
                  <div className="edit-row">
                    <input
                      className="input"
                      value={editForm.nombre}
                      onChange={(e) =>
                        setEditForm((s) => ({ ...s, nombre: e.target.value }))
                      }
                    />
                    <input
                      className="input"
                      value={editForm.correo}
                      onChange={(e) =>
                        setEditForm((s) => ({ ...s, correo: e.target.value }))
                      }
                    />
                    <input
                      className="input"
                      placeholder="Nueva contraseña (opcional)"
                      type="password"
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm((s) => ({ ...s, password: e.target.value }))
                      }
                    />
                  </div>
                  <div className="edit-actions">
                    <label className="checkbox-inline">
                      <input
                        type="checkbox"
                        checked={confirmForgot}
                        onChange={(e) => setConfirmForgot(e.target.checked)}
                      />{" "}
                      Confirmo que el usuario olvidó sus datos
                    </label>
                    <div>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={saveEdit}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditingUser(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="admin-col admin-col-center">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Reseña destacada</h3>
            </div>
            <div className="admin-card-body">
              {bestProduct ? (
                <div className="best-product">
                  <div className="best-title">{bestProduct.nombre}</div>
                  <div className="best-sub">
                    {bestProduct.avg.toFixed(1)} ★ — {bestProduct.count} reseñas
                  </div>
                  {bestProduct.topReview && (
                    <blockquote className="best-review">
                      <div className="review-author">
                        {bestProduct.topReview.userName ||
                          bestProduct.topReview.user ||
                          "Anónimo"}
                      </div>
                      <div className="review-text">
                        {bestProduct.topReview.comment ||
                          bestProduct.topReview.text}
                      </div>
                    </blockquote>
                  )}
                </div>
              ) : (
                <p className="muted">—</p>
              )}
            </div>
          </div>
        </div>

        <div className="admin-col admin-col-right">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Reseñas y promedios</h3>
            </div>
            <div className="admin-card-body">
              {productRatings.length === 0 ? (
                <p className="muted">No hay reseñas registradas.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-right">Promedio</th>
                      <th className="text-right"># reseñas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productRatings.map((p) => (
                      <tr key={p.productId}>
                        <td>{p.nombre}</td>
                        <td className="text-right">{p.avg.toFixed(1)}</td>
                        <td className="text-right">{p.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div style={{ marginTop: 12 }}>
                <h4 style={{ margin: "8px 0" }}>Todas las reseñas</h4>
                {reviews.length === 0 ? (
                  <p className="muted">No hay reseñas registradas.</p>
                ) : (
                  <div className="reviews-list">
                    {(reviews || []).map((r) => {
                      const prod =
                        productos.find((p) => p.id === r.productId) || {};
                      const rating = extractRating(r) || 0;
                      const rounded = Math.round(rating);
                      return (
                        <div
                          key={
                            r.id || `${r.productId}-${r.date || Math.random()}`
                          }
                          className="review-item"
                        >
                          <div className="review-meta">
                            <div className="review-product">
                              {prod.nombre || prod.name || `ID ${r.productId}`}
                            </div>
                            <div className="review-user">
                              {r.userName || r.user || "Anónimo"}
                            </div>
                            <div className="review-rating">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <span
                                  key={n}
                                  className={`gstar ${
                                    n <= rounded ? "on" : "off"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="review-text">
                            {r.comment || r.text || ""}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
