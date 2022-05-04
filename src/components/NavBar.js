import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken, loggedIn }) => {
  useEffect(() => {
    // const renderPage = async () => {
    //   if (token){
    //     renderPage()
    //   }
    // }
  }, []);

  return (
    <>
      <div id="title">
        <h1>Strick-Land Propane</h1>
        <nav>
          <Link to="/" className="links">
            Home |
          </Link>
          <Link to="/products" className="links">
            {" "}
            Products |
          </Link>
          {loggedIn ? (
            <>
              <Link to="/account/me" className="links">
                {" "}
                My Profile |
              </Link>
              <Link
                to="/"
                className="links"
                onClick={() => {
                  localStorage.clear();
                  setToken("");
                }}
              >
                {" "}
                Log Out |
              </Link>
            </>
          ) : (
            <Link to="/account/login" className="links">
              {" "}
              Login/Register |
            </Link>
          )}
          <Link to="/cart" className="links">
            {" "}
            Cart |
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
