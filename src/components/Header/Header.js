import React from 'react';
import logo from './../../images/logo.svg';
import { Link } from 'react-router-dom';



function Header({ isReg, isLog, isProfile }) {

  function lightBg() {
    if (isProfile) {
      return 'header_light-bg'
    }
    return
  }

  function handleRegLogProfile() {


    if (!isLog && !isReg) {
      return <>
        <ul className="header__links">
          <li><Link to="/movies" className="header__link-movies">Фильмы</Link></li>
          <li><Link to="/saved-movies" className="header__link-saved-movies">Сохранённые фильмы</Link></li>
        </ul>
        <Link to="/profile" className="header__profile">
          <span>Аккаунт</span>
          <span className="header__profile-icon"></span>
        </Link>
      </>

    }

    if (!isProfile) {
      return <ul className="header__signin-signup-box">
        <li><Link to="/signup" className="header__link-signup">Регистрация</Link></li>
        <li><Link to="/signin" className="header__link-signin">Войти</Link></li>
      </ul>
    }
  }

  return (
    <header className={`Header ${lightBg()}`}>

      <div className="header__top">

        <Link to="/"><img className="header__logo" src={logo} alt="Логотип сайта"></img></Link>

        {handleRegLogProfile()}

      </div>

    </header >

  )
}

export default Header;