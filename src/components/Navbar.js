import React, { useState } from "react";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import logo from "../assets/LOGO.png";

export default function Navbar() {
  const { actualizarContador } = useCart();
  const count = actualizarContador();
  const [search, setSearch] = useState("");

  // La lista completa de regiones se mantiene en otro lugar si es necesario.

  const [location] = useState("Santiago");

  const onSearch = (e) => {
    e.preventDefault();
    // Notificar búsqueda globalmente
    window.dispatchEvent(new CustomEvent("globalSearch", { detail: search }));
    // navegar a home
    window.location.hash = "home";
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#home" className="logo-link">
          <img src={logo} alt="Logo de la empresa" className="navbar-logo" />
        </a>
        <div className="brand-wrap">
          <h1 className="brand">Level-Up Gamer</h1>
        </div>
      </div>

      <div className="nav-center">
        <form className="search-form" onSubmit={onSearch}>
          <input
            type="search"
            placeholder="Buscar productos, marcas y más..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Buscar productos"
          />
          <button type="submit" className="search-btn">
            Buscar
          </button>
        </form>
        <div className="location">
          <label>Enviar a</label>
          <div className="location-select" role="group" aria-label="Región">
            <span className="location-text">{location}</span>
          </div>
        </div>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <a href="#home">Inicio</a>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#ofertas">Ofertas</a>
          </li>
          <li>
            <a href="#contacto">Nosotros</a>
          </li>
        </ul>
        <a href="#cart">
          <button className="cart-btn">🛒 Carrito ({count})</button>
        </a>
      </div>
    </nav>
  );
}
