import React, { useState } from "react";
import "./Contact.css";
import logo from "../assets/LOGO.png";

const WHATSAPP_BASE = "https://wa.me/56936113298";

function TeamCard({ emoji, name, role, bio }) {
  return (
    <div className="team-card">
      <div className="team-photo-wrap">
        <span
          className="team-emoji"
          role="img"
          aria-label={`Emoji para ${name}`}
        >
          {emoji}
        </span>
      </div>
      <div className="team-info">
        <div className="team-name">{name}</div>
        <div className="team-role">{role}</div>
        <div className="team-bio">{bio}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [reason, setReason] = useState("Consulta sobre producto");

  function openWhatsApp() {
    const msg = encodeURIComponent(`Hola, tengo una: ${reason}`);
    window.open(`${WHATSAPP_BASE}?text=${msg}`, "_blank");
  }

  return (
    <div className="contact container contact-animated contact-beauty">
      <header className="contact-hero">
        <div className="hero-text">
          <h2>Level-Up Gamer</h2>
          <p className="lead">
            Somos Level-Up Gamer: una comunidad y tienda creada por gamers para
            gamers. Nos mueve la pasión por los juegos, la calidad y el servicio
            cercano.
          </p>
          <div className="hero-decor" aria-hidden="true">
            <span className="line" />
            <span className="dot" />
          </div>
        </div>
        <div className="hero-ill">
          <img src={logo} alt="Logo Level-Up Gamer" className="logo-hero" />
        </div>
      </header>

      <section className="about">
        <p>
          <strong>Level-Up Gamer</strong> nace para acercar productos de calidad
          y experiencias memorables a la comunidad gamer en Chile. Más que una
          tienda, queremos ser un lugar donde encuentres recomendaciones,
          soporte y la cercanía de un equipo que entiende lo que necesitas.
        </p>
      </section>

      <section className="misvis grid">
        <div className="card">
          <div className="card-header">
            <span className="card-icon" role="img" aria-label="Misión">
              🎯
            </span>
            <h4>Misión</h4>
          </div>
          <p>
            Entregar productos cuidadosamente seleccionados y un soporte
            amigable que permita que más personas disfruten de los videojuegos
            con la mejor experiencia posible.
          </p>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-icon" role="img" aria-label="Visión">
              🌟
            </span>
            <h4>Visión</h4>
          </div>
          <p>
            Consolidarnos como la plataforma de referencia en Chile para gamers,
            reconocida por su calidad, comunidad y servicio cercano.
          </p>
        </div>
      </section>

      <section className="team">
        <h3>Nuestro equipo</h3>
        <p className="team-intro">Un grupo pequeño, apasionado y dedicado.</p>

        <div className="team-grid">
          <TeamCard
            name="Cristian Briones"
            role="Líder del Proyecto"
            bio="Guía el desarrollo y la visión del proyecto, asegurando la mejor experiencia para nuestros usuarios."
            emoji="⚡"
          />
          <TeamCard
            name="Agustín Llanten"
            role="Desarrollo & Producto"
            bio="Enfocado en crear experiencias fluidas y funcionales para toda la comunidad gamer."
            emoji="✨"
          />
          <TeamCard
            name="Gino Trujillo"
            role="Innovación & Diseño"
            bio="Aporta creatividad y visión innovadora para mejorar constantemente la plataforma."
            emoji="🚀"
          />
        </div>
      </section>

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
