import React, { useMemo, useState, useEffect, useRef } from "react";
import productos from "../data/productos";
import { formatCLP, applyDiscount } from "../utils/format";
import "./SearchPage.css";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

export default function SearchPage({ query, setQuery, visible, onClose }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const { agregarAlCarrito } = useCart();

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(productos.map((p) => p.categoria)))],
    []
  );

  useEffect(() => {
    if (visible && inputRef.current) inputRef.current.focus();
  }, [visible]);

  useEffect(() => {
    setShowAll(false);
  }, [category, query]);

  const filtered = useMemo(() => {
    let res = productos.slice();
    if (query)
      res = res.filter(
        (p) =>
          (p.nombre || "").toLowerCase().includes(query.toLowerCase()) ||
          (p.descripcion || "").toLowerCase().includes(query.toLowerCase())
      );
    if (category !== "all") res = res.filter((p) => p.categoria === category);
    switch (sort) {
      case "price-asc":
        res.sort((a, b) => a.precio - b.precio);
        break;
      case "price-desc":
        res.sort((a, b) => b.precio - a.precio);
        break;
      case "name-asc":
        res.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "name-desc":
        res.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
    return showAll ? res : res.slice(0, 16);
  }, [query, category, sort, showAll]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSort("default");
    setShowAll(false);
    if (onClose) onClose();
  }

  if (!visible) return null;

  return (
    <div className="search-page" role="dialog" aria-modal="true">
      <button
        className="search-close"
        onClick={onClose}
        aria-label="Cerrar búsqueda"
      >
        <IoClose size={22} />
      </button>

      <div className="search-page-inner">
        <div className="search-controls">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="panel-search-input"
            aria-label="Buscar en la tienda"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="all">Todas las categorías</option>
            {categories
              .filter((c) => c !== "all")
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar productos"
          >
            <option value="default">Orden por</option>
            <option value="price-asc">Precio ascendente</option>
            <option value="price-desc">Precio descendente</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
          </select>
          <button className="clear-btn" onClick={clearFilters}>
            Limpiar
          </button>
        </div>

        <div className="search-results">
          {filtered.length === 0 ? (
            <div className="no-results">No se encontraron productos</div>
          ) : (
            filtered.map((p) => (
              <div key={p.id} className="search-item">
                <div className="si-img-container">
                  {p.imagen ? (
                    <img src={p.imagen} alt={p.nombre} className="si-img" />
                  ) : (
                    <div className="si-img-placeholder">300x300</div>
                  )}
                </div>
                <div className="si-body">
                  <div className="si-name">{p.nombre}</div>
                  <div className="si-cat">{p.categoria}</div>
                  <div className="si-description">{p.descripcion}</div>
                  <div className="si-price">
                    {formatCLP(applyDiscount(p.precio, p.descuento || 0))}
                  </div>
                  <button
                    className="si-add-btn"
                    onClick={() => agregarAlCarrito(p)}
                    aria-label={`Agregar ${p.nombre} al carrito`}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))
          )}

          {!showAll && filtered.length >= 16 && (
            <div className="show-more" role="group" aria-label="Más resultados">
              <button
                className="show-more-btn"
                onClick={() => setShowAll(true)}
              >
                Ver más productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
