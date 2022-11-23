import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import AppScreen from "../components/AppScreen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import { FONTS } from "../constants";

import * as yup from "yup";
import BackButton from "../components/BackButton";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import DriverCardPicker from "../components/DriverCardPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DriversContext } from "../context/driversContext";

import LottieView from "lottie-react-native";
import { UserContext } from "../context/userContext";
import { TripsContext } from "../context/tripsContext";
import {
  getDate,
  getTime,
  showRideSendNotification,
} from "../globalFunctions/global";
import { sendNotification } from "../api/expoPushTokens";
import AppFormDatePicker from "../components/forms/AppFormDatePicker";
import AppFormTimePicker from "../components/forms/AppFormTimePicker";
import moment from "moment";

const initialValues = {
  arrivalLocation: "",
  passengerName: "",
  passengerPhone: "",
  destination: "",
  departureTime: "",
  date: "",
  time: "",
  driver: {},
};
const validationSchema = yup.object().shape({
  arrivalLocation: yup.string().required("Required").label("Pick Up Location"),
  passengerName: yup.string().required("Required").label("Passenger Name"),
  passengerPhone: yup
    .string()
    .required("Required")
    .label("Passenger Phone Number"),
  destination: yup.string().required("Required").label("Destination"),
  date: yup.date().required("Required").label("Date"),
  time: yup.date().required("Required").label("Date"),
  driver: yup.object().required("Required").label("Driver"),
});

const CreateTrip = ({ navigation }) => {
  const [myDrivers, setMyDrivers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [handling, setHandling] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const { trips, setTrips } = React.useContext(TripsContext);

  const { drivers, setDrivers } = React.useContext(DriversContext);
  React.useEffect(() => {
    getData();
    console.log("Context Drivers", drivers);
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("drivers");
      if (jsonValue != null) {
        setMyDrivers(JSON.parse(jsonValue));
      } else {
        getDrivers();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getDrivers = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "users"), where("isDriver", "==", true));
      const querySnapshot = await getDocs(q);
      const drivers = querySnapshot.docs.map((doc) => doc.data());
      AsyncStorage.setItem("drivers", JSON.stringify(drivers));
      setMyDrivers(drivers);
      setDrivers(drivers);
      setUpdatedList(drivers);
      console.log("Here is drivers", drivers);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function randomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = async (values) => {
    console.log("print date", values.date);
    setHandling(true);
    try {
      const colRef = collection(db, "trips");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      const newLength = myData.length + 1;
      const newId = "DARN" + newLength;
      const arrivalLocation = values.arrivalLocation;
      const passengerName = values.passengerName;
      const passengerPhone = values.passengerPhone;
      const destination = values.destination;
      const date = getDate(values.date);
      const time = getTime(values.time);
      const admin = user;
      const driver = values.driver;
      const driverId = driver.id;
      const docID = randomString(35);
      const startTime = "";
      const completedTime = "";
      const comments = randomString(37);
      const stays = [];
      //currentTime
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss a");
      const requestStatus = "pending";

      const data = {
        arrivalLocation,
        admin,
        passengerName,
        passengerPhone,
        destination,
        date,
        time,
        docID,
        driver,
        driverId,
        currentTime,
        requestStatus,
        startTime,
        stays,
        completedTime,
        comments,
        adminId: auth.currentUser.uid,
        tripId: newId,
        adminData: user,
      };
      console.log(data);

      //add all in firestore version 9 collection of trips
      setDoc(doc(db, "trips", docID), data)
        .then(() => {
          setHandling(false);
          //add a doc to comments collection with the doucment id = comments
          setDoc(doc(db, "comments", comments), {
            messages: [
              {
                message: "Trip Created",
                user: user,
                time: moment().format("MMMM Do YYYY, h:mm a"),
              },
            ],
          });
          setTrips([...myData, trips]);
          console.log("hehehehehehehehhehehehehehehehhehehehehe", trips);
          Alert.alert("Success", "Trip Assigned Successfully");
          showRideSendNotification();
          const bodyRequest = "You received a ride request Ride ID: " + newId;
          const message = {
            to: driver.token,
            sound: "default",
            title: "Driver Anywhere",
            body: bodyRequest,
            data: { data: "goes here" },
            _displayInForeground: true,
          };
          sendNotification(message);
          navigation.navigate("adminHome");
        })
        .catch((error) => {
          setHandling(false);
          Alert.alert("Error", error.message);
        });

      setTrips(myData);
      console.log("Here is trips", trips);
    } catch (error) {
      setHandling(false);
      console.log(error);
    }
  };

  return (
    <>
      <AppScreen>
        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getDrivers} />
            }
          >
            <View style={styles.screenHeader}>
              <BackButton />
              <Text style={styles.title}>Create a Trip</Text>
            </View>
            <View>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                <AppFormField
                  placeholder="Pick Up Location"
                  name="arrivalLocation"
                />
                <AppFormField placeholder="Destination" name="destination" />
                <AppFormField
                  placeholder="Passenger Name"
                  name="passengerName"
                />
                <AppFormField
                  placeholder="Passenger Phone Number (e.g. +41791234567)"
                  name="passengerPhone"
                />
                <AppFormDatePicker name="date" />
                <AppFormTimePicker name="time" />
                <AppFormPicker
                  placeholder="Select Driver"
                  items={myDrivers}
                  PickerItemComponent={DriverCardPicker}
                  name="driver"
                />
                <SubmitButton title="Assign Trip" />
              </AppForm>
            </View>
          </ScrollView>
        </View>
      </AppScreen>
      <Modal visible={handling}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/car.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 17,
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginBottom: 25,
    textAlign: "center",
    marginTop: 25,
    marginLeft: 50,
  },
});
