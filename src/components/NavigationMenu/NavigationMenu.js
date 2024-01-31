import React from "react";
import { Link } from 'react-router-dom'
import ProfileButton from "../ProfileButton/ProfileButton";
import useIdentifyCurrentPathname from "../../hooks/useIdentifyCurrentPathname";


function NavigationMenu({
  isActiveNavigationMenu,
  setIsActiveNavigationMenu
}) {

  const identifyCurrentPathname = useIdentifyCurrentPathname()


  function handleButtonCloseNavigationMenu() {
    setIsActiveNavigationMenu(false)
  }


  
  return (
    <div className={`navigation-menu ${isActiveNavigationMenu ? 'navigation-menu_open' : ''}`}>
      <div className="navigation-menu__box">

        <button onClick={handleButtonCloseNavigationMenu} className="navigation-menu__button-close" type="button"></button>

        <ul className="navigation-menu__list">
          <li className={`navigation-menu__list-link ${identifyCurrentPathname.isMain() ? 'navigation-menu__list-link_active' : ''}`}>
            <Link onClick={handleButtonCloseNavigationMenu} to="/">Главная</Link>
          </li>

          <li className={`navigation-menu__list-link ${identifyCurrentPathname.isMovies() ? 'navigation-menu__list-link_active' : ''}`}>
            <Link onClick={handleButtonCloseNavigationMenu} to="/movies">Фильмы</Link>
          </li>

          <li className={`navigation-menu__list-link ${identifyCurrentPathname.isSavedMovies() ? 'navigation-menu__list-link_active' : ''}`}>
            <Link onClick={handleButtonCloseNavigationMenu} to="/saved-movies">Сохранённые фильмы</Link>
          </li>
        </ul>


        {
          !identifyCurrentPathname.isProfile() &&
          <span onClick={handleButtonCloseNavigationMenu}>
            <ProfileButton />
          </span>
        }

      </div>
    </div>
  )
}

export default NavigationMenu;
