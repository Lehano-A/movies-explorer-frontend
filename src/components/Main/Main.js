import React, { useEffect } from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";


function Main({
  handleClickByLogo,
  handleAnchorLink
}) {

  useEffect(() => {
    handleClickByLogo();
  }, [])


  return (
    <main>
      <Promo handleAnchorLink={handleAnchorLink} />
      <AboutProject />
      <Tech />
      <AboutMe />
    </main>
  )
}

export default Main;