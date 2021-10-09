import React from "react";
import { Route, Redirect } from "react-router";

function ProtectedRoute({ component: Component, isLoggedIn, path, ...props }) {
  console.log('khjjkhhmjjhkmhgjyrhgnfhgghn')

  return (
    <Route path={path}>
      {isLoggedIn ? (<Component {...props} />) : (<Redirect to="/signin" />)}
    </Route>
  )
}

export default ProtectedRoute;