import React, { useEffect, useState } from "react";
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";
import imgpromo from "../assets/promo20.png";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // seleccionar algunos productos destacados por su categoria o id
    const picks = productos.filter((p) => [5, 6, 7, 15].includes(p.id));
    setFeatured(picks);
  }, []);

  return (
    <div className="home container">
      <section className="promo">
        <div className="promo-left">
          <h2>Hasta 20% OFF</h2>
          <p>
            Usa el código <strong>DUOC</strong> al pagar y recibe descuento
            instantáneo.
          </p>
          <small>Entrega rápida: selecciona "En 48 horas" al comprar</small>
        </div>
        <div className="promo-right">
          <img src={imgpromo} alt="Promo 20%" />
        </div>
      </section>

      <section className="featured">
        <h3>Productos destacados</h3>
        <div className="featured-grid">
          {featured.map((p) => (
            <div key={p.id} className="featured-item">
              <ProductCard
                product={{
                  ...p,
                  descuento: 0.15, // forzar 15% en destacados
                }}
              />
              <div className="badges">
                {/* Mostrar siempre -15% en la fila de destacados */}
                <span className="discount">-15%</span>
                <span className="fast">En 48 horas</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-offers">
        <h3>Ofertas</h3>
        <div className="offers-grid">
          {productos
            .filter((p) => p.descuento && p.descuento > 0)
            .slice(0, 4)
            .map((p) => (
              <div key={p.id} className="offer-item">
                <ProductCard product={p} />
              </div>
            ))}
        </div>
      </section>

      <section className="payments">
        <h4>¡Paga como prefieras! 🔒</h4>
        <p>
          Elige tu método favorito: tarjetas, MercadoPago o transferencia. Todas
          tus compras están 100% protegidas y procesadas al instante. ¡Compra
          ahora, juega después!
        </p>
      </section>
    </div>
  );
}
