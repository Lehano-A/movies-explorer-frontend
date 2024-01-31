import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";


function PageNotFound({ setIsPageNotForund }) {

  const history = useHistory()


  useEffect(() => {
    setIsPageNotForund(true)

    return () => setIsPageNotForund(null)
  }, [])



  // ВЕРНУТЬСЯ НАЗАД В ИСТОРИИ БРАУЗЕРА
  function goBack() {
    history.goBack()
  }



  return (
    <div className="page-not-found">
      <h1 className="page-not-found__title">404</h1>

      <p className="page-not-found__description">Страница не найдена</p>
      <Link onClick={goBack} className="page-not-found__back">Назад</Link>
    </div>
  )
}

export default PageNotFound;