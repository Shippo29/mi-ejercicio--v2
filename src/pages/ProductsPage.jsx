import React, { useMemo, useState, useEffect } from "react";
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import "./ProductsPage.css";

export default function ProductsPage({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(productos.map((p) => p.categoria)))],
    []
  );

  useEffect(() => {
    // ensure images path exists — nothing to do; placeholder for preloads
  }, []);

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
    return res;
  }, [query, category, sort]);

  return (
    <div className="products-page container">
      <div className="filters">
        <input
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id="searchInput"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="categorySelect"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          id="sortSelect"
        >
          <option value="default">Orden por</option>
          <option value="price-asc">Precio ascendente</option>
          <option value="price-desc">Precio descendente</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
        </select>
        <button
          id="clearFilters"
          onClick={() => {
            setQuery("");
            setCategory("all");
            setSort("default");
          }}
        >
          Limpiar
        </button>
      </div>

      <section id="all-productos" className="products-grid">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="prod-wrapper"
            onClick={() => setSelected(p)}
          >
            <ProductCard
              product={{
                id: p.id,
                name: p.nombre,
                price: p.precio,
                description: p.descripcion,
                image: p.imagen,
              }}
            />
          </div>
        ))}
      </section>

      {selected && (
        <ProductModal producto={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
