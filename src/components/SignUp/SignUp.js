import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";
import { ValidationContext } from '../../context/ValidationContext'



function SignUp({
  sendAuthReqUserToApi,
  handleOpenNotificationPopup,
}) {

  const [isBlockedInput, setIsBlockedInput] = useState(null); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const validationContext = React.useContext(ValidationContext)
  const { errorsForm, inputParameters, resetFormByDefault } = validationContext


  useEffect(() => {
    return () => {
      setIsBlockedInput(null)
      resetFormByDefault()
    }
  }, [])



  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignup(e, setIsSubmit) {
    e.preventDefault();
    setIsBlockedInput(true);

    const name = inputParameters.name.inputValue;
    const email = inputParameters.email.inputValue;
    const password = inputParameters.password.inputValue;


    mainApi.signUp({ name, email, password })
      .then(() => {
        sendAuthReqUserToApi({
          email: email,
          password: password,
          setIsBlockedInput,
        })
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
      .finally(() => {
        setIsBlockedInput(false)
        setIsSubmit(false)
      })
  }



  return (
    <div className="signup">

      <Form handleSubmit={handleSubmitSignup} buttonName="Зарегистрироваться" regQuestion="Уже зарегистрированы?" inOrup="in" regOrLogin="Войти">

        <label htmlFor="name" className="form__label">Имя</label>
        <input disabled={isBlockedInput && true} name="name" type="text" className="form__input" minLength="1" maxLength="50" autoComplete="off" required></input>
        <span className={`form__not-valid ${errorsForm.name && 'form__not-valid_active'}`}>{errorsForm.name}</span>


        <label htmlFor="email" className="form__label">E-mail</label>
        <input disabled={isBlockedInput && true} name="email" type="email" className="form__input" minLength="6" maxLength="70" autoComplete="off" required></input>
        <span className={`form__not-valid ${errorsForm.email && 'form__not-valid_active'}`}>{errorsForm.email}</span>


        <label htmlFor="password" className="form__label">Пароль</label>
        <input disabled={isBlockedInput && true} name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
        <span className={`form__not-valid ${errorsForm.password && 'form__not-valid_active'}`}>{errorsForm.password}</span>

      </Form>

    </div>
  )

}

export default SignUp;