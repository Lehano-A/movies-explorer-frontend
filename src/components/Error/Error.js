import React from "react";

function Error({ error, handleCloseError }) {
  console.log(error)
  return (
    <div onClick={handleCloseError} className={`Error ${error && 'error_active'}`}>
      <p className="error__message">К сожалению, данный запрос не может быть обработан</p>
    </div>
  )

}

export default Error;