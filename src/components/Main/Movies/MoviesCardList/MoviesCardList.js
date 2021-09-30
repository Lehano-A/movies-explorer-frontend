
import React, { useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({ countedCards, isActiveButtonSave, handleIsActiveButtonSave }) {

  return (
    <section className="MoviesCardList">

      {countedCards.map((card, i) => {
        return (
          <MoviesCard
            handleIsActiveButtonSave={handleIsActiveButtonSave}
            key={i}
            card={card}
          />
        )
      })}

    </section>
  )

}

export default MoviesCardList;