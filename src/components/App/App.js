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

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pressedSubmitSearchForm, setPressedSubmitSearchForm] = useState(false)
  const [isPreloaderActive, setIsPreloaderActive] = useState(false)

  const [initialCards, setInitialCards] = useState([]); // ВСЕ ИМЕЮЩИЕСЯ ФИЛЬМЫ
  const [valueInputSearchForm, setValueInputSearchForm] = useState(''); // ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА ФОРМЫ ПОИСКА ФИЛЬМА
  const [resultSearchMovies, setResultSearchMovies] = useState([]); // НАЙДЕННЫЕ ФИЛЬМЫ ПО ЗНАЧЕНИЮ




  const [selectedCards, setSelectedCards] = useState([]); // КОЛИЧЕСТВЕННЫЙ ОТБОР КАРТОЧЕК

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

  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМОВ
  useEffect(() => {
    if (pressedSubmitSearchForm) {
      handleSetResultSearchMovies([]) // ОЧИЩАЕМ МАССИВ ДЛЯ НОВОГО ЗНАЧЕНИЯ
      handleSetPreloaderActive() // ВКЛЮЧИЛИ ПРЕЛОАДЕР

      moviesApi.getMovies()
        .then((data) => {
          handleSetCards(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ В МАССИВ
          localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        })
        .catch((err) => {
          handleOpenError({
            active: true,
            message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          })
        })
    }
  }, [pressedSubmitSearchForm]) // ОТСЛЕЖИВАЕМ НАЖАТИЕ САБМИТА ПОИСКА ФИЛЬМОВ


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

  console.log('ВСЕ ФИЛЬМЫ: ', initialCards)
  console.log('ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА: ', valueInputSearchForm)
  console.log('РЕЗУЛЬТАТ ПОИСКА: ', resultSearchMovies)
  /*  useEffect(() => {
     console.log('ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА: ', valueInputSearchForm)
     console.log('РЕЗУЛЬТАТ ПОИСКА: ', resultSearchMovies)
   }, [pushedSubmitSearchForm]) */

  // ПЕРЕНАПРАВЛЕНИЕ НА /movies
  function handleRedirectMovies() {
    history.push('/movies')
  }

  // ОБРАБОТЧИК ЗНАЧЕНИЯ В ПОЛЕ ФОРМЫ ПОИСКА ФИЛЬМОВ
  function handleSetValueInputSearchForm(e) {
    const value = e.target.value.trim().toLowerCase();
    setValueInputSearchForm(value);
  }

  // ОБРАБОТЧИК МАССИВА НАЙДЕННЫХ ФИЛЬМОВ
  function handleSetResultSearchMovies(data) {
    setResultSearchMovies(data)
  }

  /*   // ПОИСК ФИЛЬМА СОГЛАСНО ЗНАЧЕНИЮ В ПОЛЕ ПОИСКА
    function handleShowResultSearchMovies() {

    } */

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




  /*
    function handleGetMovies() {

    } */

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


  // ОБРАБОТЧИК ЗАПИСИ В СТЭЙТ ВСЕХ ФИЛЬМОВ ИЗ API
  function handleSetCards(data) {
    setInitialCards(data)
  }

  // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  function handleIsLoggedIn() {
    setIsLoggedIn(true);
  }

  // ОБРАБОТЧИК ПОЯВЛЕНИЯ ОКНА ОШИБКИ
  function handleOpenError(data) {
    setError(data);
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


  // ОБРАБОТЧИК ОТБОРА 12 КАРТОЧЕК
  // СРАБАТЫВАЕТ В САМОМ НАЧАЛЕ, ПОСЛЕ РЕНДЕРА ПРИЛОЖЕНИЯ - ОДИН РАЗ,
  // А ТАКЖЕ, КАЖДЫЙ РАЗ ПРИ НАЖАТИИ КНОПКИ "ЕЩЁ" В КОМПОНЕНТЕ <MORE />
  function handleCountCards() {

    const pickedCards = initialCards.splice(0, 12);

    let currentCards = []

    pickedCards.forEach((card) => {
      currentCards.push(card)
    })

    // К ПРЕДЫДУЩИМ КАРТОЧКАМ УЖЕ НАХОДЯЩИХСЯ В МАССИВЕ (prevCards) - ДОБАВЛЯЕМ НОВЫЕ,
    // КОТОРЫЕ ОТОБРАЛИ В КОЛИЧЕСТВЕ ДО 12 ШТУК КНОПКОЙ "ЕЩЁ" (currentCards)
    setSelectedCards((prevCards) => { return [...prevCards, ...currentCards] })
    console.log('dddddddddd', initialCards)
    console.log('gggggggggg', selectedCards)
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
              handleCountCards={handleCountCards}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleIsMoviesLink={handleIsMoviesLink}
              handleSubmitSearchForm={handleSubmitSearchForm}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
              // handleGetMovies={handleGetMovies}
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
    </div >
  )
};

export default App;
