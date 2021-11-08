import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { ValidationContext } from '../context/ValidationContext';
import { parseJSON, stringifyJSON } from '../../utils/helpers/jsonHandler';
import {
  RegexName,
  RegexEmail,
  DurationMovie,
  QuantitySavedMovies,
  ErrorMessage,
  WidthWindowForFirstCount,
  WidthWindowForSecondaryCounts,
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

  const [isMainLink, setIsMainLink] = useState(false);
  const [isRegLink, setIsRegLink] = useState(false);
  const [isLogLink, setIsLogLink] = useState(false);
  const [isProfileLink, setIsProfileLink] = useState(false);
  const [isMoviesLink, setIsMoviesLink] = useState(false);
  const [isSavedMoviesLink, setIsSavedMoviesLink] = useState(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isFirstCountCards, setIsFirstCountCards] = useState(false); // ПЕРВИЧНЫЙ ЛИ ОТБОР КАРТОЧЕК
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false); // НИ ОДИН ФИЛЬМ ПО ЗАПРОСУ НЕ НАЙДЕН (MoviesCardList) - /movies и /saved-movies
  const [isLikeRemoved, setIsLikeRemoved] = useState(false); //  БЫЛ ЛИ СНЯТ ЛАЙК С КАРТОЧКИ - ФЛАГ ДЛЯ /saved-movies
  const [isFilterShortMovies, setIsFilterShortMovies] = useState(false); // АКТИВИРОВАН ЛИ ФИЛЬТР "КОРОТКОМЕТРАЖКИ"
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  const [currentUser, setCurrentUser] = useState(parseJSON(localStorage.getItem('dataUser'))); // ЗНАЧЕНИЕ ДЛЯ ПРОВАЙДЕРА КОНТЕКСТА
  const [isSubmitProfileDisabled, setIsSubmitProfileDisabled] = useState(false); // disabled САБМИТА, ПОСЛЕ РЕДАКТИРОВАНИЯ
  const [isFilterShortMoviesDisabled, setIsFilterShortMoviesDisabled] = useState(false); // disabled ФИЛЬТРА, ПОСЛЕ НАЖАТИЯ (ЗАДЕРЖКА)
  const [isAuth, setIsAuth] = useState(parseJSON(localStorage.getItem(('isAuth')))); // ПРОШЁЛ ЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗАЦИЮ
  const [isSavedMoviesDownloaded, setIsSavedMoviesDownloaded] = useState(false); // ЗАГРУЗИЛИСЬ ЛИ СОХРАНЁННЫЕ ФИЛЬМЫ, ПОСЛЕ АВТОРИЗАЦИИ
  const [timeBetweenRequestsStorage, setTimeBetweenRequestsStorage] = useState(false); // МОЖНО ЛИ ДЕЛАТЬ НОВЫЙ ЗАПРОС К СЕРВЕРУ ЗА ФИЛЬМАМИ
  const [isPressedSubmitSearchForm, setIsPressedSubmitSearchForm] = useState(false); // НАЖАТА ЛИ КНОПКА САБМИТА ПОИСКА ФИЛЬМОВ
  const [isPreloaderActive, setIsPreloaderActive] = useState(false); // ВКЛЮЧЁН ЛИ ПРЕЛОАДЕР
  const [isReloadedPage, setIsReloadedPage] = useState(false); // ЗАЛОГИНИЛСЯ ЛИ ПОЛЬЗОВАТЕЛЬ, ПОСЛЕ ЛОГАУТА
  const [isSubmitFixedStateFilter, setIsSubmitFixedStateFilter] = useState(false); // ЗАФИКСИРОВАН ЛИ ФИЛЬТР САБМИТОМ
  const [isLoadedSavedMovies, setIsLoadedSavedMovies] = useState(false); // ЗАГРУЗИЛИСЬ ЛИ СОХРАНЁННЫЕ КАРТОЧКИ В ХРАНИЛИЩЕ
  const [timerFilterShortMovies, setTimerFilterShortMovies] = useState(false);   // ТАЙМЕР НА КНОПКУ ФИЛЬТРА ФИЛЬМА
  const [popup, setPopup] = useState({}); // ПОПАП ОШИБОК И УСПЕШНЫХ ДЕЙСТВИЙ
  const [canMakeRequestToServer, setCanMakeRequestToServer] = useState(null); // МОЖНО ЛИ ДЕЛАТЬ ЗАПРОС К СЕРВЕРУ ЗА ФИЛЬМАМИ (ЗАДЕРЖКА)

  /* --------------------------- ПОИСК, API - НАЧАЛО -------------------------- */

  // ЗАГРУЖЕННЫЕ КАРТОЧКИ С API
  const [moviesFromApi, setMoviesFromApi] = useState([]);

  // ОТФИЛЬТРОВАННЫЕ (ПЕРЕНОС НАЙДЕННЫХ КАРТОЧЕК ИЗ moviesFromApi)
  const [filterAfterSearchShortFromApi, setFilterAfterSearchShortFromApi] = useState([]);

  // НАЙДЕННЫЕ ВО ВРЕМЯ ПОИСКА (ПЕРЕНОС НАЙДЕННЫХ КАРТОЧЕК ИЗ moviesFromApi)
  const [foundMoviesAfterSearchApi, setFoundMoviesAfterSearchApi] = useState([]);

  // ДЛЯ КНОПКИ "ЕЩЁ"
  const [moviesBoxForMore, setMoviesBoxForMore] = useState([]);

  // ФЛАГ - ТЕКУЩИЙ ПОИСК ПО ЗНАЧЕНИЮ ПРОИСХОДИТ ПО ФИЛЬМАМ ОТ API
  const [currentSearchMoviesFromApi, setCurrentSearchMoviesFromApi] = useState(true);

  /* --------------------------- ПОИСК, API - КОНЕЦ --------------------------- */



  /* ------------------------ ПОИСК, ЛОКАЛЬНЫЕ - НАЧАЛО ----------------------- */

  // ЗАГРУЖЕННЫЕ КАРТОЧКИ В ХРАНИЛИЩЕ
  const [moviesFromLocal, setMoviesFromLocal] = useState([]);

  // ОТФИЛЬТРОВАННЫЕ ЛОКАЛЬНЫЕ
  const [filterSearchShortFromLocal, setFilterSearchShortFromLocal] = useState([]);

  // ПОИСК В ЛОКАЛЬНЫХ ФИЛЬМАХ (БЕЗ ФИЛЬТРА)
  const [localMoviesAfterSearch, setLocalMoviesAfterSearch] = useState([]);

  // КОРОБКА ДЛЯ ЛОКАЛЬНЫХ ФИЛЬМОВ, КОТОРЫЕ БУДУТ ПОКАЗАНЫ
  const [localMoviesBoxForShow, setLocalMoviesBoxForShow] = useState([]);

  // ФЛАГ - ТЕКУЩИЙ ПОИСК ПО ЗНАЧЕНИЮ ПРОИСХОДИТ ПО ЛОКАЛЬНЫМ ФИЛЬМАМ - /saved-movies
  const [currentSearchInLocalSavedMovies, setCurrentSearchInLocalSavedMovies] = useState(false);

  // ФЛАГ - ЧТО НУЖНО ПОКАЗАТЬ СРАЗУ ВСЕ СОХРАНЁННЫЕ КАРТОЧКИ (БЕЗ ОТБОРКИ 12/8/5)
  const [showAllSavedCards, setShowAllSavedCards] = useState(false);

  /* ------------------------ ПОИСК, ЛОКАЛЬНЫЕ - КОНЕЦ ------------------------ */



  /* ----------------------------- ОБЩЕЕ - НАЧАЛО ----------------------------- */

  // ЗНАЧЕНИЕ ИЗ ПОЛЯ ВВОДА ФОРМЫ ПОИСКА ФИЛЬМА
  const [valueInputSearchForm, setValueInputSearchForm] = useState('');

  // ПАРАМЕТРЫ ДЛЯ КОЛИЧЕСТВА ОТОБРАЖЕНИЯ КАРТОЧЕК
  const [parametersForShowCards, setParametersForShowCards] = useState({
    movies: [],
    quantity: '',
  });

  /* ------------------------------ ОБЩЕЕ - КОНЕЦ ----------------------------- */



  /* ----------------------- ФЛАГИ ШАГОВ ПОИСКА - НАЧАЛО ---------------------- */

  // ДЛЯ - API
  const [firstApiFlag, setFirstApiFlag] = useState(false); // ПЕРВЫЙ ФЛАГ ДЛЯ САБМИТА, ПОСЛЕ ЕГО НАЖАТИЯ
  const [secondApiFlag, setSecondApiFlag] = useState(false); // ВТОРОЙ ФЛАГ
  const [thirdApiFlag, setThirdApiFlag] = useState(false); // ТРЕТИЙ ФЛАГ
  const [fourthApiFlag, setFourthApiFlag] = useState(false); // ЧЕТВЁРТЫЙ ФЛАГ

  // ДЛЯ - ЛОКАЛЬНЫХ
  const [secondLocalFlag, setSecondLocalFlag] = useState(false);

  /* ----------------------- ФЛАГИ ШАГОВ ПОИСКА - КОНЕЦ ----------------------- */


  /* ------------------------- МАРШРУТИЗАЦИЯ - НАЧАЛО ------------------------- */

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const pathesPages = {
    mainUrl: pathName === '/',
    moviesUrl: pathName === '/movies',
    savedMoviesUrl: pathName === '/saved-movies',
    profileUrl: pathName === '/profile',
    signupUrl: pathName === '/signup',
    signinUrl: pathName === '/signin',
  };


  // ПЕРЕНАПРАВЛЕНИЕ НА ГЛАВНУЮ
  function goToMainPage() {
    return history.push('/');
  }


  // ПЕРЕНАПРАВЛЕНИЕ НА /movies
  function handleRedirectMovies() {
    history.push('/movies');
  }

  /* -------------------------- МАРШРУТИЗАЦИЯ - КОНЕЦ ------------------------- */


  /* ---------------------- РАБОТА С ХРАНИЛИЩЕМ - НАЧАЛО ---------------------- */

  // GET
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
    return parseJSON(localStorage.getItem('afterRegBeforeFirstSubmit'));
  }



  // SET
  // ПОСЛЕ РЕГИСТРАЦИИ, НО ДО ПЕРВОГО САБМИТА ФИЛЬМОВ
  function setActiveAfterRegBeforeFirstSubmitStorage() {
    return localStorage.setItem('afterRegBeforeFirstSubmit', stringifyJSON(true));
  }


  // АВТОРИЗАЦИЯ, ПОСЛЕ ЛОГАУТА
  function setActiveAuthAfterLogoutStorage() {
    return localStorage.setItem('authAfterLogoutActive', stringifyJSON(true));
  }


  // ПЕРЕЗАГРУЗКА СТРАНИЦЫ
  function setActiveReloadedPageStorage() {
    return localStorage.setItem('reloadedPage', stringifyJSON(true));
  }


  // ПУСТОЙ МАССИВ ФИЛЬМОВ
  function setEmptyMoviesFromStorage() {
    return localStorage.setItem('movies', stringifyJSON([]));
  }


  // ПУСТОЙ МАССИВ КОРОТКОМЕТРАЖЕК
  function setEmptySavedMoviesFromStorage() {
    return localStorage.setItem('savedMovies', stringifyJSON([]));
  }

  /* ----------------------- РАБОТА С ХРАНИЛИЩЕМ - КОНЕЦ ---------------------- */



  // ТРЭКЕР ОБНОВЛЕНИЯ СТРАНИЦЫ
  useEffect(() => {
    if (!getAfterRegBeforeFirstSubmitStorage) {
      if (document.readyState === 'complete') {
        handleIsReloadedPageActive();
        return localStorage.setItem('reloadedPage', stringifyJSON(true));
      }
    }
  }, [])


  // БЫЛА ЛИ ПЕРЕЗАГРУЖЕНА СТРАНИЦА - АКТИВНО
  function handleIsReloadedPageActive() {
    return setIsReloadedPage(true);
  }


  // БЫЛА ЛИ ПЕРЕЗАГРУЖЕНА СТРАНИЦА - НЕАКТИВНО
  function handleIsReloadedPageNotActive() {
    return setIsReloadedPage(false);
  }


  // ВКЛЮЧИЛИ ТАЙМЕР НА КНОПКУ ФИЛЬТРА ФИЛЬМА
  function handleSetTimerFilterShortMoviesActive() {
    setTimerFilterShortMovies(true);
  }


  // ПОЛУЧЕНИЕ ФИЛЬМОВ С ЛАЙКОМ
  function getSavedMovies() {

    mainApi.getSavedMovies()
      .then((movies) => {
        let moviesBox = [];
        movies.forEach((movie) => {
          if (movie.owner === currentUser._id) {
            moviesBox.push(movie);
          }
        })
        localStorage.setItem('savedMovies', JSON.stringify(moviesBox));
        return setIsLoadedSavedMovies(true); // СООБЩАЕМ, ЧТО КАРТОЧКИ ЗАГРУЖЕНЫ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
      })
      .catch((err) => {
        console.log(err);
        return handleOpenPopup({ active: true, message: ErrorMessage[500] });
      })
  }


  // ЕСЛИ ОТКРЫТА СТРАНИЦА - /signup
  function handleIsRegLink() {
    setIsRegLink(true);
    setIsMainLink(false);
    setIsLogLink(false);
    setIsProfileLink(false);
    setIsMoviesLink(false);
    setIsSavedMoviesLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
  }


  // ЕСЛИ ОТКРЫТА СТРАНИЦА - /signin
  function handleIsLogLink() {
    setIsLogLink(true);
    setIsMainLink(false);
    setIsRegLink(false);
    setIsProfileLink(false);
    setIsMoviesLink(false);
    setIsSavedMoviesLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
  }


  // ЕСЛИ ОТКРЫТА СТРАНИЦА - /profile
  function handleIsProfileLink() {
    setIsProfileLink(true);
    setIsMainLink(false);
    setIsLogLink(false);
    setIsRegLink(false);
    setIsMoviesLink(false);
    setIsSavedMoviesLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
  }

  // ЕСЛИ ОТКРЫТА - ГЛАВНАЯ СТРАНИЦА
  function handleClickByLogo() {
    setIsMainLink(true);
    setIsLogLink(false);
    setIsRegLink(false);
    setIsMoviesLink(false);
    setIsProfileLink(false);
    setIsSavedMoviesLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
  }


  // ЕСЛИ ОТКРЫТА СТРАНИЦА - /saved-movies
  function handleIsSavedMoviesLink() {
    setIsSavedMoviesLink(true);
    setIsLogLink(false);
    setIsRegLink(false);
    setIsMoviesLink(false);
    setIsProfileLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
    setIsFilterShortMovies(false);
    setIsMoviesNotFound(false);
  }


  // ЕСЛИ ОТКРЫТА СТРАНИЦА - /movies
  function handleIsMoviesLink() {
    setIsMoviesLink(true);
    setIsLogLink(false);
    setIsRegLink(false);
    setIsSavedMoviesLink(false);
    setIsProfileLink(false);
    setIsPageNotFound(false);
    setIsProfileMenu(false);
    setCurrentSearchInLocalSavedMovies(false);
    setIsFilterShortMovies(false);
    setCurrentSearchMoviesFromApi(false);
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
    setIsPressedSubmitSearchForm(true);
  }


  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМА - НЕАКТИВНО
  function handleSubmitSearchFormNotActive() {
    setIsPressedSubmitSearchForm(false);
  }


  // ПОЛЬЗОВАТЕЛЬ НЕЗАЛОГИНЕН
  function handleIsNotLoggedIn() {
    setIsLoggedIn(false);
  }


  // ОБРАБОТЧИК ОТКРЫТИЯ ОКНА ОШИБКИ
  function handleOpenPopup(data) {
    return setPopup(data);
  }


  // ОБРАБОТЧИК ЗАКРЫТИЯ ОКНА ОШИБКИ
  function handleClosePopup() {
    return setPopup({});
  }


  // ОБРАБОТЧИК СТРАНИЦЫ 404 - ОТКРЫТА
  function handlePageNotFoundOpened() {
    setIsPageNotFound(true);
  }


  // ОТКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleIsProfileMenu() {
    setIsProfileMenu(true);
  }


  // ЗАКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleButtonCloseMenuProfile() {
    setIsProfileMenu(false);
  }


  // ПЕРВИЧНЫЙ ОТБОР КАРТОЧЕК (ПЕРВЫЙ ПОКАЗ)
  function handleSetIsFirstCoundCardsActive() {
    setIsFirstCountCards(true);
  }


  // ПЕРВИЧНОГО ОТБОРА КАРТОЧЕК ЕЩЁ НЕ БЫЛО ИЛИ УЖЕ БЫЛ
  function handleSetIsFirstCoundCardsNotActive() {
    setIsFirstCountCards(false);
  }


  // ЗАФИКСИРОВАН ЛИ СТЭЙТ ФИЛЬТРА САБМИТОМ
  function handleSubmitFixedStateFilter() {

    if (isFilterShortMovies) { // СМОТРИМ НА ПОСЛЕДНЕЕ ИЗМЕНЕНИЕ СТАТУСА ЧЕКБОКСА
      setIsSubmitFixedStateFilter(true);
      return;
    }
    setIsSubmitFixedStateFilter(false);
  }


  // ЗНАЧЕНИЕ ПОЛЯ ФОРМЫ ПОИСКА ФИЛЬМА
  function handleValueInputSearchForm(valueInput) {
    setValueInputSearchForm(valueInput.toLowerCase());
  }


  /* ----------------------- НАЧАЛО ФУНКЦИОНАЛЬНОЙ ЧАСТИ ---------------------- */

  // ПРИКРЕПЛЕНИЕ ТОКЕНА
  useEffect(() => {
    if (isAuth) {
      return getDataUser();
    }
    setIsLoggedIn(false);
  }, [])



  // ПОЛУЧЕНИЕ СОХРАНЁННЫХ ФИЛЬМОВ С СЕРВЕРА
  useEffect(() => {
    if (isLoggedIn && !isSavedMoviesDownloaded) {
      setIsSavedMoviesDownloaded(true);
      getSavedMovies();
      return setValues({ ...values, name: { ...values.name, value: currentUser.name }, email: { ...values.email, value: currentUser.email } });
    }
  }, [isLoggedIn])



  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА
  function getDataUser() {
    mainApi.getUserData()
      .then((data) => {
        localStorage.setItem('dataUser', stringifyJSON(data.user));
        if (!isLoggedIn) {
          setIsLoggedIn(true);
        }
        return
      })
      .catch((err) => { console.log(err); })
  }



  // ПЕРЕЗАГРУЗКА СТРАНИЦЫ
  // ЕСЛИ ОТКРЫТА СТРАНИЦА /saved-movies И ЗАПИСАНЫ СОХРАНЁННЫЕ ФИЛЬМЫ В ХРАНИЛИЩЕ
  useEffect(() => {

    if (pathesPages.savedMoviesUrl) {
      const cardMovies = parseJSON(localStorage.getItem('savedMovies'));

      if (cardMovies.length >= 1) {
        handleIsReloadedPageNotActive();
        return setMoviesFromLocal(cardMovies);
      }
    }
  }, [isSavedMoviesLink])



  // ПЕРЕЗАГРУЗКА СТРАНИЦЫ
  // ЕСЛИ ОТКРЫТА СТРАНИЦА /movies И УЖЕ ЕСТЬ СОХРАНЁННЫЕ ФИЛЬМЫ В ХРАНИЛИЩЕ
  useEffect(() => {
    if (pathesPages.moviesUrl) {
      const apiMoviesFromStorage = getMoviesFromStorage();

      if (!apiMoviesFromStorage) {
        moviesApi.getMovies()
          .then((data) => {
            localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
            setMoviesFromApi(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ ИЗ API
          })
          .catch((err) => {
            console.log(err);
            return handleOpenPopup({ active: true, message: ErrorMessage[500] });
          })
      }
    }
  }, [isReloadedPage])



  // ФИЛЬТР "КОРОТКОМЕТРАЖКИ" - ВКЛЮЧЕНО/ВЫКЛЮЧЕНО
  function handleSetIsFilterShortMovies(e) {
    const isAfterRegBeforeFirstSubmit = getAfterRegBeforeFirstSubmitStorage();
    const savedMoviesStorage = getSavedMoviesStorage();

    if (!isAfterRegBeforeFirstSubmit && savedMoviesStorage) { // БЫЛ ЛИ ПЕРВЫЙ САБМИТ, ПОСЛЕ РЕГИСТРАЦИИ?
      if (!timerFilterShortMovies) {

        setIsFilterShortMoviesDisabled(true);
        handleSetTimerFilterShortMoviesActive(); // ВКЛЮЧИЛИ ТАЙМЕР
        setTimeout(setTimerFilterShortMovies, 500, false);

        const status = e.target.checked;
        setIsFilterShortMovies(status);
        handleSetSubmitSearchFormActive();
      }
    }
  }



  /* ------------------------- ПОИСК ФИЛЬМОВ - НАЧАЛО ------------------------- */

  /* ------------------------- ШАГ - 1.1 - ТОЛЬКО API ------------------------- */
  // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ИЗ API - /movies
  function handleGetMovies() {
    moviesApi.getMovies()
      .then((data) => {
        setMoviesFromApi(data); // ЗАПИСЫВАЕМ ВСЕ ФИЛЬМЫ ИЗ API
        localStorage.setItem('movies', JSON.stringify(data)); // ДУБЛИРУЕМ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        setSecondApiFlag(true);
      })
      .catch((err) => {
        console.log(err);
        return handleOpenPopup({ active: true, message: ErrorMessage[500] });
      })
  }



  // ПРОВЕРКА ПРОЙДЕННОГО ВРЕМЕНИ МЕЖДУ ЗАПРОСАМИ К СЕРВЕРУ ЗА ФИЛЬМАМИ
  function checkTimeBetweenRequests() {
    // КЛЮЧ:
    // ЗАФИКСИРОВАННОЕ ВРЕМЯ ПРИ ПЕРВОМ ОБРАЩЕНИИ К СЕРВЕРУ ЗА ФИЛЬМАМИ + 3600000 МС (1 ЧАС)
    // ТО ВРЕМЯ, ПО ИСТЕЧЕНИИ КОТОРОГО, БУДЕТ ПРОИЗВЕДЁН ЗАПРОС К СЕРВЕРУ ПРИ ОЧЕРЕДНОМ САБМИТЕ
    const timeStorage = parseJSON(localStorage.getItem('timeBetweenRequests'));

    if (timeStorage) { // ЕСЛИ КЛЮЧ ЕСТЬ
      const currentTime = Date.now();

      const checkTime = timeStorage - currentTime;

      if (checkTime > 0) { // ЕСЛИ ОСТАЛОСЬ КАКОЕ-ТО ВРЕМЯ, ТОГДА ЗАПРОС К ФИЛЬМАМ БУДЕТ ПРОИСХОДИТЬ В ХРАНИЛИЩЕ

        const moviesSto = parseJSON(localStorage.getItem('movies'));

        setMoviesFromApi(moviesSto);
        setIsLoadedSavedMovies(true); // СООБЩАЕМ, ЧТО КАРТОЧКИ ЗАГРУЖЕНЫ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
        setCanMakeRequestToServer(false);
        return;
      }
      if (checkTime <= 0) { // ЕСЛИ ВРЕМЯ ПРОШЛО
        setTimeBetweenRequestsStorage(true); // МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС
        return localStorage.setItem('timeBetweenRequests', stringifyJSON(Date.now() + 600000)); // 10 МИНУТ
      }
    }

    if (!timeStorage) { // ЕСЛИ КЛЮЧА НЕТ
      localStorage.setItem('timeBetweenRequests', stringifyJSON(Date.now() + 600000)) // 10 МИНУТ
      setTimeBetweenRequestsStorage(true); // МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС
    }
  }


  /* --------------------------------- ШАГ - 1 -------------------------------- */
  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМОВ - НАЧАЛО
  useEffect(() => {

    if (isPressedSubmitSearchForm) {

      if (isMoviesLink && getAfterRegBeforeFirstSubmitStorage()) { // ЕСЛИ ПОСЛЕ РЕГИСТРАЦИИ - ЭТО ПЕРВЫЙ САБМИТ
        localStorage.removeItem('afterRegBeforeFirstSubmit'); // ТОГДА УДАЛЯЕМ
      }

      handleIsReloadedPageActive();
      setFourthApiFlag(false);
      setShowAllSavedCards(false);
      handleSubmitFixedStateFilter(); // ПРОВЕРЯЕМ СТАТУС ЧЕКБОКСА - БЕРЁМ ЕГО В РАБОТУ ИЛИ НЕТ
      setMoviesBoxForMore([]);
      setFoundMoviesAfterSearchApi([]);
      setFilterAfterSearchShortFromApi([]);
      handleSetIsFirstCoundCardsActive();
      setCanMakeRequestToServer(null);
      setTimeBetweenRequestsStorage(false); // ДЕФОЛТИМ ВРЕМЯ ОБРАЩЕНИЯ К СЕРВЕРУ
      setIsMoviesNotFound(false); // УБИРАЕМ НАДПИСЬ - "НИЧЕГО НЕ НАЙДЕНО"
      setCurrentSearchMoviesFromApi(false); // СИГНАЛ, ЧТО ПОИСК ОТ API
      setCurrentSearchInLocalSavedMovies(false); // СИГНАЛ, ЧТО ПОИСК ЛОКАЛЬНЫЙ
      handleSetPreloaderActive(); // + ВКЛЮЧАЕМ ПРЕЛОАДЕР

      if (pathesPages.savedMoviesUrl) { // ЕСЛИ ОТКРЫТА СТРАНИЦА - /saved-movies
        setParametersForShowCards({
          movies: [],
          quantity: '',
        });
        setLocalMoviesAfterSearch([]); // ОЧИЩАЕМ ЛОКАЛЬНЫЙ МАССИВ ПОСЛЕ ПОИСКА
        setLocalMoviesBoxForShow([]); // ОЧИЩАЕМ МАССИВ ОТОБРАЖЕНИЯ ЛОКАЛЬНЫХ ФИЛЬМОВ
        setFilterSearchShortFromLocal([]); // ОЧИЩАЕМ ЛОКАЛЬНЫЙ ОТФИЛЬТРОВАННЫЙ МАССИВ
        setCurrentSearchInLocalSavedMovies(true); // СООБЩАЕМ, ЧТО БУДЕТ ПОИСК ПО СОХРАНЁННЫМ КАРТОЧКАМ
        setShowAllSavedCards(true); // ДАЁМ СИГНАЛ, ЧТО ПОКАЗЫВАТЬ НУЖНО СРАЗУ ВСЕ КАРТОЧКИ
        handleSearchInLocalSavedMoviesByValue();
        return;
      }

      // ДЕЛАЕМ ЗАПРОС К API НА СКАЧИВАНИЕ ФИЛЬМОВ
      setCurrentSearchMoviesFromApi(true); // СООБЩАЕМ, ЧТО БУДЕТ ПРОИСХОДИТЬ ПОИСК ПО КАРТОЧКАМ ОТ API

      checkTimeBetweenRequests(); // ПРОВЕРКА ПРОЙДЕННОГО ВРЕМЕНИ МЕЖДУ ЗАПРОСАМИ К СЕРВЕРУ ЗА ФИЛЬМАМИ
      setFirstApiFlag(true);

      return
    }
  }, [isPressedSubmitSearchForm]) // ОТСЛЕЖИВАЕМ НАЖАТИЕ САБМИТА ПОИСКА ФИЛЬМОВ



  // ЕСЛИ ШАГ 1 ЗАВЕРШЁН
  useEffect(() => {

    if (firstApiFlag) {
      if (timeBetweenRequestsStorage) { // ЕСЛИ МОЖНО ДЕЛАТЬ НОВЫЙ ЗАПРОС К СЕРВЕРУ
        setFirstApiFlag(false);
        return handleGetMovies(); // ПОЛУЧЕНИЕ ВСЕХ ФИЛЬМОВ ИЗ API - /movies
      }

      setFirstApiFlag(false);
      setSecondApiFlag(true);
      return
    }
  }, [firstApiFlag])



  /* --------------------------------- ШАГ - 2 -------------------------------- */
  // ПОИСК КАРТОЧЕК ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ
  useEffect(() => { // ЕСЛИ ИЩЕМ В СОХРАНЁННЫХ КАРТОЧКАХ ИЛИ ПОЛУЧИЛИ ФИЛЬМЫ ОТ API ИЛИ В ХРАНИЛИЩЕ

    if ((secondApiFlag || secondLocalFlag) && (moviesFromApi || moviesFromLocal || canMakeRequestToServer)) {
      setSecondApiFlag(false);
      setIsLoadedSavedMovies(true);

      // ЕСЛИ ПОИСК В ЛОКАЛЬНЫХ ФИЛЬМАХ
      handleSubmitSearchFormNotActive(); // ДЕФОЛТИМ САБМИТ ПОИСКА ФИЛЬМОВ
      handleSetPreloaderNotActive(); // ВЫКЛЮЧАЕМ ПРЕЛОАДЕР
      handleSearchMoviesApiByValue(); // 2 ШАГ - ПОИСК КАРТОЧЕК ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ ВВОДА - ОБЩЕЕ
    }
  }, [secondApiFlag, secondLocalFlag, moviesFromApi, moviesFromLocal, canMakeRequestToServer])


  /* ----------------------------- ШАГ - 2.2 - API ---------------------------- */
  // ПОИСК ФИЛЬМОВ ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ - /movies
  function handleSearchMoviesApiByValue() {

    const movies = moviesFromApi;

    movies.forEach((movie) => {
      const valueFromInputSearch = movie.nameRU.trim().toLowerCase().includes(valueInputSearchForm);
      const { duration } = movie;

      if (valueFromInputSearch) { // ЕСЛИ ЗНАЧЕНИЕ ПОЛЯ СОВПАДАЕТ С НАЗВАНИЕМ ФИЛЬМА ИЗ ВСЕГО СПИСКА
        if (duration <= DurationMovie && isSubmitFixedStateFilter) { // ЕСЛИ КОРОТКОМЕТРАЖКА И ФИЛЬТР ВКЛЮЧЁН

          setFilterAfterSearchShortFromApi((prevMovies) => { return [...prevMovies, movie] });
        }
        setFoundMoviesAfterSearchApi((prevMovies) => { return [...prevMovies, movie] }); // ЗАПИСЫВАЕМ ФИЛЬМ В МАССИВ НАЙДЕННЫХ ФИЛЬМОВ
      }
    })
    setThirdApiFlag(true);
  }



  /* -------------------------- ШАГ - 2.2 - ЛОКАЛЬНЫЕ ------------------------- */
  // ПОИСК ФИЛЬМОВ ПО ЗНАЧЕНИЮ ИЗ ПОЛЯ - /saved-movies
  function handleSearchInLocalSavedMoviesByValue() {

    moviesFromLocal.forEach((movie) => {
      const valueFromInputSearch = movie.nameRU.trim().toLowerCase().includes(valueInputSearchForm);
      const { duration } = movie;
      if (valueFromInputSearch) { // ЕСЛИ ЗНАЧЕНИЕ ПОЛЯ СОВПАДАЕТ С НАЗВАНИЕМ ФИЛЬМА ИЗ ВСЕГО СПИСКА
        if (duration <= DurationMovie && isFilterShortMovies) { // ЕСЛИ КОРОТКОМЕТРАЖКА И ФИЛЬТР ВКЛЮЧЁН
          setFilterSearchShortFromLocal((prevMovies) => { return [...prevMovies, movie] });
        }
        setLocalMoviesAfterSearch((prevMovies) => { return [...prevMovies, movie] }); // ЗАПИСЫВАЕМ ФИЛЬМ В МАССИВ НАЙДЕННЫХ ФИЛЬМОВ
      }
    })
    setSecondLocalFlag(true);
  }


  /* --------------------------------- ШАГ - 3 -------------------------------- */
  // ЗДЕСЬ ОПРЕДЕЛЯЕМ ЧТО ПОКАЗЫВАТЬ - "НИЧЕГО НЕ НАШЛИ" ИЛИ "НАЙДЕННЫЕ КАРТОЧКИ"
  useEffect(() => {

    if ((thirdApiFlag || secondLocalFlag) && (currentSearchMoviesFromApi || currentSearchInLocalSavedMovies)) {

      setThirdApiFlag(false);
      setSecondLocalFlag(false);

      if (currentSearchMoviesFromApi) {

        if (filterAfterSearchShortFromApi.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (filterAfterSearchShortFromApi.length === 0 && isSubmitFixedStateFilter) {
          return setIsMoviesNotFound(true); // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }


        // ОТ API
        if (moviesFromApi.length === 0 && foundMoviesAfterSearchApi.length >= 1) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (moviesFromApi.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (foundMoviesAfterSearchApi.length === 0 && currentSearchMoviesFromApi /* && isPressedSubmit */) {
          return setIsMoviesNotFound(true); // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
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
          return setIsMoviesNotFound(true); // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length === 0 && !isSubmitFixedStateFilter) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (localMoviesAfterSearch.length === 0 && !isSubmitFixedStateFilter) {
          return setIsMoviesNotFound(true); // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length === 0) {
          return setIsMoviesNotFound(true); // АКТИВАЦИЯ НАДПИСИ "НИЧЕГО НЕ НАЙДЕНО"
        }

        if (moviesFromLocal.length >= 1 && isSubmitFixedStateFilter) {
          return handleCountCards();// ЗАПУСК ОТБОРА КАРТОЧЕК
        }

        if (moviesFromLocal.length >= 1 && currentSearchInLocalSavedMovies) {
          return handleCountCards(); // ЗАПУСК ОТБОРА КАРТОЧЕК
        }
      }
    }

  }, [
    secondLocalFlag,
    thirdApiFlag,
    moviesFromLocal,
    localMoviesAfterSearch,
    filterAfterSearchShortFromApi,
    foundMoviesAfterSearchApi,
  ])



  /* --------------------------------- ШАГ - 4 -------------------------------- */
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

    // ИНАЧЕ, НЕФИЛЬТРОВАННЫЕ ОТ API
    if (!isSubmitFixedStateFilter && currentSearchMoviesFromApi) {
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
    let quantity = null; // СБРОС КОЛИЧЕСТВА НУЖНЫХ КАРТОЧЕК (ОПРЕДЕЛЯЕТСЯ ОТНОСИТЕЛЬНО ШИРИНЫ ОКНА БРАУЗЕРА)


    // КАКОЙ ПО СЧЁТУ ОТБОР - ПЕРВИЧНЫЙ ИЛИ ВТОРИЧНЫЙ
    if (isFirstCountCards) {

      parametersWindow = WidthWindowForFirstCount; // ПЕРВИЧНЫЙ ОТБОР (ОТОБРАЗИТСЯ СРАЗУ 12/8/5)
      handleSetIsFirstCoundCardsNotActive() // СООБЩАЕМ, ЧТО ПЕРВИЧНЫЙ ОТБОР ПРОШЁЛ
    } else {
      parametersWindow = WidthWindowForSecondaryCounts; // ВТОРИЧНЫЙ ОТБОР (БУДЕТ ОТОБРАЖАТЬСЯ ПРИ НАЖАТИИ НА КНОПКУ "ЕЩЁ" 3/2/1)
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
      quantity = QuantitySavedMovies;
    };

    setParametersForShowCards({
      movies: movies,
      quantity: quantity,
    });
  }


  // ЕСЛИ ЗАВЕРШЁН 4 ШАГ, ТО ПЕРЕХОДИМ К 5 ШАГУ - ВКЛЮЧАЕМ ОБРАБОТЧИК ОТОБРАННЫХ КАРТОЧЕК
  useEffect(() => {
    if (parametersForShowCards) {
      return handleSelectedCards();
    }
  }, [parametersForShowCards])


  /* --------------------------------- ШАГ - 5 -------------------------------- */
  // РАБОТА КНОПКИ "ЕЩЁ" - ОТОБРАЖЕНИЕ ОТОБРАННЫХ КАРТОЧЕК
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
      return setFourthApiFlag(true);
    }
    if (currentSearchInLocalSavedMovies && isSubmitFixedStateFilter) {
      return setFilterSearchShortFromLocal(() => { return [...currentNumberCards] });
    }

    // API
    // ЕСЛИ ТЕКУЩИЙ ПОИСК ОТ API И НЕТ ФИЛЬТРА, ТО
    if (currentSearchMoviesFromApi && !isSubmitFixedStateFilter) {
      return setMoviesBoxForMore((prevCards) => { return [...prevCards, ...currentNumberCards] });
    }

    if (currentSearchMoviesFromApi && isSubmitFixedStateFilter) {
      return setFilterAfterSearchShortFromApi((prevCards) => { return [...prevCards, ...currentNumberCards] });
    }

    return setFourthApiFlag(true); // ШАГ 4 - НАЧАТ
  };

  /* -------------------------- ПОИСК ФИЛЬМОВ - КОНЕЦ ------------------------- */


  /* ------------------------- ВАЛИДАЦИЯ ФОРМ - НАЧАЛО ------------------------ */

  const [errors, setErrors] = useState({}); // ДЛЯ ОБРАБОТЧИКА ОШИБОК
  const [isValid, setIsValid] = useState(false); // ДЛЯ ОБРАБОТЧИКА ОШИБОК
  const [clickAtInput, setClickAtInput] = useState(false); // ЭЛЕМЕНТ ТЕКСТА ОШИБКИ ФОРМЫ
  const [isRegexEmail, setIsRegexEmail] = useState(false);
  const [isRegexName, setIsRegexName] = useState(false);
  const [values, setValues] = useState(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      }
    }
  ); // ДЛЯ ОБРАБОТЧИКА ОШИБОК


  // ВВОД ТЕКСТА В ПОЛЕ ФОРМЫ ПРИВОДИТ В АКТИВНОЕ СОСТОЯНИЕ ЭЛЕМЕНТ ТЕКСТА ОШИБКИ
  function handleClickAtInputActive() {
    return setClickAtInput(true);
  }


  // ВВОД ТЕКСТА В ПОЛЕ ФОРМЫ ПРИВОДИТ В НЕАКТИВНОЕ СОСТОЯНИЕ ЭЛЕМЕНТ ТЕКСТА ОШИБКИ
  function handleClickAtInputNotActive() {
    return setClickAtInput(false);
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

    setValues({ ...values, [name]: { ...values.name, 'value': value } });

    setErrors({ ...errors, [name]: target.validationMessage });


    if (name === 'name' && !target.validationMessage) {
      setIsRegexName(value.match(RegexName));

      value.match(RegexName) ?
        setValues({ ...values, name: { value: value, isValid: true } }) :
        setValues({ ...values, name: { value: value, isValid: false } });
    }

    if (name === 'email') {
      setIsRegexEmail(value.match(RegexEmail));

      value.match(RegexEmail) ?
        setValues({ ...values, email: { value: value, isValid: true } }) :
        setValues({ ...values, email: { value: value, isValid: false } });
    }

    if (name === 'password' && !target.validationMessage) {
      setValues({ ...values, password: { value: value, isValid: true } });
    }

    setIsValid(target.closest("form").checkValidity());
  };

  // ПОЛУЧЕНИЕ ДАННЫХ ОШИБКИ ДЛЯ ПОПАПА
  function getErrorMessageForm() {
    return errors;
  }

  // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ИЗ ПОЛЯ
  function getValueInput() {
    return values;
  }


  // ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ВАЛИДНОСТИ/НЕВАЛИДНОСТИ ПОЛЯ ВВОДА
  function getIsValidInput() {

    // ЕСЛИ ОТКРЫТА СТРАНИЦА /signup
    if (pathesPages.signupUrl) {
      if ((values.name.value === '' || values.email.value === '' || values.password.value === '' || isRegexEmail === null || isRegexName === null)) {
        return;
      }
    }


    // ЕСЛИ ОТКРЫТА СТРАНИЦА /signin
    if (pathesPages.signinUrl) {
      if (values.email.value === '' || values.password.value === '' || isRegexEmail === null || isRegexName === null) {
        return;
      }
    }


    // ЕСЛИ ОТКРЫТА СТРАНИЦА /profile
    if (pathesPages.profileUrl) {
      if ((values.name.value === undefined || values.name.value === null) ||
        (currentUser.name === values.name.value && currentUser.email === values.email.value) || isSubmitProfileDisabled || isRegexEmail === null || isRegexName === null || isRegexName === null) {
        return;
      }
    }
    return isValid;
  }

  /* ------------------------- ВАЛИДАЦИЯ ФОРМ - КОНЕЦ ------------------------- */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ValidationContext.Provider value={{
        handleChange: handleChangeInputs,
        errors: getErrorMessageForm,
        values: getValueInput,
        isValidForm: isValid,
        checkValidValueInput: getIsValidInput,
        clickAtInput: clickAtInput,
        handleClickAtInputActive: handleClickAtInputActive,
        handleClickAtInputNotActive: handleClickAtInputNotActive,
        pathName: pathName,
      }}>
        <div className="page">
          <div className="page__box">

            <Header
              isRegLink={isRegLink}
              isLogLink={isLogLink}
              isProfileLink={isProfileLink}
              isMoviesLink={isMoviesLink}
              isSavedMoviesLink={isSavedMoviesLink}
              isMainLink={isMainLink}
              isPageNotFound={isPageNotFound}
              isLoggedIn={isLoggedIn}
              isRegexName={isRegexName}
              isRegexEmail={isRegexEmail}
              isProfileMenu={isProfileMenu}
              handleIsProfileMenu={handleIsProfileMenu}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
              goToMainPage={goToMainPage}
              pathesPages={pathesPages}
              pathName={pathName}
            />

            <Switch>

              <Route exact path="/">
                <Main
                  handleClickByLogo={handleClickByLogo}
                />
              </Route>

              <Route path="/signup">
                {!isLoggedIn ?
                  <SignUp
                    isMainLink={isMainLink}
                    isLogLink={isLogLink}
                    handleIsRegLink={handleIsRegLink}
                    handleRedirectMovies={handleRedirectMovies}
                    setCurrentUser={setCurrentUser}
                    setActiveAfterRegBeforeFirstSubmitStorage={setActiveAfterRegBeforeFirstSubmitStorage}
                    setActiveAuthAfterLogoutStorage={setActiveAuthAfterLogoutStorage}
                    setEmptyMoviesFromStorage={setEmptyMoviesFromStorage}
                    setEmptySavedMoviesFromStorage={setEmptySavedMoviesFromStorage}
                    getDataUser={getDataUser}
                    setIsAuth={setIsAuth}
                  />
                  : <Redirect to="/movies" />}
              </Route>

              <Route path="/signin">
                {!isLoggedIn ?
                  <SignIn
                    isMainLink={isMainLink}
                    isRegLink={isRegLink}
                    handleIsLogLink={handleIsLogLink}
                    getDataUser={getDataUser}
                    getSavedMoviesStorage={getSavedMoviesStorage}
                    setEmptySavedMoviesFromStorage={setEmptySavedMoviesFromStorage}
                    setActiveAuthAfterLogoutStorage={setActiveAuthAfterLogoutStorage}
                    setActiveReloadedPageStorage={setActiveReloadedPageStorage}
                    setCurrentUser={setCurrentUser}
                    setIsAuth={setIsAuth}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                  : <Redirect to="/movies" />}
              </Route>

              <ProtectedRoute path='/movies' isLoggedIn={isLoggedIn}>
                <Movies
                  isMoviesLink={isMoviesLink}
                  isProfileMenu={isProfileMenu}
                  isPreloaderActive={isPreloaderActive}
                  isMoviesNotFound={isMoviesNotFound}
                  isFilterShortMovies={isFilterShortMovies}
                  isLoadedSavedMovies={isLoadedSavedMovies}
                  isSavedMoviesLink={isSavedMoviesLink}
                  isReloadedPage={isReloadedPage}
                  isSubmitFixedStateFilter={isSubmitFixedStateFilter}
                  isPressedSubmitSearchForm={isPressedSubmitSearchForm}
                  isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
                  handleOpenPopup={handleOpenPopup}
                  handleCountCards={handleCountCards}
                  handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
                  handleValueInputSearchForm={handleValueInputSearchForm}
                  handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
                  handleIsMoviesLink={handleIsMoviesLink}
                  handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
                  handleIsReloadedPageActive={handleIsReloadedPageActive}
                  getSavedMovies={getSavedMovies}
                  setIsLikeRemoved={setIsLikeRemoved}
                  setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
                  moviesFromApi={moviesFromApi}
                  moviesBoxForMore={moviesBoxForMore}
                  fourthApiFlag={fourthApiFlag}
                  currentSearchMoviesFromApi={currentSearchMoviesFromApi}
                  filterAfterSearchShortFromApi={filterAfterSearchShortFromApi}
                  foundMoviesAfterSearchApi={foundMoviesAfterSearchApi}
                  timerFilterShortMovies={timerFilterShortMovies}
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
                  setFilterSearchShortFromLocal={setFilterSearchShortFromLocal}
                  setMoviesFromLocal={setMoviesFromLocal}
                  setValues={setValues}
                  setIsSavedMoviesDownloaded={setIsSavedMoviesDownloaded}
                  goToMainPage={goToMainPage}
                />
              </ProtectedRoute>

              <ProtectedRoute path='/saved-movies' isLoggedIn={isLoggedIn}>
                <SavedMovies
                  isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
                  isLikeRemoved={isLikeRemoved}
                  isSubmitFixedStateFilter={isSubmitFixedStateFilter}
                  isPreloaderActive={isPreloaderActive}
                  isMoviesNotFound={isMoviesNotFound}
                  isSavedMoviesLink={isSavedMoviesLink}
                  isProfileMenu={isProfileMenu}
                  isFilterShortMovies={isFilterShortMovies}
                  handleIsReloadedPageActive={handleIsReloadedPageActive}
                  handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
                  handleValueInputSearchForm={handleValueInputSearchForm}
                  handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
                  handleOpenPopup={handleOpenPopup}
                  handleIsSavedMoviesLink={handleIsSavedMoviesLink}
                  handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
                  getSavedMovies={getSavedMovies}
                  setFilterSearchShortFromLocal={setFilterSearchShortFromLocal}
                  setLocalMoviesBoxForShow={setLocalMoviesBoxForShow}
                  setMoviesFromLocal={setMoviesFromLocal}
                  setIsLikeRemoved={setIsLikeRemoved}
                  setLocalMoviesAfterSearch={setLocalMoviesAfterSearch}
                  setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
                  valueInputSearchForm={valueInputSearchForm}
                  timerFilterShortMovies={timerFilterShortMovies}
                  moviesFromLocal={moviesFromLocal}
                  filterSearchShortFromLocal={filterSearchShortFromLocal}
                  currentSearchInLocalSavedMovies={currentSearchInLocalSavedMovies}
                  localMoviesBoxForShow={localMoviesBoxForShow}
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
              handleOpenPopup={handleOpenPopup}
              handleClosePopup={handleClosePopup}
              popup={popup}
            />

          </div>
        </div>

      </ValidationContext.Provider>
    </CurrentUserContext.Provider>
  )
};

export default App;
