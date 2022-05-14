import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, id, isAdmin, setToken, setLoggedIn, loggedIn }) => {
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
          {loggedIn && isAdmin === "true"
          ? <Link to="/account/users" className="links">
            USERS |
          </Link>
          : null
          }
          {loggedIn ? (
            <>
              <Link to={`/account/me/${id}`} className="links">
                {" "}
                My Profile |
              </Link>
              <Link
                to="/"
                className="links"
                onClick={() => {
                  localStorage.clear();
                  setToken("");
                  setLoggedIn(false)
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
