import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { useHistory } from 'react-router';


import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

import { widthWindowForFirstCount, widthWindowForSecondaryCounts } from './../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Error from '../Error/Error';


function App() {

  const [isRegLink, setIsRegLink] = useState(false);
  const [isLogLink, setIsLogLink] = useState(false);
  const [isProfileLink, setIsProfileLink] = useState(false);
  const [isMoviesLink, setIsMoviesLink] = useState(false);
  const [isSavedMoviesLink, setIsSavedMoviesLink] = useState(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isFirstCountCards, setIsFirstCountCards] = useState(false); // ПЕРВИЧНЫЙ ОТБОР КАРТОЧЕК?

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pressedSubmitSearchForm, setPressedSubmitSearchForm] = useState(false)
  const [isPreloaderActive, setIsPreloaderActive] = useState(false)

  const [initialCards, setInitialCards] = useState([]); // МАССИВ ВСЕХ ИМЕЮЩИХСЯ ФИЛЬМОВ
  const [valueInputSearchForm, setValueInputSearchForm] = useState(''); // ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА ФОРМЫ ПОИСКА ФИЛЬМА
  const [resultSearchMovies, setResultSearchMovies] = useState([]); // МАССИВ НАЙДЕННЫХ ФИЛЬМОВ ПО ЗНАЧЕНИЮ

  const [selectedCards, setSelectedCards] = useState([]); // МАССИВ ПЕРВОГО КОЛИЧЕСТВЕННОГО (12/8/5) ОТБОРА КАРТОЧЕК
  const [fewCards, setFewCards] = useState([]); // МАССИВ ПОСЛЕДУЮЩЕГО ОТБОРА КАРТОЧЕК КНОПКОЙ "ЕЩЁ" (3/2/1)

  const [savedMovies,] = useState([]); // ВСЕ СОХРАНЁННЫЕ ФИЛЬМЫ
  const [countedSavedMovies, setCountedSavedCards] = useState([]); // ОТБИРАЕМЫЕ СОХРАНЁННЫЕ ФИЛЬМЫ ПО 12 ШТУК

  const [formSignUpInputs, setFormSignUpInputs] = useState({ // ПОЛЯ ФОРМЫ РЕГИСТРАЦИИ
    name: '',
    email: '',
    password: '',
  })

  const [formSignInInputs, setFormSignInInputs] = useState({ // ПОЛЯ ФОРМЫ АУТЕНТИФИКАЦИИ
    email: '',
    password: '',
  })

  const [formProfileInputs, setFormProfileInputs] = useState({ // ПОЛЯ ФОРМЫ ПРОФИЛЯ
    name: '',
    email: '',
  })

  const [error, setError] = useState({ active: false, message: '' })

  const history = useHistory();


  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signup
  function handleIsRegLink() {
    setIsRegLink(true)
    setIsLogLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signin
  function handleIsLogLink() {
    setIsLogLink(true)
    setIsRegLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /profile
  function handleIsProfileLink() {
    setIsProfileLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА КЛИКА НА ЛОГО САЙТА (главная страница)
  function handleClickByLogo() {
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsProfileLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /saved-movies
  function handleIsSavedMoviesLink() {
    setIsSavedMoviesLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsProfileLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /movies
  function handleIsMoviesLink() {
    setIsMoviesLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsSavedMoviesLink(false)
    setIsProfileLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ПРЕЛОАДЕР АКТИВЕН
  function handleSetPreloaderActive() {
    setIsPreloaderActive(true);
  }

  // ПРЕЛОАДЕР НЕАКТИВЕН
  function handleSetPreloaderNotActive() {
    setIsPreloaderActive(false);
  }

  // ОБРАБОТЧИК САБМИТА ФОРМЫ ПОИСКА ФИЛЬМА
  function handleSubmitSearchForm(e) {
    e.preventDefault();
    setPressedSubmitSearchForm(true); // САБМИТ ПОИСКА ФИЛЬМА НАЖАТ
  }


  // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  function handleIsLoggedIn() {
    setIsLoggedIn(true);
  }


  // ОБРАБОТЧИК ЗАКРЫТИЯ ОКНА ОШИБКИ
  function handleCloseError() {
    setError(false);
  }

  // ОБРАБОТЧИК СТРАНИЦЫ 404 - ОТКРЫТА
  function handlePageNotFoundOpened() {
    setIsPageNotFound(true)
  }


  // ОТКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleIsProfileMenu() {
    setIsProfileMenu(true)
  }

  // ЗАКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleButtonCloseMenuProfile() {
    setIsProfileMenu(false)
  }

  // ПЕРВИЧНЫЙ ОТБОР КАРТОЧЕК (ПЕРВЫЙ ПОКАЗ)
  function handleSetIsFirstCoundCardsActive() {
    setIsFirstCountCards(true)
  }
  // ПЕРВИЧНОГО ОТБОРА КАРТОЧЕК ЕЩЁ НЕ БЫЛО ИЛИ УЖЕ БЫЛ
  function handleSetIsFirstCoundCardsNotActive() {
    setIsFirstCountCards(false)
  }

  // ОБРАБОТЧИК ПОЯВЛЕНИЯ ОКНА ОШИБКИ
  function handleOpenError(data) {
    setError(data);
  }

  // ОБРАБОТЧИК МАССИВА НАЙДЕННЫХ ФИЛЬМОВ
  function handleSetResultSearchMovies(data) {
    setResultSearchMovies(data)
  }

  // ОБРАБОТЧИК ЗАПИСИ В СТЭЙТ ВСЕХ ФИЛЬМОВ ИЗ API
  function handleSetCards(data) {
    setInitialCards(data)
  }

  // ПРИ ЗАГРУЗКЕ ФИЛЬМОВ В МАССИВ, ПРОИСХОДИТ ИХ КОЛИЧЕСТВЕННОЕ ПЕРЕМЕЩЕНИЕ В ДРУГОЙ МАССИВ
  useEffect(() => {
    handleSetIsFirstCoundCardsActive(); // ОБЪЯВЛЯЕМ, ЧТО ЭТО ПЕРВЫЙ ОТБОР КАРТОЧЕК
    if (resultSearchMovies.length >= 1) { // ЕСЛИ В МАССИВЕ РЕЗУЛЬТАТА ПОИСКА ЧТО-ТО НАШЛОСЬ
      handleCountCards() // ЗАПУСК ОТБОРА КАРТОЧЕК
    }
  }, [resultSearchMovies])


  // ПЕРЕНАПРАВЛЕНИЕ НА /movies
  function handleRedirectMovies() {
    history.push('/movies')
  }

  // ОБРАБОТЧИК ЗНАЧЕНИЯ В ПОЛЕ ФОРМЫ ПОИСКА ФИЛЬМОВ
  function handleSetValueInputSearchForm(e) {
    const value = e.target.value.trim().toLowerCase();
    setValueInputSearchForm(value);
  }



  function handleEditProfile(e) {
    e.preventDefault();
  }


  // ВРЕМЕННЫЙ ОБРАБОТЧИК КНОПКИ КАРТОЧКИ "СОХРАНИТЬ ФИЛЬМ"
  function handleIsActiveButtonSave(e) {
    e.target.classList.toggle('movies-card__button-save_active')
  }


  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignUp(e) {
    e.preventDefault();
    const { name, email, password } = formSignUpInputs;
    mainApi.signUp(name, email, password)
      .then((res) => { console.log(res) })
      .catch((err) => {
        handleOpenError(); // (ОШИБКА ДОЛЖНА РАСПОЛАГАТЬСЯ НАД КНОПКОЙ ЗАРЕГИСТРИРОВАТЬСЯ)
        console.log(`Ошибка: ${err}`);
      })
  }

  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignIn(e) {
    e.preventDefault();
    const { email, password } = formSignInInputs;

    mainApi.signIn(email, password)
      .then((res) => {

        console.log(res);
        handleIsLoggedIn();
        handleIsMoviesLink();
        handleRedirectMovies();
        console.log('dscdscdsc', isLoggedIn)
      })
      .catch((err) => {
        handleOpenError();
        console.log(`Ошибка: ${err}`);
      })

  }




  /* -------------------------------------------------------------------------- */
  /*                       ОБРАБОТЧИК ПОЛЕЙ ФОРМ (НАЧАЛО)                       */
  /* -------------------------------------------------------------------------- */

  function handleInputsForm(e) {

    const baseUri = e.target.form.baseURI;

    const signUpEndPoint = handleIncludes(baseUri, 'signup')
    const signInEndPoint = handleIncludes(baseUri, 'signin')
    const profileEndPoint = handleIncludes(baseUri, 'profile')

    if (signUpEndPoint) {
      handleInputs(e, setFormSignUpInputs, formSignUpInputs)
    }
    if (signInEndPoint) {
      handleInputs(e, setFormSignInInputs, formSignInInputs)
    }
    if (profileEndPoint) {
      handleInputs(e, setFormProfileInputs, formProfileInputs)
    }
  }

  // ОБРАБОТЧИК ПОЛЕЙ
  function handleInputs(e, setter, setVar) {
    const input = e.target.name;
    const value = e.target.value;

    setter({
      ...setVar,
      [input]: value,
    })

  }

  // СОДЕРЖИТ ЛИ ССЫЛКА НУЖНЫЙ ЭНДПОИНТ
  function handleIncludes(uri, endpoint) {
    return uri.includes(endpoint);
  }

  /* -------------------------------------------------------------------------- */
  /*                        ОБРАБОТЧИК ПОЛЕЙ ФОРМ (КОНЕЦ)                       */
  /* -------------------------------------------------------------------------- */


  /*
  // ОБРАБОТЧИК ПОЛЕЙ ФОРМЫ АУТЕНТИФИКАЦИИ
  function handleSignInInputs(e) {

    const input = e.target.name;
    const value = e.target.value;

    setSignInInputs({
      ...signInInputs,
      [input]: value,
    })
  }
  */

  // ОЧИЩЕНИЕ МАССИВА ЗАГРУЖЕННЫХ ФИЛЬМОВ
  function handleClearResultSearchMovies() {
    setResultSearchMovies([])
  }

  // ОЧИЩЕНИЕ МАССИВА КОЛИЧЕСТВЕННОГО ОТБОРА КАРТОЧЕК
  function handleClearSelectedCards() {
    setSelectedCards([])
  }

  // ПОЛУЧЕНИЕ ШИРИНЫ ОКНА БРАУЗЕРА
  function getWidthWindowBrowser() {
    return window.innerWidth
  }

  // 1
  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМОВ
  useEffect(() => {
    if (pressedSubmitSearchForm) {
      handleClearResultSearchMovies() // ОЧИЩАЕМ МАССИВ ЗАГРУЖЕННЫХ ФИЛЬМОВ
      handleClearSelectedCards() // ОЧИЩАЕМ МАССИВ КОЛИЧЕСТВЕННОГО ОТБОРА КАРТОЧЕК
      handleSetPreloaderActive() // ВКЛЮЧАЕМ ПРЕЛОАДЕР

      moviesApi.getMovies()
        .then((data) => {
          handleSetCards(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ В МАССИВ
          localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        })
        .catch((err) => {
          console.error('Ошибка:', err);
          handleOpenError({
            active: true,
            message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          })
        })
    }
  }, [pressedSubmitSearchForm]) // ОТСЛЕЖИВАЕМ НАЖАТИЕ САБМИТА ПОИСКА ФИЛЬМОВ


  // 2
  // ПОИСК ФИЛЬМА СОГЛАСНО ЗНАЧЕНИЮ В ПОЛЕ ПОИСКА
  useEffect(() => {
    if (initialCards) {
      initialCards.forEach((movie) => {
        const valueFromInputSearch = movie.nameRU.trim().toLowerCase().includes(valueInputSearchForm);

        if (valueFromInputSearch) { // ЕСЛИ ЗНАЧЕНИЕ ПОЛЯ СОВПАДАЕТ С НАЗВАНИЕМ ФИЛЬМА ИЗ ВСЕГО СПИСКА
          handleSetResultSearchMovies((prevMovies) => { return [...prevMovies, movie] }) // ЗАПИСЫВАЕМ ФИЛЬМ В МАССИВ НАЙДЕННЫХ ФИЛЬМОВ
        }
      })
      handleSetPreloaderNotActive(); // ВЫКЛЮЧИЛИ ПРЕЛОАДЕР
      setPressedSubmitSearchForm(false);// САБМИТ ПОИСКА ФИЛЬМА НЕ НАЖАТ

    }
  }, [initialCards])


  // 3
  // ОТБОР КАРТОЧЕК
  function handleCountCards() {

    const currentWidthWindow = getWidthWindowBrowser();

    let parametersWindow = null;

    let quantity = null;
    // let { big: { fromBig, quantityBig }, middle: { fromMiddle, toMiddle, quantityMiddle }, low: { fromLow, toLow, quantityLow } } = quantity;

    if (isFirstCountCards) {
      console.log('ПАРАМЕТРЫ1', parametersWindow)
      console.log(isFirstCountCards)
      parametersWindow = widthWindowForFirstCount // ПЕРВИЧНЫЙ ОТБОР (ОТОБРАЗИТСЯ СРАЗУ 12/8/5)
      handleSetIsFirstCoundCardsNotActive()
      console.log(isFirstCountCards)
      console.log('ПАРАМЕТРЫ1', parametersWindow)
    } else {
      console.log('ПАРАМЕТРЫ2', parametersWindow)
      console.log(isFirstCountCards)
      parametersWindow = widthWindowForSecondaryCounts // ВТОРИЧНЫЙ ОТБОР (БУДЕТ ОТОБРАЖАТЬСЯ ПРИ НАЖАТИИ НА КНОПКУ "ЕЩЁ" 3/2/1)
      console.log(isFirstCountCards)
      console.log('ПАРАМЕТРЫ2', parametersWindow)
    }

    if (currentWidthWindow >= parametersWindow.big.from) { // 1280 или 1210
      quantity = parametersWindow.big.quantity; // 12 или 3
    }
    if (currentWidthWindow >= parametersWindow.middle.from && currentWidthWindow < parametersWindow.middle.to) { // 768-1280 или 751-1210
      quantity = parametersWindow.middle.quantity; // 8 или 2
    }
    if (currentWidthWindow >= parametersWindow.low.from && currentWidthWindow <= parametersWindow.low.to) { // 320-480 или 320-750
      quantity = parametersWindow.low.quantity; // 5 или 1
    }

    // console.log('ПАРАМЕТРЫ', parametersWindow)
    console.log('КОЛИЧЕСТВО', quantity)

    const pickedAnyCards = resultSearchMovies.splice(0, quantity);

    let currentNumberCards = []

    pickedAnyCards.forEach((card) => {
      currentNumberCards.push(card)
    })

    // К ПРЕДЫДУЩИМ КАРТОЧКАМ УЖЕ НАХОДЯЩИХСЯ В МАССИВЕ (prevCards) - ДОБАВЛЯЕМ НОВЫЕ,
    // КОТОРЫЕ ОТОБРАЛИ В КОЛИЧЕСТВЕ ДО 3/2/1 ШТУКИ КНОПКОЙ "ЕЩЁ" (currentFewCards)
    setSelectedCards((prevCards) => { return [...prevCards, ...currentNumberCards] })
  }


  // ОБРАБОТЧИК СОХРАНЕНИЯ ФИЛЬМА
  function handleSavedMovies() {
    const pickedCards = savedMovies.splice(0, 12);

    let currentCards = []

    pickedCards.forEach((card) => {
      currentCards.push(card)
    })

    setCountedSavedCards((prevCards) => { return [...prevCards, ...currentCards] })
  }



  // ОБРАБОТЧИК УДАЛЕНИЯ ФИЛЬМА
  function handleDeleteMovies() {

  }

  return (

    <div className="page">
      <div className="page__box">

        <Header
          isRegLink={isRegLink}
          isLogLink={isLogLink}
          isProfileLink={isProfileLink}
          isMoviesLink={isMoviesLink}
          isSavedMoviesLink={isSavedMoviesLink}
          isPageNotFound={isPageNotFound}
          handleIsRegLink={handleIsRegLink}
          handleIsLogLink={handleIsLogLink}
          handleIsProfileLink={handleIsProfileLink}
          handleClickByLogo={handleClickByLogo}
          handleIsProfileMenu={handleIsProfileMenu}
        />

        <Switch>

          <Route exact path="/">
            {isLoggedIn ? (<Redirect to="/movies" />) : (<Main handleClickByLogo={handleClickByLogo} />)}
          </Route>

          <Route
            path="/movies">
            <Movies
              isLoggedIn={isLoggedIn}
              component={Movies}
              selectedCards={selectedCards}
              isMoviesLink={isMoviesLink}
              isProfileMenu={isProfileMenu}
              pushedSubmitSearchForm={pressedSubmitSearchForm}
              isPreloaderActive={isPreloaderActive}
              resultSearchMovies={resultSearchMovies}
              fewCards={fewCards}

              handleCountCards={handleCountCards}
              // handleCountFewCards={handleCountFewCards}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleIsMoviesLink={handleIsMoviesLink}
              handleSubmitSearchForm={handleSubmitSearchForm}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
              handleSetValueInputSearchForm={handleSetValueInputSearchForm}
              handleSetPreloaderActive={handleSetPreloaderActive}
            /></Route>

          <Route path="/profile">
            <Profile
              isProfileLink={isProfileLink}
              isProfileMenu={isProfileMenu}
              handleEditProfile={handleEditProfile}
              handleIsProfileLink={handleIsProfileLink}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
              handleIsMoviesLink={handleIsMoviesLink}
              handleIsSavedMoviesLink={handleIsSavedMoviesLink}
            />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              savedMovies={savedMovies}
              countedSavedMovies={countedSavedMovies}
              isSavedMoviesLink={isSavedMoviesLink}
              isProfileMenu={isProfileMenu}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleSavedMovies={handleSavedMovies}
              handleDeleteMovies={handleDeleteMovies}
              handleIsSavedMoviesLink={handleIsSavedMoviesLink}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
            />
          </Route>


          <Route path="/signup">
            <SignUp
              handleInputsForm={handleInputsForm}
              handleIsRegLink={handleIsRegLink}
              handleSubmitSignUp={handleSubmitSignUp}
            />
          </Route>


          <Route path="/signin">
            <SignIn
              handleInputsForm={handleInputsForm}
              handleIsLogLink={handleIsLogLink}
              handleSubmitSignIn={handleSubmitSignIn}
            />
          </Route>

          <Route path="*">
            <PageNotFound
              handlePageNotFoundOpened={handlePageNotFoundOpened}
            />
          </Route>

        </Switch>

        <Footer
          isPageNotFound={isPageNotFound}
          isProfileLink={isProfileLink}
          resultSearchMovies={resultSearchMovies}
        />

        <Error
          error={error}
          handleCloseError={handleCloseError}
        />

      </div>
    </div>
  )
};

export default App;
