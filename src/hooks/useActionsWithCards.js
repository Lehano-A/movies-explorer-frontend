function useActionsWithCards(isActiveFilterShortMovies, setTotalAllCardsDisplayed = null) {


  // ОТФИЛЬТРОВАТЬ КАРТОЧКИ, ПОСЛЕ УДАЛЕНИЯ ЛАЙКА
  function filterCardsAfterRemovedLike(cards, id) {
    return cards.filter((card) => card._id !== id)
  }



  // ИЗМЕНИТЬ ВСЕГО ОТОБРАЖЁННЫХ КАРТОЧЕК
  function changeTotalDisplayedCards(lengthCardsInMainBox) {
    // ЕСЛИ ПЕРЕДАЁТСЯ (НАПРИМЕР ИЗ SAVEDMOVIES НЕ ПЕРЕДАЁТСЯ)
    if (setTotalAllCardsDisplayed) {
      if (!isActiveFilterShortMovies) {
        setTotalAllCardsDisplayed(lengthCardsInMainBox)
      }
    }
  }



  // ОБРЕЗАТЬ КАРТОЧКИ
  function sliceCards(cards, sliceTo = null, lengthAddMore = 0) {

    // ДЛЯ КОРОТКОМЕТРАЖЕК
    if (sliceTo === null) {
      return cards.slice(0, cards.length + lengthAddMore);
    }

    if (cards.length < sliceTo) {  // ЧТОБЫ НЕ ДОБАВЛЯТЬ ЛИШНИХ ПУСТЫХ КАРТОЧЕК
      sliceTo = cards.length
    }

    return cards.slice(0, sliceTo + lengthAddMore);
  }



  // ПОКАЗАТЬ ОТОБРАННЫЕ КАРТОЧКИ
  function showCards(cards, setMainBoxForDisplay) {
    setMainBoxForDisplay(cards)
    changeTotalDisplayedCards(cards.length)
  };




  return {
    filterCardsAfterRemovedLike,
    sliceCards,
    showCards,
  }
}

export default useActionsWithCards