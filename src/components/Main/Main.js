import React, { useEffect } from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Techs/Techs";
import Student from "./Student/Student";

function Main({ handleClickByLogo }) {

  useEffect(() => {
    handleClickByLogo();
  });

  return (
    <main>
      <Promo />
      <AboutProject />
      <Tech />
      <Student />
    </main>
  )
}

export default Main;