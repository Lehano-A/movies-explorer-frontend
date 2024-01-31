import { useHistory } from 'react-router';


function useRedirect() {

  const history = useHistory()


  // ПЕРЕЙТИ НА ОСНОВНУЮ СТРАНИЦУ
  function goToMainPage() {
    history.push('/');
  }


  // ПЕРЕЙТИ НА СТРАНИЦУ С ФИЛЬМАМИ
  function goToMoviesPage() {
    history.push('/movies');
  }



  return {
    goToMainPage,
    goToMoviesPage
  }
}

export default useRedirect