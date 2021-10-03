import React from "react";

function AboutProject() {

  return (
    <section className="AboutProject">
      <h2 className="title-block" id="aboutProject">О проекте</h2>

      <div className="about-project__info-box">

        <div className="about-project__text-box">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="description-text"> Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__text-box">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>

      </div>

      <div className="about-project__scale">
        <div className="about-project__scale-backend-box">
          <div className="about-project__scale-backend">
            <p className="about-project__scale-range-time">1 неделя</p>
          </div>
          <p className="about-project__scale-range-title">Back-end</p>
        </div>
        <div className="about-project__scale-frontend-box">
          <div className="about-project__scale-frontend">
            <p className="about-project__scale-range-time">4 недели</p>
          </div>
          <p className="about-project__scale-range-title">Front-end</p>
        </div>
      </div>

    </section >
  )
}

export default AboutProject;