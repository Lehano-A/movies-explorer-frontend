import React from "react";
import studentsPhoto from './../../../images/students_photo.jpg';
import Portfolio from '../Portfolio/Portfolio.js'

function AboutMe() {
  return (

    <section className="AboutMe">
      <h2 className="title-block" id="aboutMe">Студент</h2>
      <div className="about-me__student-photo-box">
        <div className="about-me__about-student-box">
          <div>
            <h3 className="title-description">Алексей</h3>
            <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
            <p className="description-text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <ul className="about-me__contacts">
            <li><a href="https://vk.com/id2895043" target="blank">Вконтакте</a></li>
            <li><a href="https://github.com/Lehano-A" target="blank">Github</a></li>
          </ul>
        </div>

        <img className="about-me__photo" src={studentsPhoto} alt="Фотография студента факультета веб-разработки"></img>

      </div>

      <Portfolio />

    </section>

  )
}

export default AboutMe;