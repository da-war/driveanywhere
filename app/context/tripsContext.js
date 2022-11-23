import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../firebase";

const TripsContext = React.createContext([]);

const TripsProvider = ({ children }) => {
  const [trips, setTrips] = React.useState([]);

  React.useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    console.log("run run run run run run run run run run run run run run run");
    try {
      const colRef = collection(db, "trips");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      AsyncStorage.setItem("trips", JSON.stringify(myData));
      setTrips(myData);
      console.log("Here is trips", trips);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TripsContext.Provider value={{ trips, setTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export { TripsContext, TripsProvider };
