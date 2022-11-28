import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import AppScreen from "../components/AppScreen";
import BackButton from "../components/BackButton";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { db } from "../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TripsContext } from "../context/tripsContext";
import { UserContext } from "../context/userContext";
import { sendNotification } from "../api/expoPushTokens";
import { Modal } from "react-native";

import LottieView from "lottie-react-native";
import { AllUsersContext } from "../context/allUsersContext";
import { getUserAndSendNotification } from "../globalFunctions/global";
import moment from "moment";

const UpcomingDetailsScreen = ({ navigation, route }) => {
  const data = route.params;
  const myNavigation = useNavigation();

  const { user, setUser } = React.useContext(UserContext);
  const { users, setUsers } = React.useContext(AllUsersContext);

  const { trips, setTrips } = React.useContext(TripsContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    filterMyData();
  }, [trips]);

  const userId = user.id;

  //filter trips where id is equal to userId
  const filterMyData = () => {
    const filteredTrips = trips.filter((trip) => trip.driverId === userId);
    //get all the filtered trips where status is pending
    const requested = filteredTrips.filter(
      (trip) => trip.requestStatus === "upcoming"
    );
    const length = requested.length;
  };

  const startTrip = (myData) => {
    setLoading(true);
    const newData = {
      requestStatus: "inprogress",
      startTime: moment().format("DD MMMM YYYY hh:mm:ss a"),
    };
    const docRef = doc(db, "trips", myData.docID);
    updateDoc(docRef, newData)
      .then((docRef) => {
        Alert.alert("Trip Started");
        getTrips();
        if (myData.admin) {
          const adminId = myData.adminId;
          const tripId = myData.tripId;
          const bodyRequest = "Driver started trip: Trip ID: " + tripId;
          const route = "inProgress";
          getUserAndSendNotification(adminId, users, bodyRequest, route);
        }
        setLoading(false);
        Alert.alert("Trip Started");
        navigation.navigate("In-Progress");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert("Error", error.message);
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
  //with Linking call the phone number
  const callNumber = (phone) => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };
  return (
    <>
      <AppScreen>
        <AppHeader
          title="Upcoming Ride"
          onPress={() => myNavigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            {data && (
              <View style={{ flex: 1 }}>
                <View style={styles.block}>
                  <Text style={styles.headings}>Trip Details</Text>
                  <WithHeading
                    data={data.arrivalLocation}
                    heading="Pick Up Location :"
                  />
                  <WithHeading data={data.date} heading="Pick Up on Date :" />
                  <WithHeading data={data.time} heading="Pick Up Time :" />
                  <WithHeading data={data.destination} heading="Destination:" />
                </View>
                <View style={styles.block}>
                  <Text style={styles.headings}>Passenger Details</Text>
                  <WithHeading
                    data={data.passengerName}
                    heading="Passenger Name:"
                  />
                  <WithHeading
                    data={data.passengerPhone}
                    heading="Passenger Phone Number :"
                  />
                </View>

                <View style={styles.block}>
                  <AppButton
                    title="Start Trip"
                    onPress={() => startTrip(data)}
                  />
                  <View style={styles.sameRow}>
                    <AppButton
                      color={COLORS.secondary}
                      title="Call Passenger"
                      onPress={() => {
                        callNumber(data.passengerPhone);
                      }}
                    />
                    <AppButton
                      color={colors.danger}
                      title="Call Admin"
                      onPress={() => {
                        callNumber(data.admin.phone);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            {!data && (
              <View>
                <Text>No Data</Text>
                <AppButton title="In-progress Trips" />
              </View>
            )}
          </ScrollView>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default UpcomingDetailsScreen;

const styles = StyleSheet.create({
  block: {
    marginVertical: 25,
    marginHorizontal: 17,
  },
  headingText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 25,
  },
  headings: {
    marginHorizontal: 17,
    textAlign: "center",
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginBottom: 15,
  },
  sameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginLeft: 40,
  },
});
