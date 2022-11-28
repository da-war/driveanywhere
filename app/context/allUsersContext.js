import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const AllUsersContext = React.createContext("");

const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = React.useState([]);

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
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", users);
    }, 2000);
  }, []);

  return (
    <AllUsersContext.Provider value={{ users, setUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

export { AllUsersContext, AllUsersProvider };
