import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationContext } from '../../context/ValidationContext';

function Form({
  name,
  buttonName,
  regQuestion,
  inOrup,
  regOrLogin,
  children,
  handleSubmit,
  profileButton,
  profileFormHeight,
}) {

  const [isSubmit, setIsSubmit] = useState(null)
  const [isDisabledButtonSubmit, setIsDisabledButtonSubmit] = useState(true)

  const validationContext = React.useContext(ValidationContext);
  const { handleChange, checkValidityForm, inputParameters } = validationContext;


  useEffect(() => {
    return () => setIsDisabledButtonSubmit(null)
  }, [])


  useEffect(() => {
    if (isSubmit) {
      setIsDisabledButtonSubmit(true)
    }
  }, [isSubmit])



  useEffect(() => {
    if (checkValidityForm()) {
      return setIsDisabledButtonSubmit(false)
    }

    if (!checkValidityForm()) {
      return setIsDisabledButtonSubmit(true)
    }
  }, [inputParameters])



  function changeColorButtonSubmitWhenDisabled() {

    if (isDisabledButtonSubmit) {
      if (buttonName === 'Редактировать') {
        return 'profile__button-submit_disabled';
      }

      if (buttonName === 'Войти' || buttonName === 'Зарегистрироваться') {
        return 'form__submit_disabled';
      }
    }

    return ''
  }



  // ОБРАБОТАТЬ САБМИТ ФОРМЫ
  function handleSubmitForm(e) {
    setIsSubmit(true)
    setIsDisabledButtonSubmit(true)
    handleSubmit(e, setIsSubmit)
  }



  return (
    <>
      <form className={`form ${profileFormHeight ? profileFormHeight : ''}`} innorup={inOrup} onSubmit={handleSubmitForm} onChange={handleChange} method="POST" autoComplete="off" name={name}>


        {children}


        <button type="submit" disabled={isDisabledButtonSubmit}
          className={`
        form__submit ${profileButton ? profileButton : ''}
        ${changeColorButtonSubmitWhenDisabled()}`
          }>
          {buttonName}
        </button>

      </form>


      <div className="form__reg-login-link-box">
        <p className="form__reg-question">{regQuestion}</p>
        <Link to={`/sign${inOrup}`} className="form__signin-signup-link">{regOrLogin}</Link>
      </div>

    </>
  )
}


export default Form