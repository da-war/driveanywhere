import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AllUsersContext } from "../context/allUsersContext";
//hook that gets all the users from the firebase database users collection and returns them
export default useUsers = () => {
  const { users, setUsers } = React.useContext(AllUsersContext);
  const getUsers = async () => {
    try {
      const colRef = collection(db, "users");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setUsers(myData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUsers();
    console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", users);
  }, []);
  return users;
};
