import React, { useEffect } from "react";
import { useHistory } from "react-router";

function PageNotFound({ handlePageNotFoundOpened }) {

  useEffect(() => {
    handlePageNotFoundOpened()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <>
      <div className="PageNotFound">
        <h1 className="page-not-found__title">404</h1>

        <p className="page-not-found__description">Страница не найдена</p>
        <p onClick={goBack} className="page-not-found__back">Назад</p>
      </div>

    </>
  )

}

export default PageNotFound;