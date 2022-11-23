import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import React from "react";
import { TripsContext } from "../../context/tripsContext";
import { UserContext } from "../../context/userContext";
import AppScreen from "../../components/AppScreen";
import { FONTS } from "../../constants";
import colors from "../../config/colors";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import UpcomingCard from "../../components/UpcomingCard";

import AsyncStorage from "@react-native-async-storage/async-storage";

const InProgressRides = () => {
  const { trips, setTrips } = React.useContext(TripsContext);
  const { user, setUser } = React.useContext(UserContext);
  const [inProgress, setInProgress] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [length, setLength] = React.useState(0);
  const navigation = useNavigation();

  React.useEffect(() => {
    filterMyData();
  }, [trips, length]);

  React.useLayoutEffect(() => {
    //change header name
    if (length) {
      setTimeout(() => {
        navigation.setOptions({
          title: "InProgress Rides" + " (" + length + ")",
        });
      }, 4000);
    }
  }, []);
  const userId = user.id;

  //filter trips where id is equal to userId
  const filterMyData = () => {
    const filteredTrips = trips.filter((trip) => trip.driverId === userId);
    //get all the filtered trips where status is pending
    const requested = filteredTrips.filter(
      (trip) => trip.requestStatus === "inprogress"
    );
    setInProgress(requested);
    const length = requested.length;
    setLength(length);
    navigation.setOptions({
      title: "Inprogress Rides" + " (" + length + ")",
    });
    console.log("InProgressssssssssssssss", requested);
  };

  const getTrips = async () => {
    setLoading(true);
    console.log("run Requested, run Requested , run Requested, run Requested");
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
      filterMyData();
      console.log("Here is a list of full updated list of Trips", trips);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <AppScreen>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              style={{ flex: 1 }}
              refreshing={loading}
              onRefresh={getTrips}
            />
          }
        >
          <View style={{ marginTop: 25 }}>
            <Text style={styles.pendingRequests}>
              InProgress Rides({length})
            </Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={inProgress}
              keyExtractor={(item) => item.currentTime.toString()}
              renderItem={({ item }) => (
                <UpcomingCard
                  arrivalLocation={item.arrivalLocation}
                  destination={item.destination}
                  customerName={item.passengerName}
                  time={item.time}
                  date={item.date}
                  btnTitle="Check Details"
                  tripId={item.tripId}
                  onPress={() => navigation.navigate("inprogressdetails", item)}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default InProgressRides;

const styles = StyleSheet.create({
  pendingRequests: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: colors.dark,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
});
