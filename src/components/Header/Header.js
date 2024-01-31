import React from 'react';
import logo from './../../images/logo.svg';
import { Link } from 'react-router-dom';
import useIdentifyCurrentPathname from '../../hooks/useIdentifyCurrentPathname';
import ElementsWhenUserLoggedIn from './ElementsWhenUserLoggedIn/ElementsWhenUserLoggedIn';
import ElementsWhenUserNotAuth from './ElementsWhenUserNotAuth/ElementsWhenUserNotAuth';
import ElementsWhenSigninOrSignup from './ElementsWhenSigninOrSignup/ElementsWhenSigninOrSignup';


function Header({
  isLoggedIn,
  isPageNotFound,
  goToMainPage,
  handleClickButtonNavigationMenu,
}) {

  const identifyCurrentPathname = useIdentifyCurrentPathname()

  const hasCurrentPathnameMenu = identifyCurrentPathname.hasNavigationMenu() // ИМЕЕТ ЛИ ТЕКУЩИЙ ПУТЬ - МЕНЮ?
  const isSignupCurrentPathname = identifyCurrentPathname.isSignup()
  const isSigninCurrentPathname = identifyCurrentPathname.isSignin()



  // ПРИМЕНИТЬ СВЕТЛЫЙ ФОН ШАПКИ, НА ВСЕ СТРАНИЦЫ, КРОМЕ: ГЛАВНОЙ (И 404)
  function applyLightBg() {
    return identifyCurrentPathname.hasLightBG() ? 'header_light-bg' : '';
  }


  // УБРАТЬ ШАПКУ, ЕСЛИ 404
  function removeHeadIfPageNotFound() {
    return isPageNotFound ? 'header__head_disabled' : '';
  }


  // ПОКАЗЫВАЕМ В ШАПКЕ ТОЛЬКО ЛОГО (ДЛЯ - /signup, /signin)
  function showOnlyLogo() {
    return identifyCurrentPathname.hasLogoOnly() ? 'header__head_only-logo' : '';
  }



  return (
    <header className={`header ${applyLightBg()} ${removeHeadIfPageNotFound()}`}>
      <div className={`header__head ${showOnlyLogo()}`}>

        <Link to="/">
          <img onClick={goToMainPage} className="header__logo" src={logo} alt="Логотип сайта" />
        </Link>


        {
          (isLoggedIn && hasCurrentPathnameMenu) &&
          <ElementsWhenUserLoggedIn
            handleClickButtonNavigationMenu={handleClickButtonNavigationMenu}
          />
        }


        {
          (!isLoggedIn && (!isSigninCurrentPathname && !isSignupCurrentPathname)) &&
          <ElementsWhenUserNotAuth />
        }


        {
          (isSigninCurrentPathname || isSignupCurrentPathname) &&
          <ElementsWhenSigninOrSignup />
        }

      </div>
    </header>

  )
}

export default Header;