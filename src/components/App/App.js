import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { ValidationContext } from '../context/ValidationContext';
import { parseJSON, stringifyJSON } from '../../utils/helpers/jsonHandler';
import {
  errorMessage,
  widthWindowForFirstCount,
  widthWindowForSecondaryCounts,
} from '../../utils/constants/constants';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import getWidthWindowBrowser from './../../utils/helpers/widthWindowBrowser';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Error from '../Error/Error';


function App() {

  const [isMainLink, setIsMainLink] = useState(false)
  const [isRegLink, setIsRegLink] = useState(false)
  const [isLogLink, setIsLogLink] = useState(false)
  const [isProfileLink, setIsProfileLink] = useState(false)
  const [isMoviesLink, setIsMoviesLink] = useState(false)
  const [isSavedMoviesLink, setIsSavedMoviesLink] = useState(false)
  const [isPageNotFound, setIsPageNotFound] = useState(false)
  const [isProfileMenu, setIsProfileMenu] = useState(false)
  const [isFirstCountCards, setIsFirstCountCards] = useState(false) // ПЕРВИЧНЫЙ ОТБОР КАРТОЧЕК?
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false) // НИ ОДИН ФИЛЬМ ПО ЗАПРОСУ НЕ НАЙДЕН (MoviesCardList) - /movies и /saved-movies
  const [isLikeRemoved, setIsLikeRemoved] = useState(false); //  БЫЛ ЛИ СНЯТ ЛАЙК С КАРТОЧКИ - ФЛАГ ДЛЯ /saved-movies
  const [firstLoggingUser, setFirstLoggingUser] = useState(false) // ПЕРВЫЙ ЛИ ЛОГИН, ПОСЛЕ РЕГИСТРАЦИИ

  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false) // ЧЕКБОКС "КОРОТКОМЕТРАЖКИ"

  const [isLoggedIn, setIsLoggedIn] = useState(parseJSON(localStorage.getItem('userLogged'))) // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ

  const [currentUser, setCurrentUser] = useState(parseJSON(localStorage.getItem('dataUser'))) // ЗНАЧЕНИЕ ДЛЯ ПРОВАЙДЕРА КОНТЕКСТА

  const [isSubmitProfileDisabled, setIsSubmitProfileDisabled] = useState(false); // disabled САБМИТА, ПОСЛЕ РЕДАКТИРОВАНИЯ


  // STORAGE GET
  // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ИЗ ХРАНИЛИЩА
  function getMoviesFromStorage() {
    return parseJSON(localStorage.getItem('movies'));
  }


  // ПОЛУЧЕНИЕ ВСЕХ СОХРАНЁННЫХ ФИЛЬМОВ ИЗ ХРАНИЛИЩА
  function getSavedMoviesStorage() {
    return parseJSON(localStorage.getItem('savedMovies'));
  }


  // ЗАПИСЫВАЕТСЯ ПОСЛЕ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ И УДАЛЯЕТСЯ, ПОСЛЕ ПЕРВОГО САБМИТА
  function getAfterRegBeforeFirstSubmitStorage() {
    return parseJSON(localStorage.getItem('afterRegBeforeFirstSubmit'))
  }


  // STORAGE SET
  function setActiveAfterRegBeforeFirstSubmitStorage() {
    return localStorage.setItem('afterRegBeforeFirstSubmit', stringifyJSON(true))
  }


  function setActiveAuthAfterLogoutStorage() {
    return localStorage.setItem('authAfterLogoutActive', stringifyJSON(true))
  }


  function setActiveUserLoggedStorage() {
    return localStorage.setItem('userLogged', stringifyJSON(true))
  }


  function setActiveReloadedPageStorage() {
    return localStorage.setItem('reloadedPage', stringifyJSON(true))
  }


  function setEmptyMoviesFromStorage() {
    return localStorage.setItem('movies', stringifyJSON([]))
  }


  function setEmptySavedMoviesFromStorage() {
    return localStorage.setItem('savedMovies', stringifyJSON([]))
  }

  const [timeBetweenRequestsStorage, setTimeBetweenRequestsStorage] = useState(false); // МОЖНО ЛИ ДЕЛАТЬ НОВЫЙ ЗАПРОС К СЕРВЕРУ ЗА ФИЛЬМАМИ
  const [isPressedSubmitSearchForm, setIsPressedSubmitSearchForm] = useState(false) // НАЖАТА ЛИ КНОПКА САБМИТА ПОИСКА ФИЛЬМОВ
  const [isPreloaderActive, setIsPreloaderActive] = useState(false)// ВКЛЮЧЁН ЛИ ПРЕЛОАДЕР
  const [windowBrowserClosed, setWindowBrowserClosed] = useState({ closed: false, againOpened: false })
  const [isReloadedPage, setIsReloadedPage] = useState(false) // ЗАЛОГИНИЛСЯ ЛИ ПОЛЬЗОВАТЕЛЬ, ПОСЛЕ ЛОГАУТА
  const [nullApiStep, setNullApiStep] = useState(false) // ПЕРВЫЙ ФЛАГ ДЛЯ САБМИТА, ПОСЛЕ ЕГО НАЖАТИЯ
  const [firstApiStep, setFirstApiStep] = useState(false)
  const [secondApiStep, setSecondApiStep] = useState(false)
  const [fifthApiStep, setFifthStep] = useState(false)

  const [secondLocalStep, setSecondLocalStep] = useState(false)

  const [isSubmitFixedStateFilter, setIsSubmitFixedStateFilter] = useState(false)



  // API
  // ЗАГРУЖЕННЫЕ КАРТОЧКИ С API
  const [moviesFromApi, setMoviesFromApi] = useState([]); // /movies

  // ОТФИЛЬТРОВАННЫЕ (ПЕРЕНОС НАЙДЕННЫХ КАРТОЧЕК ИЗ moviesFromApi)
  const [filterAfterSearchShortFromApi, setFilterAfterSearchShortFromApi] = useState([]);  //movies

  // НАЙДЕННЫЕ ВО ВРЕМЯ ПОИСКА (ПЕРЕНОС НАЙДЕННЫХ КАРТОЧЕК ИЗ moviesFromApi)
  const [foundMoviesAfterSearchApi, setFoundMoviesAfterSearchApi] = useState([]);  //movies

  // ДЛЯ КНОПКИ "ЕЩЁ"
  const [moviesBoxForMore, setMoviesBoxForMore] = useState([]);

  // ФЛАГ - ТЕКУЩИЙ ПОИСК ПО ЗНАЧЕНИЮ ПРОИСХОДИТ ПО ФИЛЬМАМ ОТ API
  const [currentSearchMoviesFromApi, setCurrentSearchMoviesFromApi] = useState(true)

  const [timerFilterShortMovies, setTimerFilterShortMovies] = useState(false); // ТАЙМЕР НА КНОПКУ ФИЛЬТРА ФИЛЬМА



  // ЛОКАЛЬНЫЕ
  // ЗАГРУЖЕННЫЕ КАРТОЧКИ В ХРАНИЛИЩЕ
  const [moviesFromLocal, setMoviesFromLocal] = useState([]); // /saved-movies

  // ОТФИЛЬТРОВАННЫЕ ЛОКАЛЬНЫЕ
  const [filterSearchShortFromLocal, setFilterSearchShortFromLocal] = useState([]); // ОТФИЛЬТРОВАННЫЕ - /saved-movies

  // ПОИСК В ЛОКАЛЬНЫХ ФИЛЬМАХ
  const [localMoviesAfterSearch, setLocalMoviesAfterSearch] = useState([]); //ПОСЛЕ ПОИСКА НЕОТФИЛЬТРОВАННЫЕ - /saved-movies

  const [localMoviesBoxForShow, setLocalMoviesBoxForShow] = useState([]);

  // ФЛАГ - ТЕКУЩИЙ ПОИСК ПО ЗНАЧЕНИЮ ПРОИСХОДИТ ПО ЛОКАЛЬНЫМ ФИЛЬМАМ - /saved-movies
  const [currentSearchInLocalSavedMovies, setCurrentSearchInLocalSavedMovies] = useState(false)

  // СИГНАЛ, ЧТО НУЖНО ПОКАЗАТЬ СРАЗУ ВСЕ СОХРАНЁННЫЕ КАРТОЧКИ (БЕЗ ОТБОРКИ)
  const [showAllSavedCards, setShowAllSavedCards] = useState(false)

  const [valueInputSearchForm, setValueInputSearchForm] = useState(''); // ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА ФОРМЫ ПОИСКА ФИЛЬМА

  // ОБЩЕЕ
  const [parametersForShowCards, setParametersForShowCards] = useState({
    movies: [],
    quantity: '',
  })

  const [popup, setPopup] = useState({});

  const [isLoadedSavedMovies, setIsLoadedSavedMovies] = useState(false); // ЗАГРУЗИЛИСЬ СОХРАНЁННЫЕ КАРТОЧКИ В ХРАНИЛИЩЕ

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const pathesPages = {
    mainUrl: pathName === '/',
    moviesUrl: pathName === '/movies',
    savedMoviesUrl: pathName === '/saved-movies',
    profileUrl: pathName === '/profile',
  }


  function handleIsReloadedPageActive() {
    return setIsReloadedPage(true)
  }


  function handleIsReloadedPageNotActive() {
    return setIsReloadedPage(false)
  }


  // ПЕРЕНАПРАВЛЕНИЕ НА ГЛАВНУЮ
  function goToMainPage() {
    return history.push('/')
  }


  // ПЕРЕНАПРАВЛЕНИЕ НА /movies
  function handleRedirectMovies() {
    history.push('/movies')
  }


  // ТРЭКЕР ОБНОВЛЕНИЯ СТРАНИЦЫ
  useEffect(() => {
    if (!getAfterRegBeforeFirstSubmitStorage) {
      if (document.readyState === 'complete') {
        handleIsReloadedPageActive()
        return localStorage.setItem('reloadedPage', stringifyJSON(true))
      }
    }
  }, [])


  // ПЕРВОЕ ПОСЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ (signin) - НЕАКТИВНО
  function handleSetFirstLoggingUserNotActive() {
    setFirstLoggingUser(false)
  }


  // ВКЛЮЧИЛИ ТАЙМЕР НА КНОПКУ ФИЛЬТРА ФИЛЬМА
  function handleSetTimerFilterShortMoviesActive() {
    setTimerFilterShortMovies(true)
  }


  useEffect(() => {
    if (parseJSON(localStorage.getItem('dataUser'))) {
      return handleIsLoggedIn();
    }
  }, [])


  // ПОЛУЧЕНИЕ ФИЛЬМОВ С ЛАЙКОМ
  function getSavedMovies() {

    mainApi.getSavedMovies()
      .then((movies) => {
        // handleLocalSavedMovies(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        return setIsLoadedSavedMovies(true) // СООБЩАЕМ, ЧТО КАРТОЧКИ ЗАГРУЖЕНЫ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
      })
      .catch((err) => {
        console.log(err)
        return handleOpenPopup({ active: true, message: errorMessage[500] })
      })
  }


  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signup
  function handleIsRegLink() {
    setIsRegLink(true)
    setIsMainLink(false)
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
    setIsMainLink(false)
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
    setIsMainLink(false)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }


  // ОБРАБОТЧИК СТЭЙТА КЛИКА НА ЛОГО САЙТА (главная страница)
  function handleClickByLogo() {
    setIsMainLink(true)
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
    setIsFilterShortMovies(false)
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
    setCurrentSearchInLocalSavedMovies(false)
    // handleIsReloadedPageActive()
    setIsFilterShortMovies(false)
    setCurrentSearchMoviesFromApi(false)
  }


  // ПРЕЛОАДЕР АКТИВЕН
  function handleSetPreloaderActive() {
    setIsPreloaderActive(true);
  }


  // ПРЕЛОАДЕР НЕАКТИВЕН
  function handleSetPreloaderNotActive() {
    setIsPreloaderActive(false);
  }


  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМА - АКТИВНО
  function handleSetSubmitSearchFormActive() {
    setIsPressedSubmitSearchForm(true)
  }


  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМА - НЕАКТИВНО
  function handleSubmitSearchFormNotActive() {
    setIsPressedSubmitSearchForm(false);
  }


  // ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН
  function handleIsLoggedIn() {
    setIsLoggedIn(true);
  }


  // ПОЛЬЗОВАТЕЛЬ НЕЗАЛОГИНЕН
  function handleIsNotLoggedIn() {
    setIsLoggedIn(false);
  }


  // ОБРАБОТЧИК ОТКРЫТИЯ ОКНА ОШИБКИ
  function handleOpenPopup(data) {

    return setPopup(data);
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


  // ЗАФИКСИРОВАН ЛИ СТЭЙТ ФИЛЬТРА САБМИТОМ
  function handleSubmitFixedStateFilter() {

    if (isFilterShortMovies) { // СМОТРИМ НА ПОСЛЕДНЕЕ ИЗМЕНЕНИЕ СТАТУСА ЧЕКБОКСА
      setIsSubmitFixedStateFilter(true)
      return
    }
    setIsSubmitFixedStateFilter(false)
  }


  // ЗНАЧЕНИЕ ПОЛЯ ФОРМЫ ПОИСКА ФИЛЬМА
  function handleValueInputSearchForm(valueInput) {
    setValueInputSearchForm(valueInput.toLowerCase());
  }


  // ПЕРЕЗАГРУЗКА СТРАНИЦЫ
  // ЕСЛИ ОТКРЫТА СТРАНИЦА /saved-movies И ЗАПИСАНЫ КАРТОЧКИ В ХРАНИЛИЩЕ
  useEffect(() => {

    if (pathesPages.savedMoviesUrl) {
      const cardMovies = parseJSON(localStorage.getItem('savedMovies'))

      if (cardMovies.length >= 1) {
        handleIsReloadedPageNotActive()
        return setMoviesFromLocal(cardMovies)
      }
    }
  }, [isSavedMoviesLink])


  // ПЕРЕЗАГРУЗКА СТРАНИЦЫ
  // ЕСЛИ ОТКРЫТА СТРАНИЦА /movies И УЖЕ ЕСТЬ СОХРАНЁННЫЕ ФИЛЬМЫ В ХРАНИЛИЩЕ
  useEffect(() => {
    if (pathesPages.moviesUrl) {

      const apiMoviesFromStorage = getMoviesFromStorage();

      // ЕСЛИ НЕТ В ХРАНИЛИЩЕ "firstLogAfterReg", ТО ЗНАЧИТ ЧТО ПЕРВЫЙ ПОИСК ФИЛЬМОВ, ПОСЛЕ РЕГИСТРАЦИИ БЫЛ ПРОИЗВЕДЁН
      if (!parseJSON(localStorage.getItem('firstLogAfterReg'))) {
        handleSetFirstLoggingUserNotActive();
        return;
      }

      if (!apiMoviesFromStorage) {
        moviesApi.getMovies()
          .then((data) => {
            localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
            setMoviesFromApi(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ ИЗ API
          })
          .catch((err) => {
            console.log(err)
            return handleOpenPopup({ active: true, message: errorMessage[500] });
          })
      }
    }
  }, [isReloadedPage])

  const [isFilterShortMoviesDisabled, setIsFilterShortMoviesDisabled] = useState(false)

  // ЧЕКБОКС "КОРОТКОМЕТРАЖКИ" - ВКЛЮЧЕНО/ВЫКЛЮЧЕНО
  function handleSetIsFilterShortMovies(e) {
    const isAfterRegBeforeFirstSubmit = getAfterRegBeforeFirstSubmitStorage();
    const savedMoviesStorage = getSavedMoviesStorage();
    if (!isAfterRegBeforeFirstSubmit && savedMoviesStorage) { // БЫЛ ЛИ ПЕРВЫЙ САБМИТ, ПОСЛЕ РЕГИСТРАЦИИ?
      if (!timerFilterShortMovies) {
        setIsFilterShortMoviesDisabled(true)
        handleSetTimerFilterShortMoviesActive() // ВКЛЮЧИЛИ ТАЙМЕР
        setTimeout(setTimerFilterShortMovies, 500, false);

        const status = e.target.checked;
        setIsFilterShortMovies(status)
        handleSetSubmitSearchFormActive()
      }
    }
  }



  // 1.1
  // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ИЗ API - /movies
  function handleGetMovies() {
    moviesApi.getMovies()
      .then((data) => {
        setMoviesFromApi(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ ИЗ API
        localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        setFirstApiStep(true)
      })
      .catch((err) => {
        console.log(err)
        return handleOpenPopup({ active: true, message: errorMessage[500] });
      })
  }



  // 2.2
  // ПОИСК ФИЛЬМОВ ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ - /movies
  function handleSearchMoviesApiByValue() {

    let movies = moviesFromApi

    if (window.performance.navigation.type === 1) {
      movies = parseJSON(localStorage.getItem('movies'));
      setWindowBrowserClosed({ closed: false, againOpened: false })
    }

    movies.forEach((movie) => {
      const valueFromInputSearch = movie.nameRU.trim().toLowerCase().includes(windowBrowserClosed.againOpened ? '' : valueInputSearchForm);
      const { duration } = movie;

      if (valueFromInputSearch) { // ЕСЛИ ЗНАЧЕНИЕ ПОЛЯ СОВПАДАЕТ С НАЗВАНИЕМ ФИЛЬМА ИЗ ВСЕГО СПИСКА
        if (duration <= 40 && isSubmitFixedStateFilter) { // ЕСЛИ КОРОТКОМЕТРАЖКА И ФИЛЬТР ВКЛЮЧЁН

          setFilterAfterSearchShortFromApi((prevMovies) => { return [...prevMovies, movie] })
        }
        setFoundMoviesAfterSearchApi((prevMovies) => { return [...prevMovies, movie] }) // ЗАПИСЫВАЕМ ФИЛЬМ В МАССИВ НАЙДЕННЫХ ФИЛЬМОВ
      }
    })
    setSecondApiStep(true)
  }



  // 2.2
  // ПОИСК ФИЛЬМОВ ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ - /saved-movies
  function handleSearchInLocalSavedMoviesByValue() {

    moviesFromLocal.forEach((movie) => {
      const valueFromInputSearch = movie.nameRU.trim().toLowerCase().includes(valueInputSearchForm);
      const { duration } = movie;
      if (valueFromInputSearch) { // ЕСЛИ ЗНАЧЕНИЕ ПОЛЯ СОВПАДАЕТ С НАЗВАНИЕМ ФИЛЬМА ИЗ ВСЕГО СПИСКА
        if (duration <= 40 && isFilterShortMovies) { // ЕСЛИ КОРОТКОМЕТРАЖКА И ФИЛЬТР ВКЛЮЧЁН
          setFilterSearchShortFromLocal((prevMovies) => { return [...prevMovies, movie] })
        }
        setLocalMoviesAfterSearch((prevMovies) => { return [...prevMovies, movie] }) // ЗАПИСЫВАЕМ ФИЛЬМ В МАССИВ НАЙДЕННЫХ ФИЛЬМОВ
      }
    })
    setSecondLocalStep(true)
  }

  const [canMakeRequestToServer, setCanMakeRequestToServer] = useState(null);



  // ПРОВЕРКА ПРОЙДЕННОГО ВРЕМЕНИ МЕЖДУ ЗАПРОСАМИ К СЕРВЕРУ ЗА ФИЛЬМАМИ
  function checkTimeBetweenRequests() {
    // КЛЮЧ:
    // ЗАФИКСИРОВАННОЕ ВРЕМЯ ПРИ ПЕРВОМ ОБРАЩЕНИИ К СЕРВЕРУ ЗА ФИЛЬМАМИ + 3600000 МС (1 ЧАС)
    // ТО ВРЕМЯ, ПО ИСТЕЧЕНИИ КОТОРОГО, БУДЕТ ПРОИЗВЕДЁН ЗАПРОС К СЕРВЕРУ ПРИ ОЧЕРЕДНОМ САБМИТЕ
    const timeStorage = parseJSON(localStorage.getItem('timeBetweenRequests'))

    if (timeStorage) { // ЕСЛИ КЛЮЧ ЕСТЬ
      const currentTime = Date.now();

      const checkTime = timeStorage - currentTime;

      if (checkTime > 0) { // ЕСЛИ ОСТАЛОСЬ КАКОЕ-ТО ВРЕМЯ, ТОГДА ЗАПРОС К ФИЛЬМАМ БУДЕТ ПРОИСХОДИТЬ В ХРАНИЛИЩЕ

        const moviesSto = parseJSON(localStorage.getItem('movies'))

        setMoviesFromApi(moviesSto)
        setIsLoadedSavedMovies(true) // СООБЩАЕМ, ЧТО КАРТОЧКИ ЗАГРУЖЕНЫ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        setCanMakeRequestToServer(false)       
        return;
      }
      if (checkTime <= 0) { // ЕСЛИ ВРЕМЯ ПРОШЛО        
        setTimeBetweenRequestsStorage(true) // МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС
        return localStorage.setItem('timeBetweenRequests', stringifyJSON(Date.now() + 600000)) // 10 МИНУТ
      }
    }

    if (!timeStorage) { // ЕСЛИ КЛЮЧА НЕТ
      localStorage.setItem('timeBetweenRequests', stringifyJSON(Date.now() + 600000)) // 10 МИНУТ
      setTimeBetweenRequestsStorage(true) // МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС
    }
  }



  // 1
  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМОВ - НАЧАЛО
  useEffect(() => {

    if (isPressedSubmitSearchForm) {

      if (isMoviesLink && getAfterRegBeforeFirstSubmitStorage()) { // ЕСЛИ ПОСЛЕ РЕГИСТРАЦИИ - ЭТО ПЕРВЫЙ САБМИТ
        localStorage.removeItem('afterRegBeforeFirstSubmit') // ТОГДА УДАЛЯЕМ
      }

      handleIsReloadedPageActive()
      setFifthStep(false)
      setShowAllSavedCards(false);
      handleSubmitFixedStateFilter() // ПРОВЕРЯЕМ СТАТУС ЧЕКБОКСА - БЕРЁМ ЕГО В РАБОТУ ИЛИ НЕТ
      setMoviesBoxForMore([]);
      setFoundMoviesAfterSearchApi([]);
      setFilterAfterSearchShortFromApi([]);
      handleSetIsFirstCoundCardsActive();
      setCanMakeRequestToServer(null)
      setTimeBetweenRequestsStorage(false) // ДЕФОЛТИМ ВРЕМЯ ОБРАЩЕНИЯ К СЕРВЕРУ
      setIsMoviesNotFound(false) // УБИРАЕМ НАДПИСЬ - "НИЧЕГО НЕ НАЙДЕНО"
      setCurrentSearchMoviesFromApi(false) // СИГНАЛ, ЧТО ПОИСК ОТ API
      setCurrentSearchInLocalSavedMovies(false) // СИГНАЛ, ЧТО ПОИСК ЛОКАЛЬНЫЙ
      handleSetPreloaderActive() // + ВКЛЮЧАЕМ ПРЕЛОАДЕР

      if (pathesPages.savedMoviesUrl) { // ЕСЛИ ОТКРЫТА СТРАНИЦА - /saved-movies
        setParametersForShowCards({
          movies: [],
          quantity: '',
        })
        setLocalMoviesAfterSearch([]) // ОЧИЩАЕМ ЛОКАЛЬНЫЙ МАССИВ ПОСЛЕ ПОИСКА
        setLocalMoviesBoxForShow([]) // ОЧИЩАЕМ ЛОКАЛЬНЫЙ МАССИВ ПОСЛЕ ПОИСКА
        setFilterSearchShortFromLocal([]) // ОЧИЩАЕМ ЛОКАЛЬНЫЙ ОТФИЛЬТРОВАННЫЙ МАССИВ
        setCurrentSearchInLocalSavedMovies(true) // СООБЩАЕМ, ЧТО БУДЕТ ПОИСК ПО СОХРАНЁННЫМ КАРТОЧКАМ
        setShowAllSavedCards(true); // ДАЁМ СИГНАЛ, ЧТО ПОКАЗЫВАТЬ НУЖНО СРАЗУ ВСЕ КАРТОЧКИ
        handleSearchInLocalSavedMoviesByValue()
        return;
      }

      // ДЕЛАЕМ ЗАПРОС К API НА СКАЧИВАНИЕ ФИЛЬМОВ
      setCurrentSearchMoviesFromApi(true) // СООБЩАЕМ, ЧТО БУДЕТ ПРОИСХОДИТЬ ПОИСК ПО КАРТОЧКАМ ОТ API

      if (windowBrowserClosed.againOpened) {
        setFirstApiStep(true)
        return
      }

      checkTimeBetweenRequests() // ПРОВЕРКА ПРОЙДЕННОГО ВРЕМЕНИ МЕЖДУ ЗАПРОСАМИ К СЕРВЕРУ ЗА ФИЛЬМАМИ
      setNullApiStep(true)

      return
    }
  }, [isPressedSubmitSearchForm]) // ОТСЛЕЖИВАЕМ НАЖАТИЕ САБМИТА ПОИСКА ФИЛЬМОВ



  // ЕСЛИ ШАГ 1 ЗАВЕРШЁН
  useEffect(() => {

    if (nullApiStep) {
      if (timeBetweenRequestsStorage) { // ЕСЛИ МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС К СЕРВЕРУ       
        setNullApiStep(false)
        return handleGetMovies() // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ИЗ API - /movies
      }

      setNullApiStep(false)
      setFirstApiStep(true)
      return
    }
  }, [nullApiStep])



  // 2
  // ПОИСК КАРТОЧЕК ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ
  useEffect(() => { // ЕСЛИ ИЩЕМ В СОХРАНЁННЫХ КАРТОЧКАХ ИЛИ ПОЛУЧИЛИ ФИЛЬМЫ ОТ API ИЛИ В ХРАНИЛИЩЕ

    if ((firstApiStep || secondLocalStep) && (moviesFromApi || moviesFromLocal || canMakeRequestToServer)) {
      setFirstApiStep(false)
      setIsLoadedSavedMovies(true)

      // ЕСЛИ ПОИСК В ЛОКАЛЬНЫХ ФИЛЬМАХ   
      handleSubmitSearchFormNotActive(); // ДЕФОЛТИМ САБМИТ ПОИСКА ФИЛЬМОВ
      handleSetPreloaderNotActive(); // ВЫКЛЮЧАЕМ ПРЕЛОАДЕР
      handleSearchMoviesApiByValue() // 2 ШАГ - ПОИСК КАРТОЧЕК ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ ВВОДА - ОБЩЕЕ
    }
  }, [firstApiStep, moviesFromApi, moviesFromLocal, secondLocalStep, canMakeRequestToServer])



  // 3
  // ЗДЕСЬ ОПРЕДЕЛЯЕМ ЧТО ПОКАЗЫВАТЬ - "НИЧЕГО НЕ НАШЛИ" ИЛИ "НАЙДЕННЫЕ КАРТОЧКИ"
  useEffect(() => {

    if ((secondApiStep || secondLocalStep) && (currentSearchMoviesFromApi || currentSearchInLocalSavedMovies)) {

      setSecondApiStep(false)
      setSecondLocalStep(false)

      if (firstLoggingUser) {
        setFirstLoggingUser(false);
        return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
      }

      if (currentSearchMoviesFromApi) {

        if (filterAfterSearchShortFromApi.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (filterAfterSearchShortFromApi.length === 0 && isSubmitFixedStateFilter) {
          return setIsMoviesNotFound(true) // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }


        // ОТ API
        if (moviesFromApi.length === 0 && foundMoviesAfterSearchApi.length >= 1) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (moviesFromApi.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (foundMoviesAfterSearchApi.length === 0 && currentSearchMoviesFromApi /* && isPressedSubmit */) {
          return setIsMoviesNotFound(true) // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromApi.length >= 1 && currentSearchMoviesFromApi) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }
      }


      // ЛОКАЛЬНЫЕ
      if (currentSearchInLocalSavedMovies) {

        if (localMoviesAfterSearch.length >= 1 && !isSubmitFixedStateFilter) {
          return handleCountCards();// ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (filterSearchShortFromLocal.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards();// ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (filterSearchShortFromLocal.length === 0 && isSubmitFixedStateFilter) {
          return setIsMoviesNotFound(true) // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length === 0 && !isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (localMoviesAfterSearch.length === 0 && !isSubmitFixedStateFilter) {
          return setIsMoviesNotFound(true) // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length === 0) {
          return setIsMoviesNotFound(true) // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards();// ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (moviesFromLocal.length >= 1 && currentSearchInLocalSavedMovies) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }
      }
    }

  }, [secondApiStep,
    secondLocalStep,
    moviesFromLocal,
    filterAfterSearchShortFromApi,
    foundMoviesAfterSearchApi,
    localMoviesAfterSearch, firstLoggingUser
  ])



  // 4
  // ПРОВЕРКА ПАРАМЕТРОВ И РАБОТА ОТБОРА КАРТОЧЕК КНОПКОЙ "ЕЩЁ"
  function handleCountCards() {
    let movies = null;

    if (isReloadedPage && pathesPages.moviesUrl) {
      movies = [];
    }

    // ЕСЛИ НАЖАТ ФИЛЬТР И  ФИЛЬМЫ ОТ API
    if (isSubmitFixedStateFilter && currentSearchMoviesFromApi) {
      movies = filterAfterSearchShortFromApi;
    }

    if (!isSubmitFixedStateFilter && currentSearchMoviesFromApi) { // ИНАЧЕ, НЕФИЛЬТРОВАННЫЕ ОТ API
      movies = foundMoviesAfterSearchApi;
    }

    // ЕСЛИ НАЖАТ ФИЛЬТР И ЛОКАЛЬНЫЕ ФИЛЬМЫ
    if (isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
      movies = filterSearchShortFromLocal;
    }

    if (!isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
      movies = localMoviesAfterSearch;
    }

    const currentWidthWindow = getWidthWindowBrowser(); // ТЕКУЩАЯ ШИРИНА ОКНА БРАУЗЕРА
    let parametersWindow = null; // СБРОС ПАРАМЕТРОВ ОКНА БРАУЗЕРА
    let quantity = null; // СБРОС КОЛИЧЕСТВА НУЖНЫХ КАРТОЧЕК (ОПРЕДЕЛЯЕТСЯ ОТНОСИТЕЛЬ ШИРИНЫ ОКНА БРАУЗЕРА)


    // КАКОЙ ПО СЧЁТУ ОТБОР - ПЕРВИЧНЫЙ ИЛИ ВТОРИЧНЫЙ
    if (isFirstCountCards || windowBrowserClosed.againOpened) {

      parametersWindow = widthWindowForFirstCount // ПЕРВИЧНЫЙ ОТБОР (ОТОБРАЗИТСЯ СРАЗУ 12/8/5)
      handleSetIsFirstCoundCardsNotActive() // СООБЩАЕМ, ЧТО ПЕРВИЧНЫЙ ОТБОР ПРОШЁЛ
    } else {
      parametersWindow = widthWindowForSecondaryCounts // ВТОРИЧНЫЙ ОТБОР (БУДЕТ ОТОБРАЖАТЬСЯ ПРИ НАЖАТИИ НА КНОПКУ "ЕЩЁ" 3/2/1)
    }

    // ПРОВЕРКА ШИРИНЫ ОКНА
    if (!showAllSavedCards) {

      if (currentWidthWindow >= parametersWindow.big.from) { // 1280 или 1210
        quantity = parametersWindow.big.quantity; // 12 или 3
      }

      if (currentWidthWindow >= parametersWindow.middle.from && currentWidthWindow < parametersWindow.middle.to) { // 768-1280 или 751-1210
        quantity = parametersWindow.middle.quantity; // 8 или 2
      }

      if (currentWidthWindow >= parametersWindow.low.from && currentWidthWindow <= parametersWindow.low.to) { // 320-480 или 320-750
        quantity = parametersWindow.low.quantity; // 5 или 1
      }

    } else {
      quantity = 100;
    };

    setParametersForShowCards({
      movies: movies,
      quantity: quantity,
    })
  }



  // ЕСЛИ ЗАВЕРШЁН 4 ШАГ, ТО ВКЛЮЧАЕМ ОБРАБОТЧИК ОТОБРАННЫХ КАРТОЧЕК
  useEffect(() => {
    if (parametersForShowCards) {
      return handleSelectedCards()
    }
  }, [parametersForShowCards])



  // РАБОТА КНПОКИ "ЕЩЁ" - ОТОБРАЖЕНИЕ ОТОБРАННЫХ КАРТОЧЕК
  function handleSelectedCards() {
    const { movies, quantity } = parametersForShowCards;
    const pickedAnyCards = movies.splice(0, quantity);

    let currentNumberCards = [];

    pickedAnyCards.forEach((card) => {
      currentNumberCards.push(card);
    })

    // ЛОКАЛЬНЫЕ
    // ЕСЛИ ТЕКУЩИЙ ПОИСК ЛОКАЛЬНЫЙ И НЕТ ФИЛЬТРА, ТО
    if (currentSearchInLocalSavedMovies && !isSubmitFixedStateFilter) {
      setLocalMoviesBoxForShow(() => { return [...currentNumberCards] })
      return setFifthStep(true);
    }
    if (currentSearchInLocalSavedMovies && isSubmitFixedStateFilter) {
      return setFilterSearchShortFromLocal(() => { return [...currentNumberCards] })
    }

    // API
    // ЕСЛИ ТЕКУЩИЙ ПОИСК ОТ API И НЕТ ФИЛЬТРА, ТО
    if (currentSearchMoviesFromApi && !isSubmitFixedStateFilter) {
      return setMoviesBoxForMore((prevCards) => { return [...prevCards, ...currentNumberCards] })
    }

    if (currentSearchMoviesFromApi && isSubmitFixedStateFilter) {
      return setFilterAfterSearchShortFromApi((prevCards) => { return [...prevCards, ...currentNumberCards] })
    }

    return setFifthStep(true) // ШАГ 5 - НАЧАТ
  };



  // ВАЛИДАТОР ФОРМ
  const validatorEmail = require('email-validator'); // ВАЛИДАТОР EMAIL
  const [values, setValues] = useState(currentUser); // ДЛЯ ОБРАБОТЧИКА ОШИБОК
  const [errors, setErrors] = useState({}); // ДЛЯ ОБРАБОТЧИКА ОШИБОК
  const [isValid, setIsValid] = useState(false); // ДЛЯ ОБРАБОТЧИКА ОШИБОК
  const [clickAtInput, setClickAtInput] = useState(false) // ЭЛЕМЕНТ ТЕКСТА ОШИБКИ ФОРМЫ


  // ВВОД ТЕКСТА В ПОЛЕ ФОРМЫ ПРИВОДИТ В АКТИВНОЕ СОСТОЯНИЕ ЭЛЕМЕНТ ТЕКСТА ОШИБКИ
  function handleClickAtInputActive() {
    return setClickAtInput(true)
  }


  // ВВОД ТЕКСТА В ПОЛЕ ФОРМЫ ПРИВОДИТ В НЕАКТИВНОЕ СОСТОЯНИЕ ЭЛЕМЕНТ ТЕКСТА ОШИБКИ
  function handleClickAtInputNotActive() {
    return setClickAtInput(false)
  }


  // ОБРАБОТЧИК ОШИБОК
  function handleChangeInputs(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (target) {
      handleClickAtInputNotActive(); // ВВОД ТЕКСТА В ПОЛЕ ВВОДА УБИРАЕТ ОШИБКУ-ПОДСКАЗКУ
      setIsSubmitProfileDisabled(false); // СБРОС disabled С САБМИТА
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });


    if (name === 'email') {
      return validatorEmail.validate(value) ? setIsValid(true) : setIsValid(false);
    }
    setIsValid(target.closest("form").checkValidity());
  };



  function getErrorMessageForm() {
    return errors;
  }


  function getValueInput() {
    return values;
  }


  // ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ВАЛИДНОСТИ/НЕВАЛИДНОСТИ ПОЛЯ ВВОДА
  function getIsValidInput() {

    // ЕСЛИ ОТКРЫТА СТРАНИЦА /profile
    if (pathesPages.profileUrl) {
      if ((values.name === undefined || values.name === null) ||
        (currentUser.name === values.name && currentUser.email === values.email) || isSubmitProfileDisabled) {
        return;
      }
    }
    return isValid;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ValidationContext.Provider value={{
        handleChange: handleChangeInputs,
        errors: getErrorMessageForm,
        values: getValueInput,
        isValid: getIsValidInput,
        clickAtInput: clickAtInput,
        handleClickAtInputActive: handleClickAtInputActive,
        handleClickAtInputNotActive: handleClickAtInputNotActive,
      }}>
        <div className="page">
          <div className="page__box">

            <Header
              pathesPages={pathesPages}
              pathName={pathName}
              isRegLink={isRegLink}
              isLogLink={isLogLink}
              isProfileLink={isProfileLink}
              isMoviesLink={isMoviesLink}
              isSavedMoviesLink={isSavedMoviesLink}
              isMainLink={isMainLink}
              isPageNotFound={isPageNotFound}
              handleIsProfileMenu={handleIsProfileMenu}
              goToMainPage={goToMainPage}
              isLoggedIn={isLoggedIn}
            />

            <Switch>

              <Route exact path="/">
                <Main handleClickByLogo={handleClickByLogo} />
              </Route>

              <Route path="/signup">
                {!isLoggedIn ?
                  <SignUp
                    isMainLink={isMainLink}
                    isLogLink={isLogLink}
                    handleIsLoggedIn={handleIsLoggedIn}
                    handleIsRegLink={handleIsRegLink}
                    handleRedirectMovies={handleRedirectMovies}
                    setCurrentUser={setCurrentUser}
                    setActiveAfterRegBeforeFirstSubmitStorage={setActiveAfterRegBeforeFirstSubmitStorage}
                    setActiveAuthAfterLogoutStorage={setActiveAuthAfterLogoutStorage}
                    setActiveUserLoggedStorage={setActiveUserLoggedStorage}
                    setEmptyMoviesFromStorage={setEmptyMoviesFromStorage}
                    setEmptySavedMoviesFromStorage={setEmptySavedMoviesFromStorage}
                  />
                  : <Redirect to="/movies" />}
              </Route>

              <Route path="/signin">
                {!isLoggedIn ?
                  <SignIn
                    isMainLink={isMainLink}
                    isRegLink={isRegLink}
                    handleIsLoggedIn={handleIsLoggedIn}
                    handleIsLogLink={handleIsLogLink}
                    stringifyJSON={stringifyJSON}
                    getSavedMovies={getSavedMovies}
                    getMoviesFromStorage={getMoviesFromStorage}
                    getSavedMoviesStorage={getSavedMoviesStorage}
                    setEmptySavedMoviesFromStorage={setEmptySavedMoviesFromStorage}
                    setActiveAuthAfterLogoutStorage={setActiveAuthAfterLogoutStorage}
                    setActiveUserLoggedStorage={setActiveUserLoggedStorage}
                    setActiveReloadedPageStorage={setActiveReloadedPageStorage}
                    setCurrentUser={setCurrentUser}
                  />
                  : <Redirect to="/movies" />}
              </Route>

              <ProtectedRoute path='/movies' isLoggedIn={isLoggedIn}>
                <Movies
                  isSavedMoviesLink={isSavedMoviesLink}
                  isLoggedIn={isLoggedIn}
                  isMoviesLink={isMoviesLink}
                  isProfileMenu={isProfileMenu}
                  isPreloaderActive={isPreloaderActive}
                  isMoviesNotFound={isMoviesNotFound}
                  isFilterShortMovies={isFilterShortMovies}
                  isLoadedSavedMovies={isLoadedSavedMovies}
                  moviesFromApi={moviesFromApi}
                  // handleLocalSavedMovies={handleLocalSavedMovies}
                  getSavedMovies={getSavedMovies}
                  setIsLoadedSavedMovies={setIsLoadedSavedMovies}
                  fifthApiStep={fifthApiStep}
                  moviesBoxForMore={moviesBoxForMore}
                  isReloadedPage={isReloadedPage}
                  isSubmitFixedStateFilter={isSubmitFixedStateFilter}
                  currentSearchMoviesFromApi={currentSearchMoviesFromApi}
                  filterAfterSearchShortFromApi={filterAfterSearchShortFromApi}
                  foundMoviesAfterSearchApi={foundMoviesAfterSearchApi}
                  isPressedSubmitSearchForm={isPressedSubmitSearchForm}
                  windowBrowserClosed={windowBrowserClosed}
                  handleOpenPopup={handleOpenPopup}
                  handleCountCards={handleCountCards}
                  handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
                  handleValueInputSearchForm={handleValueInputSearchForm}
                  handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
                  handleIsMoviesLink={handleIsMoviesLink}
                  handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
                  handleSetValueInputSearchForm={handleButtonCloseMenuProfile}
                  handleShowResultSearchMovies={handleButtonCloseMenuProfile}
                  setActiveAfterRegBeforeFirstSubmitStorage={setActiveAfterRegBeforeFirstSubmitStorage}
                  handleIsReloadedPageActive={handleIsReloadedPageActive}
                  setIsLikeRemoved={setIsLikeRemoved}
                  timerFilterShortMovies={timerFilterShortMovies}
                  isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
                  setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
                />
              </ProtectedRoute>

              <ProtectedRoute path='/profile' isLoggedIn={isLoggedIn}>
                <Profile
                  isProfileLink={isProfileLink}
                  isProfileMenu={isProfileMenu}
                  isMoviesLink={isMoviesLink}
                  isSavedMoviesLink={isSavedMoviesLink}
                  handleOpenPopup={handleOpenPopup}
                  handleIsNotLoggedIn={handleIsNotLoggedIn}
                  handleIsProfileLink={handleIsProfileLink}
                  handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
                  goToMainPage={goToMainPage}
                  setShowAllSavedCards={setShowAllSavedCards}
                  setMoviesBoxForMore={setMoviesBoxForMore}
                  setFoundMoviesAfterSearchApi={setFoundMoviesAfterSearchApi}
                  setMoviesFromApi={setMoviesFromApi}
                  setFilterAfterSearchShortFromApi={setFilterAfterSearchShortFromApi}
                  setIsMoviesNotFound={setIsMoviesNotFound}
                  setCurrentSearchMoviesFromApi={setCurrentSearchMoviesFromApi}
                  setCurrentSearchInLocalSavedMovies={setCurrentSearchInLocalSavedMovies}
                  setIsSubmitProfileDisabled={setIsSubmitProfileDisabled}
                  setCurrentUser={setCurrentUser}
                />
              </ProtectedRoute>

              <ProtectedRoute path='/saved-movies' isLoggedIn={isLoggedIn}>
                <SavedMovies
                  moviesFromLocal={moviesFromLocal}
                  isFilterShortMovies={isFilterShortMovies}
                  handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
                  handleValueInputSearchForm={handleValueInputSearchForm}
                  handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
                  filterSearchShortFromLocal={filterSearchShortFromLocal}
                  currentSearchInLocalSavedMovies={currentSearchInLocalSavedMovies}
                  isSubmitFixedStateFilter={isSubmitFixedStateFilter}
                  isPreloaderActive={isPreloaderActive}
                  isMoviesNotFound={isMoviesNotFound}
                  isSavedMoviesLink={isSavedMoviesLink}
                  isProfileMenu={isProfileMenu}
                  localMoviesBoxForShow={localMoviesBoxForShow}
                  getSavedMovies={getSavedMovies}
                  handleOpenPopup={handleOpenPopup}
                  handleIsSavedMoviesLink={handleIsSavedMoviesLink}
                  handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
                  setFilterSearchShortFromLocal={setFilterSearchShortFromLocal}
                  setMoviesFromLocal={setMoviesFromLocal}
                  isLikeRemoved={isLikeRemoved}
                  setIsLikeRemoved={setIsLikeRemoved}
                  setLocalMoviesAfterSearch={setLocalMoviesAfterSearch}
                  valueInputSearchForm={valueInputSearchForm}
                  timerFilterShortMovies={timerFilterShortMovies}
                  isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
                  setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
                  setLocalMoviesBoxForShow={setLocalMoviesBoxForShow}
                />
              </ProtectedRoute>

              <Route>
                <PageNotFound handlePageNotFoundOpened={handlePageNotFoundOpened} />
              </Route>

            </Switch>

            <Footer
              isPageNotFound={isPageNotFound}
              isProfileLink={isProfileLink}
            />

            <Error
              popup={popup}
              handleOpenPopup={handleOpenPopup}
            />

          </div>
        </div>

      </ValidationContext.Provider>
    </CurrentUserContext.Provider>
  )
};

export default App;
