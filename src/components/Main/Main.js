import React from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";


function Main({ handleClickAnchorLink }) {


  return (

    <main>
      <Promo handleClickAnchorLink={handleClickAnchorLink} />
      <AboutProject />
      <Tech />
      <AboutMe />
    </main>

  )
}

export default Main;