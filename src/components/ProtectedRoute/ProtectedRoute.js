import React from "react";
import { Route, Redirect } from "react-router";
import { parseJSON } from "../../utils/helpers/jsonHandler";

function ProtectedRoute(props) {

  const userAuthorized = parseJSON(localStorage.getItem('dataUser'))

  return (
    <Route path={props.path} >
      {userAuthorized ? props.children : (<Redirect to="/" />)}
    </Route>
  )
}

export default ProtectedRoute;