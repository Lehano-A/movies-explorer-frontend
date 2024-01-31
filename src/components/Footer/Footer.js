import React from "react";
import useIdentifyCurrentPathname from "../../hooks/useIdentifyCurrentPathname";


function Footer({ isPageNotFound }) {

  const identifyCurrentPathname = useIdentifyCurrentPathname()


  // ОБРАБОТАТЬ СКРЫТИЕ ФУТЕРА
  function handleHidingFooter() {
    const isPageSignin = identifyCurrentPathname.isSignin()
    const isPageSignup = identifyCurrentPathname.isSignup()
    const isPageProfile = identifyCurrentPathname.isProfile()

    if (isPageSignin || isPageSignup || isPageProfile || isPageNotFound) {
      return 'footer_disabled';
    }

    return ''
  }



  return (
    <footer className={`footer ${handleHidingFooter()} footer_indent`}>

      <p className="footer__info-project">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>


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