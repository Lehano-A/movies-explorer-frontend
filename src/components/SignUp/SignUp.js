import React, { useEffect } from "react";
import Form from "../Form/Form";

/* ФОРМА РЕГИСТРАЦИИ */
function SignUp({ handleSubmitSignUp, handleIsReg }) {

  useEffect(() => {
    handleIsReg();
  });

  return (

    <div className="SignUp">

      <Form handleSubmit={handleSubmitSignUp} buttonName="Зарегистрироваться" regQuestion="Уже зарегистрированы?" inOrUp="in" regOrLogin="Войти">

        <label className="form__label">Имя</label>
        <input type="text" className="form__input"></input>
        <span className="form__not-valid"></span>

        <label className="form__label">E-mail</label>
        <input type="email" className="form__input"></input>
        <span className="form__not-valid"></span>

        <label className="form__label">Пароль</label>
        <input type="password" className="form__input"></input>
        <span className="form__not-valid"></span>

      </Form>

    </div>
  )

}

export default SignUp;