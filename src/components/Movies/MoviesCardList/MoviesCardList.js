import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({
  cards,
  loadedSavedMovies,
  isSavedMoviesCurrentPathname,
  isActivePreloader,
  isDownloadedInitialData,
  handleDeleteMovie,
  handleButtonSaveMovie,
  updateStatesAfterDeletionMovie,
  abortController
}) {


  const [targetCard, setTargetCard] = useState({
    id: null,
    typeAction: null,
  }) // ЦЕЛЕВАЯ КАРТОЧКА (id - КОТОРЫЙ ПЕРЕДАЁТСЯ ОТ BEATFILM)

  const [dataTargetCard, setDataTargetCard] = useState({
    card: null,
    _id: null, // КОТОРЫЙ ПЕРЕДАЁТСЯ С СЕРВЕРА (_id ДОКУМЕНТА)
    isActiveSavingIcon: null,
    setIsActiveSavingIcon: null,
  }) // ДАННЫЕ ЦЕЛЕВОЙ КАРТОЧКИ, А ТАКЖЕ СТЭЙТ С СЕТТЕРОМ ИКОНКИ СОХРАНЕНИЯ



  // КОГДА ДАННЫЕ ЦЕЛЕВОЙ КАРТОЧКИ БЫЛИ ЗАПИСАНЫ, ПОСЛЕ НАЖАТИЯ НА КНОПКУ СОХРАНЕНИЯ ИЛИ УДАЛЕНИЯ
  useEffect(() => {
    if (dataTargetCard) {

      if (targetCard?.typeAction === 'save') { // НАЖАТА КНОПКА СОХРАНЕНИЯ (ПОСТАВИТЬ ИЛИ УБРАТЬ ЛАЙК)
        handleButtonSaveMovie(dataTargetCard)
      } else

        if (targetCard?.typeAction === 'delete') { // НАЖАТА КНОПКА УДАЛЕНИЯ
          handleDeleteMovie(dataTargetCard, updateStatesAfterDeletionMovie, abortController)
        }


      setDataTargetCard(null)
      setTargetCard({
        id: null,
        typeAction: null,
      })
    }
  }, [dataTargetCard])



  // ОБРАБОТАТЬ КЛИК ПО КАРТОЧКЕ
  function handleCardClick(e) {
    const typeButton = e.target.getAttribute('id')

    if (typeButton === 'save' || typeButton === 'delete') {
      const targetCard = e.target.closest('figure')
      const idCard = targetCard.getAttribute('id')

      setTargetCard({
        id: Number(idCard),
        typeAction: typeButton === 'save' ? 'save' : 'delete'
      })
    }
  }



  return (
    <section className="movies-card-list">

      {
        isActivePreloader && <Preloader />
      }


      {
        (!isActivePreloader && isDownloadedInitialData !== null) &&
        (
          (
            (cards.length === 0 && loadedSavedMovies?.length === 0 && isSavedMoviesCurrentPathname) &&
            <p className='movies-card-list__not-found'>Тут пока ещё пусто</p>
          )
          ||
          (
            (cards.length === 0) &&
            <p className='movies-card-list__not-found'>Ничего не найдено</p>
          )
          ||

          (
            (cards.length > 0) &&
            <div
              className={`movies-card-list__grid movies-card-list__grid_active`}
              onClick={handleCardClick}
            >
              {
                cards.map((card) => {

                  return (
                    <MoviesCard
                      key={card.movieId || card.id}
                      card={card}
                      idCard={card.movieId || card.id}
                      isTargetCard={targetCard?.id === card.movieId || targetCard?.id === card.id}
                      isSavedMoviesCurrentPathname={isSavedMoviesCurrentPathname}
                      loadedSavedMovies={loadedSavedMovies}
                      setDataTargetCard={setDataTargetCard}
                      abortController={abortController}
                    />
                  )
                })
              }
            </div>
          )
        )
      }
    </section>
  )
}

export default MoviesCardList;