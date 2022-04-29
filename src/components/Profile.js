import React, {useEffect} from "react"
// import { profileUser } from "../axios-services";
import SingleOrder from "./SingleOrder";

const Profile = ({token, username, firstName, lastName, email }) => {
  const [user, setUser] = useState({})

    useEffect(() => {
        // const getUserProfile = async () => {
        //     try {
        //         const result = await profileUser()
        //         console.log(result, "result from getUserProfile");
        //         setUser(result)
        //       } catch (error) {
        //         console.error(error)
        //       }
        //     }
        //     getUserProfile(user)
        }, [])

    return (
        <>
          <h1>{firstName} {lastName}'s' Profile!</h1>
          <h3>Username: {username}</h3>
          <h3>Email: {email}</h3>
          <h3>
          <SingleOrder></SingleOrder>
          </h3>
          <br></br>
      </>
    )
}

export default Profile;