import React from "react";
import { Link } from "react-router-dom";

function ProfileButton() {

  return (
    <Link to="/profile" className="ProfileButton">
      <p className="profile-button__text">Аккаунт</p>
      <span className="profile-button__icon"></span>
    </Link>
  )

}

export default ProfileButton;