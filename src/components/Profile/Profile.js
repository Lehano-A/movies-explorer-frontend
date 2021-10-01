import React, { useEffect } from "react";
import Form from "../Form/Form";


function Profile({ handleIsProfile }) {

  useEffect(() => {
    handleIsProfile();
  }, []);

  return (
    <div className="Profile">
      <h1 className="profile__hello-title">Привет, Человек!</h1>
      <Form profileFormHeight="profile__form-height" profileButton="profile__button-submit" buttonName="Редактировать">

        <div className="profile__inputs-box">
          <div className="profile__name-box">
            <label for="name" className="profile__label">Имя</label>
            <input id="name" type="text" className="profile__input"></input>
          </div>

          <div className="profile__email-box">
            <label for="email" className="profile__label">E-mail</label>
            <input id="email" type="email" className="profile__input"></input>
          </div>
        </div>

      </Form>
      <button className="profile__logout">Выйти из аккаунта</button>
    </div>
  )

}

export default Profile;