import React from "react";
import Form from "../Form/Form";

/* ФОРМА РЕГИСТРАЦИИ */
function SignUp() {

  return (

    <section className="SignUp">

      <Form buttonName="Зарегистрироваться">

        <label className="form__label">Имя</label>
        <input type="text" className="form__input" autoComplete="off"></input>
        <span className="form__not-valid"></span>

        <label className="form__label">E-mail</label>
        <input type="email" className="form__input" autoComplete="off"></input>
        <span className="form__not-valid"></span>

        <label className="form__label">Пароль</label>
        <input type="password" className="form__input" autoComplete="off"></input>
        <span className="form__not-valid"></span>

      </Form>

    </section>
  )

}

export default SignUp;