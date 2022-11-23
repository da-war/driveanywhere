import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserContext } from "../context/userContext";
import { TripsContext } from "../context/tripsContext";

const PendingScreen = () => {
  const trips = React.useContext(TripsContext);
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    filterMyData();
  }, []);
  const userId = user.id;

  //filter trips where id is equal to userId
  const filterMyData = () => {
    const filteredTrips = trips.filter((trip) => trip.driverId === userId);
    //get all the filtered trips where status is pending
    const pendingTrips = filteredTrips.filter(
      (trip) => trip.requestStatus === "pending"
    );
  };

  const onPressAccept = (item) => {
    const data = {
      requestStatus: "upcoming",
    };
    const docRef = doc(db, "trips", item.docID);
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onPressReject = (item) => {
    const data = {
      requestStatus: "rejected",
    };
    const docRef = doc(db, "trips", item.docID);
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <Text>PendingScreen</Text>
    </View>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({});
