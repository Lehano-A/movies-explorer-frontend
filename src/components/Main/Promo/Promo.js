import React from "react";

function Promo() {

  return (

    <section className="Promo">

      <div className="promo__title-box">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>

      <ul className="promo__info-buttons">
        <a href="#aboutProject"><li className="promo__button-info">О проекте</li></a>
        <a href="#techs"><li className="promo__button-info">Технологии</li></a>
        <a href="#aboutMe"><li className="promo__button-info">Студент</li></a>
      </ul>

    </section>

  )

}

export default Promo;