import React from "react";

function Footer() {
  return (
    <footer className="Footer">
      <p className="footer__info-project">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__date-nav-box">
        <p className="footer__date">&copy; {new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__nav">
            <li>Яндекс.Практикум</li>
            <li>Github</li>
            <li>Вконтакте</li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;