import React from "react";


function More({ isDisplayButtonShowMore = false, handleButtonShowMore }) {

  return (
    <div className={"more"}>
      <button
        onClick={handleButtonShowMore}
        className={`${isDisplayButtonShowMore ? "more__button-more_visible" : ""}  more__button-more`}
      >
        Ещё
      </button>
    </div>
  )
}

export default More;