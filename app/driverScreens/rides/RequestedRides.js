import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import { TripsContext } from "../../context/tripsContext";
import { UserContext } from "../../context/userContext";
import AppScreen from "../../components/AppScreen";
import { FONTS } from "../../constants";
import colors from "../../config/colors";
import PendingCard from "../../components/PendingCard";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendNotification } from "../../api/expoPushTokens";
import { AllUsersContext } from "../../context/allUsersContext";
import { getUserAndSendNotification } from "../../globalFunctions/global";

const RequestedRides = () => {
  const { trips, setTrips } = React.useContext(TripsContext);
  const { user, setUser } = React.useContext(UserContext);
  const [requested, setRequested] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [length, setLength] = React.useState(0);
  const { users, setUsers } = React.useContext(AllUsersContext);

  const navigation = useNavigation();

  React.useEffect(() => {
    filterMyData();
    setLength(requested.length);
  }, [trips, length]);

  const userId = user.id;

  //filter trips where id is equal to userId
  const filterMyData = () => {
    const filteredTrips = trips.filter((trip) => trip.driverId === userId);
    //get all the filtered trips where status is pending
    const requested = filteredTrips.filter(
      (trip) => trip.requestStatus === "pending"
    );
    setRequested(requested);
    const length = requested.length;
    setLength(length);
    navigation.setOptions({
      title: "Requested Rides" + " (" + length + ")",
    });
  };

  const onPressAccept = (item) => {
    setLoading(true);
    const data = {
      requestStatus: "upcoming",
    };
    const docRef = doc(db, "trips", item.docID);
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
        Alert.alert("Trip Accepted");
        getTrips();
        if (item.admin.token) {
          const token = item.admin.token;
          const tripId = item.tripId;
          const bodyRequest = "Driver Accepted to trip: Trip ID: " + tripId;
          const route = "active";
          getUserAndSendNotification(item.admin.id, users, bodyRequest, route);
        }
        navigation.navigate("Upcoming");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPressReject = (item) => {
    setLoading(true);
    const data = {
      requestStatus: "rejected",
      completedTime: "Not Completed",
    };

    const docRef = doc(db, "trips", item.docID);
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
        if (item.admin.token) {
          const token = item.admin.token;
          const tripId = item.tripId;
          const bodyRequest = "Driver Rejected trip: Trip ID: " + tripId;
          const route = "rejected";
          getUserAndSendNotification(item.admin.id, users, bodyRequest, route);
        }
        setLoading(false);
        getTrips();
        Alert.alert("Ride Rejected");
      })
      .catch((error) => {
        console.log(error);
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

  const confirmAccept = (item) =>
    Alert.alert("Accept Ride?", "Are you sure you want to Accept this ride?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes Accept!", onPress: () => onPressAccept(item) },
    ]);

  const confirmReject = (item) =>
    Alert.alert("Cancel Ride?", "Are you sure you want to cancel this ride?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes Cancel!", onPress: () => onPressReject(item) },
    ]);
  return (
    <>
      <AppScreen>
        <View style={{ flex: 1 }}>
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
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 25 }}>
                <Text style={styles.pendingRequests}>
                  Pending Requests({length})
                </Text>
              </View>

              <View style={styles.listContainer}>
                <FlatList
                  data={requested}
                  keyExtractor={(item) => item.docID.toString()}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 10,
                        borderTopWidth: 1,
                        borderTopColor: colors.medium,
                      }}
                    ></View>
                  )}
                  renderItem={({ item }) => (
                    <PendingCard
                      date={item.date}
                      customerName={item.passengerName}
                      time={item.time}
                      destination={item.destination}
                      phoneNumber={item.passengerPhone}
                      arrivalLocation={item.arrivalLocation}
                      onPressAccept={() => confirmAccept(item)}
                      onPressReject={() => confirmReject(item)}
                    />
                  )}
                />
              </View>
              {requested.length == 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.noRidesText}>
                    No Rides in Pending List
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../../assets/animation/carload.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default RequestedRides;

const styles = StyleSheet.create({
  pendingRequests: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: colors.dark,
    textAlign: "center",
  },
  noRidesText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: colors.dark,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});
