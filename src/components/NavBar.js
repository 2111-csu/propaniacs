import React, {useEffect} from "react"
import {useHistory, Link } from "react-router-dom";

const NavBar = ({token}) => {

  useEffect(() => {
    // const renderPage = async () => {
    //   if (token){
    //     await fetch(`postgres://localhost:5432/strick-land`)
    //     renderPage()
    //   }
    // }
  }, [token]);

  return (
    <nav>
      <Link to="/">Home |</Link>
      <Link to="/products"> Products |</Link>
      {token
        ?
        <>
        <Link to="/account"> My Profile |</Link>
        <Link to = "/" 
          onClick={() => {localStorage.clear()}}
          >Log Out</Link>
        </>
        : <Link to = "/account/login"> Login/Register</Link>}
    </nav>
  );
};

export default NavBar;
