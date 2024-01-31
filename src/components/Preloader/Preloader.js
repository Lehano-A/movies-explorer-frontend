import React from 'react'


function Preloader() {

  return (
    <div className={`preloader preloader_active`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
