import React from "react";
import { Link } from 'react-router-dom'
import ProfileButton from "../ProfileButton/ProfileButton";

function MenuProfile({
  isMainLink,
  isProfileLink,
  isMoviesLink,
  isSavedMoviesLink,
  isProfileMenu,
  handleButtonCloseMenuProfile,
  handleIsMoviesLink,
  handleIsSavedMoviesLink
}) {

  
  return (
    <div className={`MenuProfile ${isProfileMenu && 'menu-profile_open'}`}>
      <div className="menu-profile__menu-box">
        <button onClick={handleButtonCloseMenuProfile} className="menu-profile__button-close" type="button"></button>
        <ul className="menu-profile__menu">
          <li className={`menu-profile__link ${isMainLink && 'menu-profile__link_active'}`}><Link to="/">Главная</Link></li>
          <li className={`menu-profile__link ${isMoviesLink && 'menu-profile__link_active'}`}><Link onClick={handleIsMoviesLink} to="/movies">Фильмы</Link></li>
          <li className={`menu-profile__link ${isSavedMoviesLink && 'menu-profile__link_active'}`}><Link onClick={handleIsSavedMoviesLink} to="/saved-movies">Сохранённые фильмы</Link></li>
        </ul>

        {!isProfileLink && <ProfileButton />}

      </div>
    </div>
  )
}

export default MenuProfile;