import React from "react";
import studentsPhoto from './../../../images/students_photo.jpg';
import Portfolio from './../Portfolio/Portfolio.js'

function Student() {
  return (

    <section className="Student">
      <h2 className="title-block">Студент</h2>
      <div className="student__about-student-photo-box">
        <div className="student__about-student-box">
          <div>
            <h3 className="title-description">Алексей</h3>
            <p className="student__about">Фронтенд-разработчик, 30 лет</p>
            <p className="description-text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <ul className="student__contacts">
            <li>Вконтакте</li>
            <li>Github</li>
          </ul>
        </div>

        <img className="student__photo" src={studentsPhoto} alt="Фотография студента факультета веб-разработки"></img>

      </div>

      <Portfolio />

    </section>

  )
}

export default Student;