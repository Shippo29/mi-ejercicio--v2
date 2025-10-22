export function showToast(message) {
  try {
    const el = document.getElementById("liveToast");
    const body = document.getElementById("liveToastBody");
    if (!el || !body) {
      console.log("Toast not available:", message);
      return;
    }
    if (typeof message === "object" && message !== null) {
      body.textContent =
        (message.prefix ? message.prefix + " " : "") + (message.text || "");
    } else {
      body.textContent = message;
    }
    // Use bootstrap toast if available
    if (window.bootstrap && window.bootstrap.Toast) {
      const t = new window.bootstrap.Toast(el);
      t.show();
    }
  } catch (e) {
    console.warn("showToast error", e);
  }
}

export function animateCartBadge() {
  try {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    badge.classList.add("add-to-cart-anim");
    setTimeout(() => badge.classList.remove("add-to-cart-anim"), 400);
  } catch (e) {
    console.warn("animateCartBadge", e);
  }
}

export const WHATSAPP_NUMBER = "+56912345678";
export const WHATSAPP_DEFAULT_MSG =
  "Hola, necesito ayuda con mi pedido en Level-Up Gamer.";

export function openWhatsApp(message) {
  const msg = encodeURIComponent(message || WHATSAPP_DEFAULT_MSG);
  const num = WHATSAPP_NUMBER.replace(/[^+\d]/g, "");
  const url = `https://wa.me/${num.replace("+", "")}?text=${msg}`;
  window.open(url, "_blank");
}

export function injectWhatsAppButton() {
  try {
    if (document.getElementById("whatsappFloating")) return;
    const btn = document.createElement("button");
    btn.id = "whatsappFloating";
    btn.className = "whatsapp-floating btn btn-success rounded-circle";
    btn.title = "Contacto por WhatsApp";
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.875 7.875 0 0 0 8.033.2C3.917.2.55 3.567.55 7.682c0 1.292.34 2.55.987 3.653L.1 15.1l3.962-1.04a7.675 7.675 0 0 0 4.02 1.052h.003c4.116 0 7.484-3.367 7.484-7.483 0-1.99-.77-3.8-2.03-5.303zM8.033 1.2c3.617 0 6.563 2.944 6.563 6.482 0 3.539-2.946 6.483-6.563 6.483a6.9 6.9 0 0 1-3.487-.938l-.25-.146-2.303.605.62-2.252-.162-.285A6.482 6.482 0 0 1 8.033 1.2z"/><path d="M11.03 9.36c-.16-.08-.94-.463-1.09-.513-.148-.048-.256-.08-.365.08-.104.156-.403.513-.494.62-.09.108-.18.12-.334.04-.46-.21-.95-.683-1.33-1.22-.096-.13.096-.12.28-.4.098-.154.04-.27-.02-.35-.06-.08-.365-.88-.5-1.2-.132-.314-.267-.274-.365-.28-.094-.006-.204-.007-.31-.007-.106 0-.28.04-.43.2-.15.156-.58.567-.58 1.38 0 .813.596 1.598.68 1.71.08.114 1.17 1.78 2.835 2.496 1.665.718 2.02.65 2.76.54.74-.11 1.93-.79 2.2-1.55.27-.76.27-1.41.188-1.55-.08-.14-.29-.21-.45-.29z"/></svg>';
    btn.style.position = "fixed";
    btn.style.right = "18px";
    btn.style.bottom = "18px";
    btn.style.zIndex = "1200";
    btn.style.width = "52px";
    btn.style.height = "52px";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.onclick = () => openWhatsApp();
    document.body.appendChild(btn);
  } catch (e) {
    console.warn("injectWhatsAppButton", e);
  }
}

// expose for legacy scripts
window.showToast = showToast;
window.animateCartBadge = animateCartBadge;
window.openWhatsApp = openWhatsApp;

document.addEventListener("DOMContentLoaded", () => {
  try {
    injectWhatsAppButton();
  } catch (e) {
    console.warn("Could not inject WhatsApp button", e);
  }
});
