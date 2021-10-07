import React, { useEffect } from "react";
import Form from "../Form/Form";


function SignUp({ handleInputsForm, handleSubmitSignUp, handleIsRegLink }) {

  useEffect(() => {
    handleIsRegLink();
  });

  return (

    <div className="SignUp">

      <Form handleSubmit={handleSubmitSignUp} handleOnChange={handleInputsForm} buttonName="Зарегистрироваться" regQuestion="Уже зарегистрированы?" inOrUp="in" regOrLogin="Войти">

        <label className="form__label">Имя</label>
        <input name="name" type="text" className="form__input" minLength="2" maxLength="30" required></input>
        <span className="form__not-valid"></span>

        <label className="form__label">E-mail</label>
        <input name="email" type="email" className="form__input" maxLength="70" required></input>
        <span className="form__not-valid"></span>

        <label className="form__label">Пароль</label>
        <input name="password" type="password" className="form__input" minLength="7" maxLength="30" required></input>
        <span className="form__not-valid"></span>

      </Form>

    </div>
  )

}

export default SignUp;