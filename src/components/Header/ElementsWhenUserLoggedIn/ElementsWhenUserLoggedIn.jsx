import { Link } from "react-router-dom"
import useIdentifyCurrentPathname from "../../../hooks/useIdentifyCurrentPathname"
import ProfileButton from "../../ProfileButton/ProfileButton"


function ElementsWhenUserLoggedIn({ handleClickButtonNavigationMenu }) {

  const identifyCurrentPathname = useIdentifyCurrentPathname()


  // ИЗМЕНИТЬ СТИЛЬ ССЫЛКИ В ШАПКЕ
  const changeLinkStyle = {
    whenMainPathname: () => {
      return identifyCurrentPathname.isMain() ? 'header__link_main-page' : '';
    },

    whenMoviesPathname: () => {
      return identifyCurrentPathname.isMovies() ? 'header__link_active' : ''
    },

    whenSavedMoviesPathname: () => {
      return identifyCurrentPathname.isSavedMovies() ? 'header__link_active' : ''
    }
  }



  return (
    <>

      <ul className="header__links">
        <li>
          <Link
            to="/movies"
            className={`header__link ${changeLinkStyle.whenMoviesPathname()} ${changeLinkStyle.whenMainPathname()}`}
          >
            Фильмы
          </Link>
        </li>


        <li>
          <Link
            to="/saved-movies"
            className={`header__link ${changeLinkStyle.whenSavedMoviesPathname()} ${changeLinkStyle.whenMainPathname()}`}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>


      <button
        className="header__button-menu"
        onClick={handleClickButtonNavigationMenu}
        type="button"
      >
      </button>


      <span className="header__profile-button">
        <ProfileButton />
      </span>

    </>
  )

}

export default ElementsWhenUserLoggedIn