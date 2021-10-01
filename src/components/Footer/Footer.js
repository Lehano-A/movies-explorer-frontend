import React from "react";
import { useLocation } from "react-router";

function Footer({ isPageNotFound }) {

  const location = useLocation();
  const pathName = location.pathname;

  function disabledFooter() {
    if (pathName === '/signup' || pathName === '/signin' || isPageNotFound) {
      return 'footer_disabled';
    }
  }
  return (
    <footer className={`Footer ${disabledFooter()}`}>
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