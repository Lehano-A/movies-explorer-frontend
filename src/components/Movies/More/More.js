import React from "react";

function More({ selectedCards, addMoreCards }) {

  return (
    // ЕСЛИ В МАССИВЕ С КАРТОЧКАМИ, ОСТАЛАСЬ ХОТЯ БЫ ОДНА КАРТОЧКА
    // ТО КНОПКА "ЕЩЁ" БУДЕТ ОТОБРАЖАТЬСЯ
    selectedCards.length >= 1 &&
    <div className="More">
      <button onClick={addMoreCards} className="more__button-more">Ещё</button>
    </div>

  )

}

export default More;