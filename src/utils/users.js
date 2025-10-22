const ADMIN_EMAILS = ["ag.llanten@duocuc.cl", "cr.brionesj@duocuc.cl"];

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch (e) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// migration: give duoc emails a discount if missing
(function () {
  try {
    const users = getUsers();
    let changed = false;
    users.forEach((u) => {
      if (
        u &&
        (!("discount" in u) || !u.discount) &&
        typeof u.correo === "string" &&
        u.correo.toLowerCase().includes("@duoc")
      ) {
        u.discount = 0.2;
        changed = true;
      }
    });
    if (changed) saveUsers(users);
  } catch (e) {
    console.error("Error migrating users for duoc discount", e);
  }
})();

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  updateNavbarUser();
}

export function logout() {
  localStorage.removeItem("currentUser");
  updateNavbarUser();
  window.location.href = "index.html";
}

export function updateNavbarUser() {
  const user = getCurrentUser();
  const loginLink = document.querySelector('a[href="login.html"]');
  if (!loginLink) return;
  const parent = loginLink.parentElement;
  if (user) {
    parent.innerHTML = `<a class="nav-link" href="#">${user.nombre}</a><a class="nav-link" href="#" onclick="logout()">Salir</a>`;
  } else {
    parent.innerHTML = `<a class="nav-link" href="login.html">Login</a>`;
  }
}

export function addPointsToUser(userId, amount) {
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return;
  user.points = (user.points || 0) + amount;
  saveUsers(users);
  const current = getCurrentUser();
  if (current && current.id === user.id) setCurrentUser(user);
}

export function isAdminEmail(email) {
  if (!email || typeof email !== "string") return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function loginAsAdminByEmail(email) {
  const mail = String(email || "")
    .trim()
    .toLowerCase();
  if (!isAdminEmail(mail))
    return { success: false, message: "Correo no autorizado para admin" };
  const users = getUsers();
  let user = users.find((u) => u.correo === mail);
  if (user) {
    user.isAdmin = true;
    const idx = users.findIndex((x) => x.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      saveUsers(users);
    }
  } else {
    user = {
      id: Date.now(),
      nombre: "Administrador",
      correo: mail,
      fechaNacimiento: null,
      password: null,
      isAdmin: true,
      discount: 0,
      points: 0,
      referralCode: null,
    };
    users.push(user);
    saveUsers(users);
  }
  setCurrentUser(user);
  return { success: true, message: "Acceso admin concedido" };
}

export function validateRUN(run) {
  if (!run) return true;
  const cleaned = String(run).replace(/\./g, "").trim();
  return /^\d{7,8}-[\dKk]$/.test(cleaned);
}

export function populateProfileForm() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const nombre = document.getElementById("perfilNombre");
  const correo = document.getElementById("perfilCorreo");
  const fecha = document.getElementById("perfilFechaNacimiento");
  const run = document.getElementById("perfilRUN");
  const region = document.getElementById("perfilRegion");
  const comuna = document.getElementById("perfilComuna");
  const newsletter = document.getElementById("perfilNewsletter");
  if (nombre) nombre.value = user.nombre || "";
  if (correo) correo.value = user.correo || "";
  if (fecha) fecha.value = user.fechaNacimiento || "";
  if (run) run.value = user.run || "";
  if (region) region.value = user.region || "";
  if (comuna) comuna.value = user.comuna || "";
  if (newsletter) newsletter.checked = !!user.newsletter;
  const puntos = document.getElementById("perfilPuntos");
  const referral = document.getElementById("perfilReferral");
  if (puntos) puntos.value = user.points || 0;
  if (referral) referral.value = user.referralCode || "";
  const copyBtn = document.getElementById("copyReferralBtn");
  if (copyBtn && referral)
    copyBtn.onclick = () => {
      navigator.clipboard && referral.value
        ? navigator.clipboard.writeText(referral.value).then(() => {
            if (window.showToast) showToast("Copiado");
            else alert("Copiado");
          })
        : null;
    };
}

