import React from "react";

function Portfolio() {

  return (

    <section className="Portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__works">
        <li><a href="https://github.com/Lehano-A/how-to-learn" target="_blank" rel='noreferrer'>Статичный сайт</a></li>
        <li><a href="https://github.com/Lehano-A/russian-travel" target="_blank" rel='noreferrer'>Адаптивный сайт</a></li>
        <li><a href="https://github.com/Lehano-A/mesto-react" target="_blank" rel='noreferrer'>Одностраничное приложение</a></li>
      </ul>
    </section>

  )

}

export default Portfolio;