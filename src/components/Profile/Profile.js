import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";

import { ValidationContext } from '../../context/ValidationContext';


function Profile({
  dataUser,
  handleOpenNotificationPopup,
  setIsLoggedIn,
  goToMainPage,
  saveDataUserInState,
  saveDataUserInLocalStorage,
  abortController,
}) {


  const [isBlockedInput, setIsBlockedInput] = useState(null); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  // КОНТЕКСТ ВАЛИДАЦИИ ФОРМ
  const validationContext = React.useContext(ValidationContext);

  const { errorsForm, getValidDataFromForm, resetValidInputFields, resetFormByDefault, setInitialInputParametersForProfile } = validationContext;



  useEffect(() => {
    setInitialInputParametersForProfile()

    return () => {
      setIsBlockedInput(null)
      resetFormByDefault()
    }
  }, [])



  // ОБРАБОТАТЬ РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  function handleClickButtonEditUserData(e, setIsSubmit) {

    e.preventDefault()
    setIsBlockedInput(true)

    const dataForUpdate = getValidDataFromForm()

    mainApi.editUserData(dataForUpdate, abortController)
      .then((data) => {
        saveDataUserInState(data)
        saveDataUserInLocalStorage(data)
        resetValidInputFields()
        handleOpenNotificationPopup('success', data.message)
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
      .finally(() => {
        setIsBlockedInput(false)
        setIsSubmit(false)
      })
  }



  // ОБРАБОТАТЬ РАЗЛОГИН ПОЛЬЗОВАТЕЛЯ
  function handleClickButtonUserLogout() {

    mainApi.logoutUser()
      .then(() => {
        localStorage.clear()
        setIsLoggedIn(false)
        goToMainPage()
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
  }



  return (
    <div className="profile">

      <h1 className="profile__hello-title">Привет, {dataUser?.name}!</h1>


      <Form handleSubmit={handleClickButtonEditUserData} profileFormHeight="profile__form-height" profileButton="profile__button-submit" buttonName="Редактировать">

        <div className="profile__inputs-box">

          <div className="profile__name-box">
            <label htmlFor="name" className="profile__label">Имя</label>

            <input disabled={isBlockedInput && true} name="name" defaultValue={dataUser?.name} id="name" type="text" className="profile__input" minLength="2" maxLength="30" autoComplete="off" spellCheck={false} required />
          </div>

          <span className={`form__not-valid form__not-valid_profile ${errorsForm?.name ? "form__not-valid_active" : ''}`}>
            {errorsForm?.name}
          </span>



          <div className="profile__email-box">
            <label htmlFor="email" className="profile__label">E-mail</label>

            <input disabled={isBlockedInput && true} name="email" defaultValue={dataUser?.email} id="email" type="email" className="profile__input" minLength="6" maxLength="50" autoComplete="off" spellCheck={false} required />
          </div>

          <span className={`form__not-valid form__not-valid_profile ${errorsForm?.email ? "form__not-valid_active" : ""}`}>
            {errorsForm?.email}
          </span>

        </div>

      </Form>


      <button onClick={handleClickButtonUserLogout} className="profile__logout">Выйти из аккаунта</button>
    </div>
  )
}

export default Profile;