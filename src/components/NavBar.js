import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home |</Link>
      <Link to="/products"> Products |</Link>
      <Link to="/users/me"> My Profile |</Link>
      <Link to="/users/login"> Login |</Link>
      <Link to="/users/register"> Register</Link>
    </nav>
  );
};

export default NavBar;
