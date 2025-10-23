import React, { useState } from "react";
import "./ProductModal.css";
import { getUsers, saveUsers, setCurrentUser } from "../utils/users";

export default function LoginModal({ visible, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [nombre, setNombre] = useState("");

  if (!visible) return null;

  function safeToast(msg) {
    if (typeof window.showToast === "function") window.showToast(msg);
    else alert(msg);
  }

  function handleLogin(asAdmin = false) {
    const users = getUsers();
    const mail = String(email || "")
      .trim()
      .toLowerCase();
    const pwd = String(password || "");
    const user = users.find(
      (u) =>
        (u.correo || "").toLowerCase() === mail &&
        String(u.password || "") === pwd
    );
    if (!user) {
      safeToast("Credenciales incorrectas");
      return;
    }
    // Si se intenta login como admin forzado, requiere el correo especial
    if (asAdmin) {
      if (mail !== "gin.trujillo@duocuc.cl") {
        safeToast("Sólo el correo administrador puede usar esta opción");
        return;
      }
      // marcar como admin y seguir
      user.isAdmin = true;
      const all = getUsers();
      const idx = all.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        all[idx] = user;
        saveUsers(all);
      }
      setCurrentUser(user);
      window.location.hash = "admin";
      onClose && onClose();
      return;
    }

    // Normal login
    setCurrentUser(user);
    if ((mail || "") === "gin.trujillo@duocuc.cl") {
      // redirigir a admin si es ese correo
      window.location.hash = "admin";
    }
    safeToast("Sesión iniciada");
    onClose && onClose();
  }

  function handleRegister() {
    const mail = String(email || "")
      .trim()
      .toLowerCase();
    if (!nombre || !mail || !password) {
      safeToast("Nombre, correo y contraseña son obligatorios");
      return;
    }
    const users = getUsers();
    if (users.find((u) => (u.correo || "").toLowerCase() === mail)) {
      safeToast("El correo ya está en uso");
      return;
    }
    const user = {
      id: Date.now(),
      nombre,
      correo: mail,
      password,
      fechaNacimiento: null,
      isAdmin: false,
      discount: 0,
      points: 0,
      referralCode: null,
    };
    users.push(user);
    saveUsers(users);
    setCurrentUser(user);
    safeToast("Registro exitoso");
    onClose && onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog product-modal">
        <div className="modal-header">
          <h5>{showRegister ? "Registro" : "Iniciar sesión"}</h5>
          <button className="close-btn" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="modal-body">
          {!showRegister ? (
            <div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleLogin(false)}
                >
                  Iniciar sesión
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleLogin(true)}
                >
                  Iniciar como administrador
                </button>
              </div>
              <div style={{ marginTop: 12 }}>
                <button
                  className="link-btn"
                  onClick={() => setShowRegister(true)}
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-primary" onClick={handleRegister}>
                  Registrarme
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => setShowRegister(false)}
                >
                  Volver al inicio de sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
