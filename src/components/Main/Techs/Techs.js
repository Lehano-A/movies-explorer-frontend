import React from "react";

function Tech() {
  return (

    <section className="Techs">
      <h2 className="title-block" id="techs">Технологии</h2>
      <div className="techs__info-box">
        <h3 className="title-description">7 технологий</h3>
        <p className="description-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__used-techs">
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React</li>
        <li>Git</li>
        <li>Express.js</li>
        <li>mongoDB</li>
      </ul>
    </section>

  )
}

export default Tech;