export function updateUserProfileFromForm() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const nombre = document.getElementById("perfilNombre").value.trim();
  const correo = document
    .getElementById("perfilCorreo")
    .value.trim()
    .toLowerCase();
  const fecha = document.getElementById("perfilFechaNacimiento").value;
  const run = document.getElementById("perfilRUN").value.trim();
  const region = document.getElementById("perfilRegion").value.trim();
  const comuna = document.getElementById("perfilComuna").value.trim();
  const newsletter = document.getElementById("perfilNewsletter").checked;
  const currentPwd = document.getElementById("perfilCurrentPassword")
    ? document.getElementById("perfilCurrentPassword").value
    : "";
  const newPwd = document.getElementById("perfilNewPassword")
    ? document.getElementById("perfilNewPassword").value
    : "";
  const confirmPwd = document.getElementById("perfilConfirmPassword")
    ? document.getElementById("perfilConfirmPassword").value
    : "";

  if (!nombre || !correo) {
    if (window.showToast) showToast("Nombre y correo son obligatorios");
    else alert("Nombre y correo son obligatorios");
    return;
  }
  if (run && !validateRUN(run)) {
    if (window.showToast) showToast("Formato RUN inválido (ej: 12345678-9)");
    else alert("Formato RUN inválido (ej: 12345678-9)");
    return;
  }
  if (fecha) {
    const nacimiento = new Date(fecha);
    const diff = Date.now() - nacimiento.getTime();
    const edad = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    if (edad < 18) {
      if (window.showToast) showToast("Debes ser mayor de 18 años");
      else alert("Debes ser mayor de 18 años");
      return;
    }
  }

  const users = getUsers();
  const conflict = users.find((u) => u.correo === correo && u.id !== user.id);
  if (conflict) {
    if (window.showToast)
      showToast("El correo ya está en uso por otro usuario");
    else alert("El correo ya está en uso por otro usuario");
    return;
  }

  if (newPwd || confirmPwd || currentPwd) {
    if (user.password) {
      if (!currentPwd || currentPwd !== user.password) {
        if (window.showToast) showToast("Contraseña actual incorrecta");
        else alert("Contraseña actual incorrecta");
        return;
      }
    }
    if (newPwd !== confirmPwd) {
      if (window.showToast) showToast("Las nuevas contraseñas no coinciden");
      else alert("Las nuevas contraseñas no coinciden");
      return;
    }
    user.password = newPwd || user.password;
  }

  const idx = users.findIndex((u) => u.id === user.id);
  const updated = Object.assign({}, user, {
    nombre,
    correo,
    fechaNacimiento: fecha || user.fechaNacimiento,
    run: run || user.run,
    region: region || user.region,
    comuna: comuna || user.comuna,
    newsletter: !!newsletter,
  });
  if (!updated.referralCode) {
    try {
      const local =
        (updated.correo || "").split("@")[0] ||
        "u" + String(updated.id).slice(-4);
      updated.referralCode = `${local}.${String(updated.id).slice(-4)}`;
    } catch (e) {
      updated.referralCode = String(updated.id);
    }
  }
  if (idx !== -1) {
    users[idx] = updated;
    saveUsers(users);
  }
  setCurrentUser(updated);
  if (window.showToast) showToast
  ("Perfil actualizado");
  else alert("Perfil actualizado");
}

export function getUserById(id) {
  const users = getUsers();
  return users.find((u) => u.id === id) || null;
}

export function saveUsersAndKeepCurrent(users) {
  saveUsers(users);
  const current = getCurrentUser();
  if (current) {
    const updated = users.find((u) => u.id === current.id);
    if (updated) setCurrentUser(updated);
  }
}

export function addPointEvent(userId, amount, reason) {
  const users = getUsers();
  const uidx = users.findIndex((u) => u.id === userId);
  if (uidx === -1) return false;
  const user = users[uidx];
  user.points = (user.points || 0) + amount;
  user.pointHistory = user.pointHistory || [];
  user.pointHistory.unshift({
    id: Date.now(),
    amount,
    reason: reason || "Actividad",
    date: new Date().toISOString(),
  });
  users[uidx] = user;
  saveUsersAndKeepCurrent(users);
  return true;
}

export function computeLevel(points) {
  if (!points || points < 500)
    return {
      level: "Bronze",
      next: 500,
      pct: Math.min(100, Math.round(((points || 0) / 500) * 100)),
    };
  if (points < 2000)
    return {
      level: "Silver",
      next: 2000,
      pct: Math.min(100, Math.round((points / 2000) * 100)),
    };
  return { level: "Gold", next: null, pct: 100 };
}

export function getPointHistory(userId, limit = 50) {
  const user = getUserById(userId);
  if (!user) return [];
  return (user.pointHistory || []).slice(0, limit);
}

export function renderProfileGamification(containerId) {
  const container = document.getElementById(containerId);
  const user = getCurrentUser();
  if (!container || !user) return;
  const pts = user.points || 0;
  const lvl = computeLevel(pts);
  container.innerHTML = `\n    <div class="mb-3">\n      <label class="form-label">Nivel: <strong>${
    lvl.level
  }</strong> — Puntos: ${pts}</label>\n      <div class="progress" style="height:18px;"><div class="progress-bar bg-success" role="progressbar" style="width:${
    lvl.pct
  }%">${
    lvl.pct
  }%</div></div>\n    </div>\n    <div>\n      <h6>Historial de puntos</h6>\n      <div id="perfilPointsHistory">\n        ${getPointHistory(
    user.id
  )
    .map(
      (ev) =>
        `<div class="mb-2"><strong>${ev.amount > 0 ? "+" : ""}${
          ev.amount
        }</strong> — ${ev.reason} <br><small class="text-muted">${new Date(
          ev.date
        ).toLocaleString()}</small></div>`
    )
    .join("")}\n      </div>\n    </div>\n  `;
}

// expose functions for legacy scripts
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.logout = logout;
window.addPointsToUser = addPointsToUser;
window.loginAsAdminByEmail = loginAsAdminByEmail;
window.validateRUN = validateRUN;
window.populateProfileForm = populateProfileForm;
window.updateUserProfileFromForm = updateUserProfileFromForm;
window.addPointEvent = addPointEvent;
window.computeLevel = computeLevel;
window.getPointHistory = getPointHistory;
window.renderProfileGamification = renderProfileGamification;
