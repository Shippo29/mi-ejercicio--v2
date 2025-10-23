import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import {
  getUsers,
  saveUsers,
  setCurrentUser,
  isAdminEmail,
} from "../utils/users";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [nombre, setNombre] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    try {
      const pre = localStorage.getItem("prefillEmail");
      if (pre) setEmail(pre);
    } catch (e) {}
  }, []);

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
    if (asAdmin) {
      if (!isAdminEmail(mail)) {
        safeToast("Sólo un correo autorizado puede usar esta opción");
        return;
      }
      user.isAdmin = true;
      const all = getUsers();
      const idx = all.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        all[idx] = user;
        saveUsers(all);
      }
      setCurrentUser(user);
      window.location.hash = "admin";
      return;
    }
    setCurrentUser(user);
    if (mail === "gin.trujillo@duocuc.cl") window.location.hash = "admin";
    safeToast("Sesión iniciada");
  }

  function handleRegister() {
    const mail = String(email || "")
      .trim()
      .toLowerCase();
    if (!nombre || !mail || !password || !dob) {
      safeToast(
        "Nombre, correo, contraseña y fecha de nacimiento son obligatorios"
      );
      return;
    }
    // validar edad >= 18
    const nacimiento = new Date(dob);
    const diff = Date.now() - nacimiento.getTime();
    const edad = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    if (edad < 18) {
      safeToast("Debes tener al menos 18 años para crear una cuenta");
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
      fechaNacimiento: dob,
      isAdmin: false,
      discount: 0,
      points: 0,
      referralCode: null,
    };
    users.push(user);
    saveUsers(users);
    // preguntar auto-login
    const auto = window.confirm("¿Deseas iniciar sesión automáticamente?");
    if (auto) {
      setCurrentUser(user);
      // notificar a la UI React
      window.dispatchEvent(new CustomEvent("userChanged", { detail: user }));
      safeToast("Registro exitoso. Sesión iniciada.");
      window.location.hash = "home";
      try {
        localStorage.removeItem("prefillEmail");
      } catch (e) {}
      return;
    }
    // si no auto-login, guardar email para prefill
    try {
      localStorage.setItem("prefillEmail", mail);
    } catch (e) {}
    safeToast("Registro exitoso");
    window.location.hash = "home";
  }

  function handleAdminPrompt() {
    const input = window.prompt("Ingrese correo de administrador:", "");
    if (!input) return;
    const mail = String(input).trim().toLowerCase();
    if (!isAdminEmail(mail)) {
      safeToast("No tienes permisos de administrador");
      return;
    }
    const users = getUsers();
    let user = users.find((u) => (u.correo || "").toLowerCase() === mail);
    if (!user) {
      user = {
        id: Date.now(),
        nombre: "Administrador",
        correo: mail,
        password: null,
        fechaNacimiento: null,
        isAdmin: true,
        discount: 0,
        points: 0,
        referralCode: null,
      };
      users.push(user);
      saveUsers(users);
    } else {
      user.isAdmin = true;
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx] = user;
        saveUsers(users);
      }
    }
    setCurrentUser(user);
    window.dispatchEvent(new CustomEvent("userChanged", { detail: user }));
    window.location.hash = "admin";
  }

  return (
    <div className="login-page container">
      <div className="login-card">
        <h2 className="login-title">
          {showRegister ? "Registro" : "Iniciar sesión"}
        </h2>
        {!showRegister ? (
          <div className="login-form">
            <label>Correo</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <label>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <div className="login-actions">
              <button
                className="btn primary"
                onClick={() => handleLogin(false)}
              >
                Iniciar sesión
              </button>
              <button className="btn admin" onClick={handleAdminPrompt}>
                Iniciar como administrador
              </button>
            </div>

            <div className="login-links">
              <button className="link" onClick={() => setShowRegister(true)}>
                ¿No tienes cuenta? Regístrate aquí
              </button>
            </div>
          </div>
        ) : (
          <div className="register-form">
            <label>Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label>Correo</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <label>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <label>Fecha de nacimiento</label>
            <input
              id="perfilFechaNacimiento"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <div className="login-actions">
              <button className="btn primary" onClick={handleRegister}>
                Registrarme
              </button>
              <button
                className="btn link"
                onClick={() => setShowRegister(false)}
              >
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
