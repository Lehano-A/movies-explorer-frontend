import React, { useEffect } from "react";
import Form from "../Form/Form";

function SignIn({ handleSubmitSignIn, handleIsLog }) {

  useEffect(() => {
    handleIsLog();
  }, []);

  return (

    <div className="SignIn">

      <Form handleSubmit={handleSubmitSignIn} buttonName="Войти" regQuestion="Ещё не зарегистрированы?" inOrUp="up" regOrLogin="Регистрация">
        <div className="form__input-box">
          <label className="form__label">E-mail</label>
          <input type="email" className="form__input"></input>
          <span className="form__not-valid"></span>

          <label className="form__label">Пароль</label>
          <input type="password" className="form__input"></input>
          <span className="form__not-valid"></span>
        </div>
      </Form>

    </div>

  )

}

export default SignIn;