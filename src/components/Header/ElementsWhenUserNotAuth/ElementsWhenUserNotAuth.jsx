import { Link } from "react-router-dom"


function ElementsWhenUserNotAuth() {

  return (
    <ul className="header__signin-signup-box">
      <li>
        <Link to="/signup" className="header__link-signup">Регистрация</Link>
      </li>

      <li>
        <Link to="/signin" className="header__link-signin">Войти</Link>
      </li>
    </ul>
  )
}

export default ElementsWhenUserNotAuth