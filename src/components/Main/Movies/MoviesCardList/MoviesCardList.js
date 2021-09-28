import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import oneC from "./../../../../images/posters/1.jpg";
import twoC from "./../../../../images/posters/2.jpg";
import treeC from "./../../../../images/posters/3.jpg";
import fourC from "./../../../../images/posters/4.jpg";
import fiveC from "./../../../../images/posters/5.jpg";
import sixC from "./../../../../images/posters/6.jpg";
import sevenC from "./../../../../images/posters/7.jpg";
import eightC from "./../../../../images/posters/8.jpg";
import nineC from "./../../../../images/posters/9.jpg";
import tenC from "./../../../../images/posters/10.jpg";
import elevenC from "./../../../../images/posters/11.jpg";
import twelveC from "./../../../../images/posters/12.jpg";
import thirtyC from "./../../../../images/posters/13.jpg";



const posters = [{ 1: oneC }, { 2: twoC }, { 3: treeC }, { 4: fourC }, { 5: fiveC }, { 6: sixC }, { 7: sevenC }, { 8: eightC }, { 9: nineC }, { 10: tenC }, { 11: elevenC }, { 12: twelveC }, { 13: thirtyC }];

function MoviesCardList({ handleIsCountCards }) {

  return (
    <section className="MoviesCardList">

      {posters.map((poster, i) => {
        handleIsCountCards()
        return <MoviesCard
          key={i}
          {...poster}
        />
      })
      }
    </section>
  )

}

export default MoviesCardList;