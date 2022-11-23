import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { TripsContext } from "../../context/tripsContext";
import { UserContext } from "../../context/userContext";
import AppScreen from "../../components/AppScreen";
import { FONTS } from "../../constants";
import colors from "../../config/colors";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import UpcomingCard from "../../components/UpcomingCard";

const UpcomingRides = () => {
  const { trips, setTrips } = React.useContext(TripsContext);
  const { user, setUser } = React.useContext(UserContext);
  const [requested, setRequested] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [length, setLength] = React.useState(0);

  const navigation = useNavigation();

  React.useEffect(() => {
    filterMyData();
  }, [trips, length]);

  const userId = user.id;

  //filter trips where id is equal to userId
  const filterMyData = () => {
    const filteredTrips = trips.filter((trip) => trip.driverId === userId);
    //get all the filtered trips where status is pending
    const requested = filteredTrips.filter(
      (trip) => trip.requestStatus === "upcoming"
    );
    setRequested(requested);
    const length = requested.length;
    setLength(length);
    navigation.setOptions({
      title: "Upcoming Rides" + " (" + length + ")",
    });
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
          showsVerticalScrollIndicator={false}
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
              Pending Requests({length})
            </Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={requested}
              keyExtractor={(item) => item.currentTime.toString()}
              renderItem={({ item }) => (
                <UpcomingCard
                  arrivalLocation={item.arrivalLocation}
                  destination={item.destination}
                  customerName={item.passengerName}
                  time={item.time}
                  date={item.date}
                  tripId={item.tripId}
                  btnTitle="Check Details"
                  onPress={() => navigation.navigate("upcomingdetails", item)}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default UpcomingRides;

const styles = StyleSheet.create({
  pendingRequests: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: colors.dark,
    textAlign: "center",
  },
});
