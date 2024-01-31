import useIdentifyCurrentPathname from "../../../hooks/useIdentifyCurrentPathname"


function ElementsWhenSigninOrSignup() {

  const identifyCurrentPathname = useIdentifyCurrentPathname()


  return (
    <>
      {identifyCurrentPathname.isSignup() && <h1 className="signup__title">Добро пожаловать!</h1>}

      {identifyCurrentPathname.isSignin() && <h1 className="signup__title">Рады видеть!</h1>}
    </>
  )
}

export default ElementsWhenSigninOrSignup