import {
  Alert,
  Linking,
  Modal,
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
import CircleButton from "../components/CircleButton";
import colors from "../config/colors";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import { TripsContext } from "../context/tripsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  getUserAndSendNotification,
  rideCompletedNotification,
} from "../globalFunctions/global";
import { sendNotification } from "../api/expoPushTokens";
import { AllUsersContext } from "../context/allUsersContext";

const InProgressTripPage = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const data = route.params;
  const myNavigation = useNavigation();
  const { trips, setTrips } = React.useContext(TripsContext);
  const { users, setUsers } = React.useContext(AllUsersContext);

  //with Linking call the phone number
  const handleCallAdmin = () => {
    const phoneNumber = `tel:${data.admin.phone}`;
    Linking.openURL(phoneNumber);
  };

  const handleMarkComplete = async (item) => {
    setLoading(true);
    const data = {
      requestStatus: "completed",
      completedTime: moment().format("DD MMMM YYYY hh:mm:ss a"),
    };

    const docRef = doc(db, "trips", item.docID);
    updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
        getTrips();
        setLoading(false);
        Alert.alert("Ride Complete");
        if (item.admin.token) {
          const adminId = item.adminId;
          const tripId = item.tripId;
          const bodyRequest =
            "Driver marked trip as completed: Trip ID: " + tripId;
          const route = "completed";
          getUserAndSendNotification(adminId, users, bodyRequest, route);
        }
        rideCompletedNotification();
        setIsCompleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTrips = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //function to send local notification to driver

  return (
    <>
      <AppScreen>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <AppHeader
              title="In Progress Ride"
              onPress={() => myNavigation.goBack()}
            />

            {data && (
              <View style={{ flex: 1 }}>
                <View style={styles.block}>
                  <Text style={styles.headings}>Trip Details</Text>
                  <WithHeading
                    data={data.arrivalLocation}
                    heading="Pick Up Location :"
                  />
                  <WithHeading data={data.date} heading="Pick Up on Date :" />
                  <WithHeading data={data.time} heading="Pick Up Tizme :" />
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
                <View style={styles.cBtn}>
                  <CircleButton
                    title="Add Comment"
                    bgColor="tomato"
                    icon="chat-plus"
                    onPress={() => navigation.navigate("commentscreen", data)}
                  />
                  <CircleButton
                    title="Add Stay"
                    bgColor={colors.black}
                    icon="clock-time-nine"
                    onPress={() => navigation.navigate("stayscreen", data)}
                  />
                </View>

                <View style={styles.block}>
                  <AppButton
                    icon="phone"
                    title="Call Admin"
                    onPress={handleCallAdmin}
                  />
                  <AppButton
                    color={COLORS.secondary}
                    title="Mark Trip Complete"
                    onPress={() => handleMarkComplete(data)}
                  />
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
      <Modal visible={isCompleted}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/done.json")}
          />

          <View style={styles.absoluteModalButton}>
            <AppButton
              title="Go Back"
              onPress={() => navigation.navigate("sdhome")}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InProgressTripPage;

const styles = StyleSheet.create({
  absoluteModalButton: {
    position: "absolute",
    bottom: 25,
    left: 25,
    right: 25,
  },
  block: {
    marginVertical: 25,
    marginHorizontal: 17,
  },
  cBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  titleScreen: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginLeft: 40,
  },
});
