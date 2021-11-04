import React from "react";
import { Link } from "react-router-dom";
import { ValidationContext } from '../context/ValidationContext';

export default function Form({
  name,
  buttonName,
  regQuestion,
  inOrup,
  regOrLogin,
  children,
  handleSubmit,
  profileButton,
  profileFormHeight,
  errorSubmitMessage,
}) {


  const handlesValidation = React.useContext(ValidationContext);
  const { handleChange, values, checkValidValueInput, clickAtInput } = handlesValidation;


  function checkButtonForm() {
    console.log(values())
    if (!checkValidValueInput()) {
      if (buttonName === 'Редактировать') {
        return 'profile__button-submit_disabled';
      }
      if (buttonName === 'Войти' || buttonName === 'Зарегистрироваться') {
        return 'form__submit_disabled';
      }
    }
    return;
  }


  return (
    <>
      <form innorup={inOrup} onSubmit={handleSubmit} onChange={handleChange} className={`Form ${profileFormHeight}`} method="POST" autoComplete="off" name={name}>
        {children}

        {clickAtInput && <span>{errorSubmitMessage}</span>}

        <button type="submit" disabled={!checkValidValueInput() && true} className={`form__submit ${profileButton} ${checkButtonForm()}`}>{buttonName}</button>

      </form>
      <div className="form__reg-login-link-box">
        <p className="form__reg-question">{regQuestion}</p>
        <Link to={`/sign${inOrup}`} className="form__signin-signup-link">{regOrLogin}</Link>
      </div>
    </>
  )
}

