import "./Footer.css";

export default function Footer() {
  const date = new Date();
  const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="contact-block">
          <h3 className="contact-title">Contacto</h3>
          <address className="contact-list">
            <div>
              <span className="label">Oficina:</span>
              <a href="tel:+56223456789" className="contact-link">
                +56 2 2345 6789
              </a>
            </div>
            <div>
              <span className="label">Ventas / WhatsApp:</span>
              <a href="tel:+56936113298" className="contact-link">
                +56 9 3611 3298
              </a>
            </div>
            <div>
              <span className="label">Correo:</span>
              <a href="mailto:soporte@levelupgamer.cl" className="contact-link">
                soporte@levelupgamer.cl
              </a>
            </div>
          </address>
        </div>

        <div className="brand-block">
          <div className="brand-name">Level-Up Gamer</div>
          <div className="copyright">© {fecha} — Level-Up Gamer</div>
        </div>
      </div>
    </footer>
  );
}
