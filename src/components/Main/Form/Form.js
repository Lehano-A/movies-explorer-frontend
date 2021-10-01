import React from "react";
import { Link } from "react-router-dom";

function Form({ name, buttonName, children }) {

  return (
    <>
      <form className="Form" method="POST" name={name}>
        {children}
        <button className="form__submit">{buttonName}</button>
      </form>
      <div className="form__reg-login-redirection-box">
        <p className="form__reg-question">Уже зарегистрированы?</p>
        <Link to="/signin" className="form__signin-signup-redirection">Войти</Link>
      </div>
    </>
  )

}

export default Form;