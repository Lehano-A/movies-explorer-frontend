import React from "react";

function Error({ popup, handleOpenPopup }) {

  return (

    <div onClick={handleOpenPopup} className={`error__popup ${popup.active && 'error__popup_active'}`}>
      <p className="error__message">{popup.message}</p>
    </div>
  )
}

export default Error;