import React, {useEffect} from "react"
import {Link } from "react-router-dom";

const NavBar = ({token, setToken}) => {
  

  useEffect(() => {
    const renderPage = async () => {
      if (token){
        renderPage()
      }
    }
  }, [token]);

  return (
    <nav>
      <Link to="/">Home |</Link>
      <Link to="/products"> Products |</Link>
      {token
        ?
        <>
        <Link to="/account/me"> My Profile |</Link>
        <Link to = "/" 
          onClick={() => {localStorage.clear(); setToken("")}}
          >Log Out</Link>
        </>
        : <Link to = "/account/login"> Login/Register</Link>}
    </nav>
  );
};

export default NavBar;
