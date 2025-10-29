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
import Footer from "./components/Footer.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
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

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
