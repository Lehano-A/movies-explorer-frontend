import React from "react";
import { Link } from "react-router-dom";

function Form({ name, buttonName, regQuestion, inOrUp, regOrLogin, children, handleSubmit }) {

  return (
    <>
      <form onSubmit={handleSubmit} className="Form" method="POST" name={name}>
        {children}
        <button type="submit" className="form__submit">{buttonName}</button>
      </form>
      <div className="form__reg-login-link-box">
        <p className="form__reg-question">{regQuestion}</p>
        <Link to={`/sign${inOrUp}`} className="form__signin-signup-link">{regOrLogin}</Link>
      </div>
    </>
  )
}

export default Form;