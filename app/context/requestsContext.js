import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../firebase";

const RequestsContext = React.createContext([]);

const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      const q = query(collection(db, "requests"));
      const querySnapshot = await getDocs(q);
      const requests = querySnapshot.docs.map((doc) => doc.data());
      setRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RequestsContext.Provider value={{ requests, setRequests }}>
      {children}
    </RequestsContext.Provider>
  );
};

export { RequestsContext, RequestsProvider };
