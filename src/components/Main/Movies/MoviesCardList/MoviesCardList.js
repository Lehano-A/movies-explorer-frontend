
import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({ countedCards, handleIsActiveButtonSave }) {

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