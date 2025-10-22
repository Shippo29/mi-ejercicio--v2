import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import Cart from "./components/CartNew";
import AdminPage from "./pages/AdminPage";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import { useState, useEffect } from "react";
import Footer from "./components/Footer.jsx";

function App() {
  const [route, setRoute] = useState(
    window.location.hash.replace("#", "") || "home"
  );
  useEffect(() => {
    const onHash = () =>
      setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const [globalQuery, setGlobalQuery] = React.useState("");
  useEffect(() => {
    const handler = (e) => setGlobalQuery(e.detail || "");
    window.addEventListener("globalSearch", handler);
    return () => window.removeEventListener("globalSearch", handler);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-3">
        <nav style={{ marginBottom: 12 }}></nav>
      </div>
      {route === "home" && <HomePage />}
      {route === "productos" && <ProductsPage initialQuery={globalQuery} />}
      {route === "cart" && <Cart />}
      {route === "admin" && <AdminPage />}
      {route === "ofertas" && <Offers />}
      {route === "contacto" && <Contact />}
      <Footer />
    </div>
  );
}

export default App;
