import { useLocation } from "react-router-dom"
import { MOVIES_PATHNAME, SAVED_MOVIES_PATHNAME, SIGNIN_PATHNAME, SIGNUP_PATHNAME, PROFILE_PATHNAME, MAIN_PATHNAME } from "../utils/constants/constants"


function useIdentifyCurrentPathname() {

  const location = useLocation()
  const currentPathname = location.pathname


  return {
    // ИДЕНТИФИКАЦИЯ ПУТИ СО СВЕТЛЫМ ФОНОМ (ДЛЯ HEADER)
    hasLightBG: function () {
      const pathnames = [MOVIES_PATHNAME, SAVED_MOVIES_PATHNAME, SIGNIN_PATHNAME, SIGNUP_PATHNAME, PROFILE_PATHNAME]

      return this.compareWithCurrentPathname(pathnames)
    },



    // ИДЕНТИФИКАЦИЯ ПУТИ С ОДНИМ ТОЛЬКО ЛОГОТИПОМ (ДЛЯ РЕГИСТРАЦИИ И АУТЕНТИФИКАЦИИ)
    hasLogoOnly: function () {
      const pathnames = [SIGNIN_PATHNAME, SIGNUP_PATHNAME]

      return this.compareWithCurrentPathname(pathnames)
    },



    // ИДЕНТИФИКАЦИЯ ПУТИ С НАВИГАЦИОННЫМ МЕНЮ
    hasNavigationMenu: function () {
      const pathnames = [MOVIES_PATHNAME, SAVED_MOVIES_PATHNAME, PROFILE_PATHNAME, MAIN_PATHNAME]

      return this.compareWithCurrentPathname(pathnames)
    },


    isMain: () => currentPathname === MAIN_PATHNAME,
    isMovies: () => currentPathname === MOVIES_PATHNAME,
    isSavedMovies: () => currentPathname === SAVED_MOVIES_PATHNAME,
    isProfile: () => currentPathname === PROFILE_PATHNAME,
    isSignup: () => currentPathname === SIGNUP_PATHNAME,
    isSignin: () => currentPathname === SIGNIN_PATHNAME,


    compareWithCurrentPathname: function (pathnamesForCompare) {

      return pathnamesForCompare.some(pathname => pathname === currentPathname)
    }

  }
}


export default useIdentifyCurrentPathname