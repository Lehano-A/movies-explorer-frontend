import React from "react";
import { Route, Redirect } from "react-router";
import checkUserLoggedIn from "../../utils/helpers/checkUserLoggedIn";


function ProtectedRoute({ path, children }) {

  const isLoggedIn = checkUserLoggedIn()

  return (
    <Route path={path} >
      {isLoggedIn ? children : (<Redirect to="/" />)}
    </Route>
  )
}

export default ProtectedRoute;