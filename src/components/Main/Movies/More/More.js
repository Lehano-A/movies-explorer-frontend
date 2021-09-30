import React from "react";

function More({ cards, handleCountCards }) {

  return (
    // ЕСЛИ В МАССИВЕ С КАРТОЧКАМИ, ОСТАЛАСЬ ХОТЯ БЫ ОДНА КАРТОЧКА
    // ТО КНОПКА "ЕЩЁ" БУДЕТ ОТОБРАЖАТЬСЯ

    cards.length >= 1 && (
      <div className="More">
        <button onClick={handleCountCards} className="more__button-more">Ещё</button>
      </div>
    )
  )

}

export default More;