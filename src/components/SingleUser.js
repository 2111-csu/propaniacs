import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { callApi } from "../axios-services";

const SingleUser = ({token}) => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setisAdmin] = useState(false)

  useEffect(() => {
    try {
    const getSingleUser = async () => {
      const singleUser = await callApi({
        url: `/api/account/users/${userId}`,
        method: "GET",
        token,
      });
      setUser(singleUser.data);
    };

    getSingleUser(userId);
    } catch (error) {
      console.error(error);
    }
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await callApi({
        url: `/api/account/users/${userId}`,
        method: "PATCH",
        token,
        data: {
          firstName,
          lastName,
          email,
          username,
          isAdmin,
        },
      });
      history.push("/account/users");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event, userId) => {
    event.preventDefault();
    try {
      await callApi({
        url: `/api/account/users/${userId}`,
        token,
        method: "DELETE",
      });

      history.push("/account/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="editContainer">
        <div class="OldContainer">
          <div class="card__text">
            <h1>PREVIOUS ENTRY</h1>
            <div key={user.id}>
              <div id="singleTextContainer">
                <p class="single__subtitle">User's Name: {user.firstName} {user.lastName}</p>
                <br></br>
                <p class="single__subtitle">
                  User's Email: {user.email}
                </p>
                <br></br>
                <p class="single__subtitle">
                  User's Username: {user.username}
                </p>
                <br></br>
                {user.isAdmin === true
                  ? <p class="single__subtitle">
                    Is the user an Admin?: YES
                  </p>
                  : <p class="single__subtitle">
                  Is the user an Admin?: NO
                </p>
                } 
                <div id="adminAddProd">
                  <button
                    class="adminButton"
                    type="submit"
                    onClick={(event) => handleDelete(event, user.id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="NewContainer">
          <div class="card__text">
            <h1>EDIT USER</h1>
            {/* <div key={product.id}> */}
              <form class="input" onSubmit={handleSubmit}>
              <div id="singleTextContainer">
                <label>User First Name:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <br></br>
                <label>User Last Name:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                <br></br>
                <label>User's Email:</label>
                <input
                  class="editInput"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br></br>
                <label>User's Username:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <br></br>
                <label>Is User an Admin? </label>
                <input
                  type="checkbox"
                  placeholder=""
                  value={isAdmin}
                  onChange={(e) => setisAdmin(true)}
                ></input>
                <div id="center">
                  <button type="submit">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
