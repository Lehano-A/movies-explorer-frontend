import React from "react";

function Error({ error, handleCloseError }) {

  return (

    <div onClick={handleCloseError} className={`Error ${error.active === true && 'error_active'}`}>
      <p className="error__message">{error.message}</p>
    </div>

  )

}

export default Error;