import React from "react";
import { useLocation } from "react-router";

function Footer({ isPageNotFound, isProfileLink }) {

  const location = useLocation();
  const pathName = location.pathname;

  function disabledFooter() {
    if (pathName === '/signup' || pathName === '/signin' || isPageNotFound || isProfileLink) {
      return 'footer_disabled';
    }
  }

  return (
    <footer className={`Footer ${disabledFooter()} ${'footer_indent'}`}>
      <p className="footer__info-project">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__date-nav-box">
        <p className="footer__date">&copy; {new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__nav">
            <li><a href="https://praktikum.yandex.ru/" target="_blank" rel='noreferrer'>Яндекс.Практикум</a></li>
            <li><a href="https://github.com/Lehano-A" target="_blank" rel='noreferrer'>Github</a></li>
            <li><a href="https://vk.com/id2895043" target="_blank" rel='noreferrer'>Вконтакте</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;