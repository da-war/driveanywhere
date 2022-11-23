import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const DriversContext = React.createContext("");

const DriversProvider = ({ children }) => {
  const [drivers, setDrivers] = React.useState([]);

  React.useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    try {
      const q = query(collection(db, "users"), where("isDriver", "==", true));
      const querySnapshot = await getDocs(q);
      const drivers = querySnapshot.docs.map((doc) => doc.data());
      AsyncStorage.setItem("drivers", JSON.stringify(drivers));
      setDrivers(drivers);
      console.log("Here is drivers", drivers);
      setDrivers(drivers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DriversContext.Provider value={{ drivers, setDrivers }}>
      {children}
    </DriversContext.Provider>
  );
};

export { DriversContext, DriversProvider };
