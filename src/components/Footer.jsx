import "./Footer.css";

export default function Footer() {
  const date = new Date();
  const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <footer className="site-footer fixed-bottom" aria-label="Pie de página">
      <div className="container-fluid px-3">
        {/* contenedor flex: izquierda (contacto) y derecha (copyright) */}
        <div className="footer-inner d-flex flex-column flex-sm-row justify-content-between align-items-center py-3">
          <div className="footer-left text-center text-sm-start mb-2 mb-sm-0">
            <strong className="d-block">Contacto</strong>
            <ul className="mb-0">
              <li>
                Teléfono (oficina):{" "}
                <a href="tel:+56223456789">+56 2 2345 6789</a>
              </li>
              <li>
                Teléfono (ventas):{" "}
                <a href="tel:+56936113298">+56 9 3611 3298</a>
              </li>
              <li>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/56936113298"
                  target="_blank"
                  rel="noreferrer"
                >
                  +56 9 3611 3298
                </a>
              </li>
              <li>
                Correo:{" "}
                <a href="mailto:soporte@levelupgamer.cl">
                  soporte@levelupgamer.cl
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-right text-center text-sm-end">
            <small className="fw-bold footer-date">
              © {fecha} — Level-Up Gamer
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
