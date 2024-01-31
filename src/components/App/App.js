import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ValidationContext } from '../../context/ValidationContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import PageNotFound from '../PageNotFound/PageNotFound';

import useValidation from '../../hooks/useValidationForm';
import useActionsWithDataUser from '../../hooks/useActionsWithDataUser';
import useRedirect from '../../hooks/useRedirect';
import useAnchorLink from '../../hooks/useAnchorLink';

import checkUserLoggedIn from '../../utils/helpers/checkUserLoggedIn';



function App() {

  const abortController = new AbortController()

  const [dataUser, setDataUser] = useState(null);
  const [isActiveNavigationMenu, setIsActiveNavigationMenu] = useState(null); // АКТИВНО ЛИ НАВИГАЦИОННОЕ МЕНЮ
  const [isLoggedIn, setIsLoggedIn] = useState(null); // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  const [notificationPopup, setNotificationPopup] = useState({
    isActive: null,
    type: null,
    message: null,
  }); // ПОПАП ОШИБОК И УСПЕШНЫХ ДЕЙСТВИЙ
  const [isPageNotFound, setIsPageNotForund] = useState(null)

  const {
    handleChangeInput,
    errorsForm,
    inputParameters,
    checkValidityForm,
    resetFormByDefault,
    resetValidInputFields,
    getValidDataFromForm,
    setInitialInputParametersForProfile
  } = useValidation({ dataUser, changeDataUser })

  const {
    saveDataUserInState,
    saveDataUserInLocalStorage,
  } = useActionsWithDataUser({ changeDataUser, handleOpenNotificationPopup, abortController })

  const { goToMainPage, goToMoviesPage } = useRedirect()
  const { handleClickAnchorLink } = useAnchorLink()



  useEffect(() => {
    // ЕСЛИ НЕ АУТЕНТИФИЦИРОВАН И НЕТ ДАННЫХ ПОЛЬЗОВАТЕЛЯ В ХРАНИЛИЩЕ
    if (!isLoggedIn && !checkUserLoggedIn()) {
      localStorage.clear()
    } else {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])



  useEffect(() => {
    if (notificationPopup.isNeedNewInstance) {
      handleOpenNotificationPopup(notificationPopup.type, notificationPopup.message)
    }
  }, [notificationPopup])



  // ОТПРАВИТЬ АУТЕНТИФИКАЦИОННЫЙ ЗАПРОС ПОЛЬЗОВАТЕЛЯ НА СЕРВЕР
  function sendAuthReqUserToApi({ email, password, setIsBlockedInput, setIsSubmit }) {

    mainApi.signIn({ email, password })
      .then((data) => {
        setIsLoggedIn(true)
        saveDataUserInState(data)
        saveDataUserInLocalStorage(data)
        localStorage.setItem('isLoggedIn', true)
        goToMoviesPage()
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
      .finally(() => {
        setIsBlockedInput(false)
        if (setIsSubmit) {
          setIsSubmit(false)
        }
      })
  }



  // ИЗМЕНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  function changeDataUser(newData) {
    setDataUser(newData)
  }



  // ОБРАБОТАТЬ ОТКРЫТИЕ ПОПАПА УВЕДОМЛЕНИЙ
  async function handleOpenNotificationPopup(type, data) {

    // ЕСЛИ УЖЕ ЕСТЬ АКТИВНОЕ УВДОМЛЕНИЕ
    if (notificationPopup.isActive) {
      setNotificationPopup({ isActive: false, type: type, message: data, isNeedNewInstance: true })
      return
    }

    // ЕСЛИ УСПЕШНОЕ (ПРОСТОЕ) УВЕДОМЛЕНИЕ
    if (type === 'success') {
      setNotificationPopup({
        isActive: true,
        type: 'success',
        message: data
      })
      return
    }

    // ЕСЛИ УВЕДОМЛЕНИЕ ОБ ОШИБКЕ
    if (type === 'error') {
      let message = await data

      if (data instanceof Promise) { // ПРОВЕРКА, ЯВЛЯЮТСЯ ЛИ ДАННЫЕ ПРОМИСОМ (А МОГУТ ПЕРЕДАВАТЬСЯ И ПРОСТЫЕ ДАННЫЕ - БЕЗ ПРОМИСА)
        const error = await data
        message = error.validation ? error.validation.body.message : error.message
      }

      setNotificationPopup({
        isActive: true,
        type: 'error',
        message,
      })
      return
    }
  }



  // ОБРАБОТАТЬ КЛИК КНОПКИ НАВИГАЦИОННОГО МЕНЮ
  function handleClickButtonNavigationMenu() {
    setIsActiveNavigationMenu(prevState => !prevState);
  }



  return (
    <ValidationContext.Provider
      value={{
        dataUser: dataUser,
        changeDataUser: changeDataUser,
        handleChange: handleChangeInput,
        errorsForm: errorsForm,
        inputParameters: inputParameters,
        checkValidityForm: checkValidityForm,
        resetFormByDefault: resetFormByDefault,
        resetValidInputFields: resetValidInputFields,
        getValidDataFromForm: getValidDataFromForm,
        setInitialInputParametersForProfile: setInitialInputParametersForProfile,
      }}>
      <div className="page">
        <div className="page__box">

          <Header
            isLoggedIn={isLoggedIn}
            isPageNotFound={isPageNotFound}
            goToMainPage={goToMainPage}
            handleClickButtonNavigationMenu={handleClickButtonNavigationMenu}
          />


          {
            isLoggedIn &&
            <NavigationMenu
              isActiveNavigationMenu={isActiveNavigationMenu}
              setIsActiveNavigationMenu={setIsActiveNavigationMenu}
            />
          }


          <Switch>

            <Route exact path="/">
              <Main handleClickAnchorLink={handleClickAnchorLink} />
            </Route>


            <Route path="/signup">
              {
                !isLoggedIn ?
                  <SignUp
                    sendAuthReqUserToApi={sendAuthReqUserToApi}
                    handleOpenNotificationPopup={handleOpenNotificationPopup}
                  />
                  :
                  <Redirect to="/movies" />
              }
            </Route>



            <Route path="/signin">
              {!isLoggedIn ?
                <SignIn
                  sendAuthReqUserToApi={sendAuthReqUserToApi}
                  handleChangeInput={handleChangeInput}
                />
                :
                <Redirect to="/movies" />}
            </Route>


            <ProtectedRoute path='/movies' isLoggedIn={isLoggedIn}>
              <Movies handleOpenNotificationPopup={handleOpenNotificationPopup} />
            </ProtectedRoute>


            <ProtectedRoute path='/profile' isLoggedIn={isLoggedIn}>
              <Profile
                dataUser={dataUser}
                handleOpenNotificationPopup={handleOpenNotificationPopup}
                setIsLoggedIn={setIsLoggedIn}
                goToMainPage={goToMainPage}
                saveDataUserInState={saveDataUserInState}
                saveDataUserInLocalStorage={saveDataUserInLocalStorage}
                abortController={abortController}
              />
            </ProtectedRoute>


            <ProtectedRoute path='/saved-movies' isLoggedIn={isLoggedIn}>
              <SavedMovies handleOpenNotificationPopup={handleOpenNotificationPopup} />
            </ProtectedRoute>


            <Route>
              <PageNotFound setIsPageNotForund={setIsPageNotForund} />
            </Route>

          </Switch>


          <Footer isPageNotFound={isPageNotFound} />


          {
            notificationPopup.isActive &&
            <NotificationPopup
              notificationPopup={notificationPopup}
              setNotificationPopup={setNotificationPopup}
            />
          }

        </div>
      </div>

    </ValidationContext.Provider>
  )
};

export default App;
