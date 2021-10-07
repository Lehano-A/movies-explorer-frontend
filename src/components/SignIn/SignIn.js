import React, { useEffect } from "react";
import Form from "../Form/Form";

function SignIn({ handleInputsForm, handleSubmitSignIn, handleIsLogLink }) {

  useEffect(() => {
    handleIsLogLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="SignIn">

      <Form handleSubmit={handleSubmitSignIn} handleOnChange={handleInputsForm} buttonName="Войти" regQuestion="Ещё не зарегистрированы?" inOrUp="up" regOrLogin="Регистрация">
        <div className="form__input-box">
          <label className="form__label">E-mail</label>
          <input name="email" type="email" className="form__input" maxLength="70" required></input>
          <span className="form__not-valid"></span>

          <label className="form__label">Пароль</label>
          <input name="password" type="password" className="form__input" minLength="7" maxLength="30" required></input>
          <span className="form__not-valid"></span>
        </div>
      </Form>

    </div>

  )

}

export default SignIn;