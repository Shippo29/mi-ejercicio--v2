import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import logo from "../assets/LOGO.png";
import SearchPage from "../pages/SearchPage";
import { getCurrentUser } from "../utils/users";

export default function Navbar() {
  const { actualizarContador } = useCart();
  const count = actualizarContador();
  const [search, setSearch] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);
  const [currentUser, setCurrentUserState] = useState(() => getCurrentUser());
  const containerRef = useRef(null);

  // La lista completa de regiones se mantiene en otro lugar si es necesario.
  const [location] = useState("Santiago");

  const onSearch = (e) => {
    e && e.preventDefault();
    // Notificar búsqueda globalmente
    window.dispatchEvent(new CustomEvent("globalSearch", { detail: search }));
    // navegar a home
    window.location.hash = "home";
    setPanelVisible(true);
  };

  // cerrar panel al hacer click fuera
  useEffect(() => {
    function onDoc(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setPanelVisible(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    function onUserChanged(e) {
      try {
        setCurrentUserState(getCurrentUser());
      } catch (err) {
        setCurrentUserState(null);
      }
    }
    window.addEventListener("userChanged", onUserChanged);
    window.addEventListener("storage", onUserChanged);
    return () => {
      window.removeEventListener("userChanged", onUserChanged);
      window.removeEventListener("storage", onUserChanged);
    };
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("currentUser");
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("userChanged", { detail: null }));
    window.location.hash = "home";
  }

  return (
    <nav className="nav" ref={containerRef}>
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
            onFocus={() => setPanelVisible(true)}
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

        <SearchPage
          query={search}
          setQuery={setSearch}
          visible={panelVisible}
          onClose={() => setPanelVisible(false)}
        />
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <a href="#home">Inicio</a>
          </li>
          <li>
            <a href="#ofertas">Ofertas</a>
          </li>
          <li>
            <a href="#contacto">Nosotros</a>
          </li>
        </ul>
        {currentUser ? (
          <>
            <a href="#cart">
              <button
                className="cart-btn"
                aria-label={`Abrir carrito, ${count} items`}
              >
                <AiOutlineShoppingCart
                  className="cart-icon"
                  aria-hidden="true"
                />
                <span className="cart-label">Carrito</span>
                <span id="cart-count" className="cart-badge" aria-live="polite">
                  {count}
                </span>
              </button>
            </a>
            <div className="nav-user">{currentUser.nombre}</div>
            <button className="btn logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button
              className="login-global-btn btn btn-sm"
              onClick={() => (window.location.hash = "login")}
            >
              Iniciar sesión
            </button>
            <a href="#cart">
              <button
                className="cart-btn"
                aria-label={`Abrir carrito, ${count} items`}
              >
                <AiOutlineShoppingCart
                  className="cart-icon"
                  aria-hidden="true"
                />
                <span className="cart-label">Carrito</span>
                <span id="cart-count" className="cart-badge" aria-live="polite">
                  {count}
                </span>
              </button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
