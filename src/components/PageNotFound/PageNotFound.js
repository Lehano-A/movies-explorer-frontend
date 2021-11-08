import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function PageNotFound({ handlePageNotFoundOpened }) {

  useEffect(() => {
    handlePageNotFoundOpened();
  }, [])

  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className="PageNotFound">
      <h1 className="page-not-found__title">404</h1>

      <p className="page-not-found__description">Страница не найдена</p>
      <Link onClick={goBack} className="page-not-found__back">Назад</Link>
    </div>
  )
}

export default PageNotFound;