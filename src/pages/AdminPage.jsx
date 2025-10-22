import React, { useEffect, useState } from "react";
import productos from "../data/productos";

export default function AdminPage() {
  const [list, setList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("productos")) || productos.slice();
    } catch (e) {
      return productos.slice();
    }
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(list));
  }, [list]);

  function deleteProduct(id) {
    if (!window.confirm("Eliminar producto?")) return;
    setList((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="container mt-3">
      <h2>Admin - Productos</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>
                {require("../utils/format").formatCLP(Number(p.precio) || 0)}
              </td>
              <td>{p.categoria}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
