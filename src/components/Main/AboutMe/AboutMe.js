import React from "react";
import studentsPhoto from './../../../images/students_photo.jpg';
import Portfolio from '../Portfolio/Portfolio.js'

function AboutMe() {
  return (
    // Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
    // и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
    <section className="AboutMe">
      <h2 className="title-block" id="aboutMe">Студент</h2>
      <div className="about-me__student-photo-box">
        <div className="about-me__about-student-box">
          <div>
            <h3 className="title-description">Алексей</h3>
            <p className="about-me__about">Frontend-разработчик, 31 год</p>
            <p className="description-text">Я родился в Москве и долгое время тут же и жил, но год назад с семьёй переехали жить в город Долгопрудный. Имею высшее образование - закончил экономический факультет. Женат и есть маленький сын.
            </p>
            <p className="description-text">Люблю кошариков (всех животных), море, Вселенную и Землю &#128008; &#127754; &#127756; &#127758; </p>
            <p className="description-text">Получить новую для себя профессию решил по многим факторам, и очень рад тому, что это решение было принято и выполнено.</p>
            <p className="description-text">Какие планы на будущее: это - профессиональное развитие, познание нового и много-много чтения! Очень хочу выучить английский язык &#128540;</p>
          </div>
          <ul className="about-me__contacts">
            <li><a href="https://vk.com/id2895043" target="_blank" rel='noreferrer'>Вконтакте</a></li>
            <li><a href="https://github.com/Lehano-A" target="_blank" rel='noreferrer'>Github</a></li>
          </ul>
        </div>

        <img className="about-me__photo" src={studentsPhoto} alt="Фотография студента факультета веб-разработки"></img>

      </div>

      <Portfolio />

    </section>

  )
}

export default AboutMe;