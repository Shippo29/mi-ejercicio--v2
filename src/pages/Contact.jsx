import React, { useState } from "react";
import "./Contact.css";

const WHATSAPP_BASE = "https://wa.me/56936113298"; // link to the user's number

export default function Contact() {
  const [reason, setReason] = useState("Consulta sobre producto");

  function openWhatsApp() {
    const msg = encodeURIComponent(`Hola, tengo una: ${reason}`);
    window.open(`${WHATSAPP_BASE}?text=${msg}`, "_blank");
  }

  return (
    <div className="contact container contact-animated">
      <h2>Nosotros</h2>
      <section className="about">
        <p>
          <strong>Level-Up Gamer</strong> es una tienda online dedicada a
          satisfacer las necesidades de los entusiastas de los videojuegos en
          Chile. Lanzada hace dos años como respuesta a la creciente demanda
          durante la pandemia, Level-Up Gamer ofrece una amplia gama de
          productos para gamers, desde consolas y accesorios hasta computadores
          y sillas especializadas. Aunque no cuenta con una ubicación física,
          realiza despachos a todo el país.
        </p>
      </section>

      <section className="misvis">
        <h4>Misión</h4>
        <p>
          Proporcionar productos de alta calidad para gamers en todo Chile,
          ofreciendo una experiencia de compra única y personalizada, con un
          enfoque en la satisfacción del cliente y el crecimiento de la
          comunidad gamer.
        </p>
        <h4>Visión</h4>
        <p>
          Ser la tienda online líder en productos para gamers en Chile,
          reconocida por su innovación, servicio al cliente excepcional, y un
          programa de fidelización basado en gamificación.
        </p>
      </section>

      {/* Info de contacto movida al Footer */}

      <section className="whatsapp">
        <h4>Atención rápida por WhatsApp</h4>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Consulta sobre producto</option>
          <option>Problema con mi pedido</option>
          <option>Soporte técnico</option>
          <option>Devoluciones y cambios</option>
        </select>
        <button
          className="btn btn-primary mt-2 whatsapp-cta"
          onClick={openWhatsApp}
        >
          Abrir WhatsApp
        </button>
      </section>
    </div>
  );
}
