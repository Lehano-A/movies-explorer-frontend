import React from "react";
import practicum_logo from './../../../images/practicum_logo.svg';

function Promo() {

  return (

    <section className="Promo">

      <div className="promo__title-box">
        <img className="promo__practicum-logo" src={practicum_logo} alt="Логотип Практикума"></img>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>

      <nav className="promo__info-buttons">
        <button className="promo__button-info">О проекте</button>
        <button className="promo__button-info">Технологии</button>
        <button className="promo__button-info">Студент</button>
      </nav>
      
    </section>

  )

}

export default Promo;