import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const SingleUser = ({token}) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setisAdmin] = useState(false)

  useEffect(() => {
    const getSingleUser = async () => {
      const singleUser = await callApi({
        url: `/api/account/users/${userId}`,
        token,
        method: "GET",
        data: {
          id: userId
        }
      });
      setUser(singleUser.data);
    };

    getSingleUser();
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const editedUser = await callApi({
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
      console.log(editedUser, "Admin editing user");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="editContainer">
        <div className="OldContainer">
          <div className="card__text">
            <h1>PREVIOUS ENTRY</h1>
            {/* <div key={user.id}> */}
              <div id="singleTextContainer">
                <p className="single__subtitle">User's Name: {user.firstName} {user.lastName}</p>
                <p className="single__subtitle">
                  User's Email: {user.email}
                </p>
                <p className="single__subtitle">
                  User's Username: ${user.username}
                </p>

                {user.isAdmin === true
                  ? <p className="single__subtitle">
                    Is the user an Admin?: YES
                  </p>
                  : <p className="single__subtitle">
                  Is the user an Admin?: NO
                </p>
                }
              </div>
            {/* </div> */}
          </div>
        </div>
        <div className="NewContainer">
          <div className="card__text">
            <h1>NEW ENTRY</h1>
            {/* <div key={product.id}> */}
            <form class="input" onSubmit={handleSubmit}>
              <div id="singleTextContainer">
                <label>User First Name:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder={user.firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                <br></br>
                <label>User Last Name:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder={user.lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                <br></br>
                <label>User's Email:</label>
                <input
                  class="editInput"
                  type="email"
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br></br>
                <label>User's Username:</label>
                <input
                  class="editInput"
                  type="text"
                  placeholder={user.username}
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
