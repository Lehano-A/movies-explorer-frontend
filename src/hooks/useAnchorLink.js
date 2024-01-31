import { useState, useEffect } from "react";


function useAnchorLink() {

  const [anchorLink, setAnchorLink] = useState({ isActive: null, id: null }) // ЯКОРНАЯ ССЫЛКА (ПЛАВНАЯ ПРОКРУТКА)


  useEffect(() => {
    if (anchorLink.isActive) {
      handleSmoothScrollingToAnchor();
    }
  }, [anchorLink])



  // ОБРАБОТАТЬ КЛИК ПО ЯКОРНОЙ ССЫЛКЕ
  function handleClickAnchorLink(e) {
    e.preventDefault()

    const elementId = e.target.parentNode.hash.substr(1);
    setAnchorLink({ isActive: true, id: elementId });
  }



  // ОБРАБОТАТЬ ПЛАВНОЕ ПРОКРУЧИВАНИЕ К ЯКОРЮ
  function handleSmoothScrollingToAnchor() {
    const anchor = document.getElementById(anchorLink.id);

    anchor.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setAnchorLink({ isActive: false, id: null });
  }



  return { handleClickAnchorLink }
}


export default useAnchorLink