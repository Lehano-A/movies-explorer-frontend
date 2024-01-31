import getWidthWindowBrowser from "./widthWindowBrowser";


// ВЫЧИСЛИТЬ КОЛИЧЕСТВО КАРТОЧЕК ДЛЯ ОДНОГО ПОКАЗА
function calculateQuantityCardsForOneShow(paramsForCardsDisplay) {
  const currentWidthWindow = getWidthWindowBrowser(); // ТЕКУЩАЯ ШИРИНА ОКНА БРАУЗЕРА

  if (currentWidthWindow >= paramsForCardsDisplay.big.from) { // 1280 или 1210
    return paramsForCardsDisplay.big.quantity; // 12 или 3
  } else

    if (currentWidthWindow >= paramsForCardsDisplay.middle.from && currentWidthWindow < paramsForCardsDisplay.middle.to) { // 768-1280 или 751-1210
      return paramsForCardsDisplay.middle.quantity; // 8 или 2
    } else

      if (currentWidthWindow >= paramsForCardsDisplay.low.from && currentWidthWindow <= paramsForCardsDisplay.low.to) { // 320-480 или 320-750
        return paramsForCardsDisplay.low.quantity; // 5 или 1
      }
}


export default calculateQuantityCardsForOneShow