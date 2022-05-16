import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";


const AllUsers = ({token}) => {
  const history = useHistory();
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await callApi({
        url: `/api/account/users`,
        token,
        method: "GET"
      });
      setUsers(allUsers.data);
    };

    getAllUsers();
  }, [token]);

  return (
    <>
    <div className="userCards">
      {users.map((user) => {
         return (
          <div key={user.id}>
            <div className="userCard">
              <div className="card__text">
                <div className="card__subtitle">Name: {user.firstName} {user.lastName}</div>
                <br></br>
                <div className="card__subtitle"> Username: {user.username}</div>
                <br></br>
                <div className="card__subtitle"> Email: {user.email}</div>
                <br></br>
                {user.isAdmin === true
                  ?<div id="adminButtonStatus">
                  <div className="card__subtitle"> Is Admin: YES</div>
                  <button
                  class="adminButton"
                  type="submit"
                    onClick={() =>
                    history.push(`/account/users/${user.id}`)
                    }
                  >View User</button>
                  </div>
                  :<div id="adminButtonStatus">
                  <div className="card__subtitle"> Is Admin: NO</div>
                  <button
                  class="adminButton"
                  type="submit"
                    onClick={() =>
                    history.push(`/account/users/${user.id}`)
                    }
                  >View User</button>
                  </div>
                }
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </>
  );
};

export default AllUsers;
