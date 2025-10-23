import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
// Se eliminó ProductsPage — el panel de búsqueda ahora está en la barra de navegación
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/CartNew";
import AdminPage from "./pages/AdminPage";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
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

  // La búsqueda global se maneja desde Navbar mediante SearchPanel

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-3">
        <nav style={{ marginBottom: 12 }}></nav>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {route === "home" && <HomePage />}
      {/* productos route removed */}
      {route === "cart" && <Cart />}
      {route === "admin" && <AdminPage />}
      {route === "ofertas" && <Offers />}
      {route === "login" && <LoginPage />}
      {route === "contacto" && <Contact />}
      <Footer />
    </div>
  );
}

export default App;
