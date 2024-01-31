import { useState } from "react"


function usePreloader() {

  const [isActivePreloader, setIsActivePreloader] = useState(null)


  // ВКЛЮЧИТЬ ПРЕЛОАДЕР
  function enablePreloader() {
    setIsActivePreloader(true)
  }

  // ВЫКЛЮЧИТЬ ПРЕЛОАДЕР
  function disablePreloader() {
    setIsActivePreloader(false)
  }



  return {
    isActivePreloader,
    enablePreloader,
    disablePreloader
  }
}

export default usePreloader