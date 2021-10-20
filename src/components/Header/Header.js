import React from 'react';
import logo from './../../images/logo.svg';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';

function Header({
  pathesPages,
  pathName,
  isRegLink,
  isLogLink,
  isProfileLink,
  isMoviesLink,
  isSavedMoviesLink,
  isPageNotFound,
  handleIsProfileMenu,
  goToMainPage,
}) {

  const { mainUrl, moviesUrl, savedMoviesUrl } = pathesPages;


  // СТЭЙТ ВНУТРЕННЕЙ ССЫЛКИ ИЛИ URL - TRUE
  const regLogLink = (isRegLink || isLogLink);

  // ПРИМЕНИТЬ СВЕТЛЫЙ ФОН ШАПКИ, НА ВСЕ СТРАНИЦЫ, КРОМЕ: ГЛАВНОЙ (И 404)
  function useLightBg() {
    return (regLogLink || isProfileLink || isMoviesLink || isSavedMoviesLink) && 'header_light-bg'
  }

  // УБРАТЬ ШАПКУ, ЕСЛИ 404
  function removeHead() {
    return isPageNotFound && 'header__head_disabled'
  }

  // ПОКАЗЫВАЕМ В ШАПКЕ ТОЛЬКО ЛОГО (ДЛЯ - /signup, /signin)
  function showOnlyLogo() {
    return (regLogLink && !mainUrl) && 'header__head_only-logo'
  }

  // ОБРАБОТЧИК ДАЛЬНЕЙШЕЙ ЛОГИКИ ПРИ НАЖАТИИ НА ССЫЛКИ
  // РЕГИСТРАЦИИ, АУТЕНТИФИКАЦИИ И ПРОФИЛЯ
  function handleRegLogProfile() {

    // ПРИВЕТСТВИЕ - ЕСЛИ ОТКРЫТА ФОРМА РЕГИСТРАЦИИ
    if (pathName === '/signup') {
      return <h1 className="signup__title">Добро пожаловать!</h1>;
    }

    // ПРИВЕТСТВИЕ - ЕСЛИ ОТКРЫТА ФОРМА АУТЕНТИФИКАЦИИ
    if (pathName === '/signin') {
      return <h1 className="signup__title">Рады видеть!</h1>;
    }

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН, ТО ИНИЦИАЛИЗИРУЮТСЯ ССЫЛКИ: (ВРЕМЕННОЕ УСЛОВИЕ)
    // ФИЛЬМЫ, СОХРАНЁННЫЕ ФИЛЬМЫ И АККАУНТ
    if ((isProfileLink || isSavedMoviesLink || isMoviesLink) && (!regLogLink)) {
      return <>
        <ul className="header__links">
          <li><Link to="/movies" className={`header__link ${moviesUrl && 'header__link_active'}`}>Фильмы</Link></li>
          <li><Link to="/saved-movies" className={`header__link ${savedMoviesUrl && 'header__link_active'}`}>Сохранённые фильмы</Link></li>
        </ul>
        <button onClick={handleIsProfileMenu} type="button" className="header__menu-profile"></button>
        <span className="header__profile-button"><ProfileButton /></span>
      </>
    }

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕЗАЛОГИНЕН
    if (!isProfileLink) {
      return <ul className="header__signin-signup-box">
        <li><Link to="/signup" className="header__link-signup">Регистрация</Link></li>
        <li><Link to="/signin" className="header__link-signin">Войти</Link></li>
      </ul>
    }
  }

  return (
    <header className={`Header ${useLightBg()} ${removeHead()}`}>

      <div className={`header__head ${showOnlyLogo()}`}>

        <Link to="/"><img onClick={goToMainPage} className="header__logo" src={logo} alt="Логотип сайта"></img></Link>

        {handleRegLogProfile()}

      </div>

    </header>

  )
}

export default Header;