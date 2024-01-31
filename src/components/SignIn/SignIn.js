import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import { ValidationContext } from '../../context/ValidationContext';


function SignIn({
  sendAuthReqUserToApi,
  handleChangeInput,
}) {

  const [isBlockedInput, setIsBlockedInput] = useState(null); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const validationContext = React.useContext(ValidationContext);
  const { errorsForm, inputParameters, resetFormByDefault } = validationContext;



  useEffect(() => {
    return () => {
      setIsBlockedInput(null)
      resetFormByDefault()
    }
  }, [])



  // ОБРАБОТАТЬ САБМИТ АУТЕНТИФИКАЦИИ
  function handleSubmitSignIn(e, setIsSubmit) {
    e.preventDefault()
    setIsBlockedInput(true);

    const { email, password } = inputParameters

    sendAuthReqUserToApi({
      email: email.inputValue,
      password: password.inputValue,
      setIsBlockedInput,
      setIsSubmit,
    },
    )
  }



  return (

    <div className="signin">
      <Form buttonName="Войти" handleSubmit={handleSubmitSignIn} regQuestion="Ещё не зарегистрированы?" inOrup="up" regOrLogin="Регистрация">

        <div className="form__input-box">

          <label htmlFor="email" className="form__label">E-mail</label>
          <input onChange={handleChangeInput} disabled={isBlockedInput && true} name="email" type="email" className="form__input" minLength="6" maxLength="80" required></input>
          <span htmlFor="email" className={`form__not-valid ${errorsForm.email && 'form__not-valid_active'}`}>{errorsForm.email}</span>


          <label htmlFor="password" className="form__label">Пароль</label>
          <input onChange={handleChangeInput} disabled={isBlockedInput && true} name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
          <span htmlFor="password" className={`form__not-valid ${errorsForm.password && 'form__not-valid_active'}`}>{errorsForm.password}</span>

        </div>

      </Form>
    </div>
  )
}

export default SignIn;