import React, { useEffect } from "react";
import Form from "../Form/Form";
import MenuProfile from "../MenuProfile/MenuProfile";

function Profile({
  isProfileLink,
  isProfileMenu,
  handleEditProfile,
  handleIsProfileLink,
  handleButtonCloseMenuProfile }) {

  useEffect(() => {
    handleIsProfileLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Profile">

      <MenuProfile
        isProfileLink={isProfileLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <h1 className="profile__hello-title">Привет, Виталий!</h1>
      <Form handleSubmit={handleEditProfile} profileFormHeight="profile__form-height" profileButton="profile__button-submit" buttonName="Редактировать">

        <div className="profile__inputs-box">
          <div className="profile__name-box">
            <label for="name" className="profile__label">Имя</label>
            <input id="name" type="text" className="profile__input" defaultValue="Виталий" minLength="2" maxLength="30" required></input>
          </div>

          <div className="profile__email-box">
            <label for="email" className="profile__label">E-mail</label>
            <input id="email" type="email" className="profile__input" defaultValue="pochta@yandex.ru" maxLength="70" required></input>
          </div>
        </div>

      </Form>
      <button className="profile__logout">Выйти из аккаунта</button>
    </div>
  )

}

export default Profile;