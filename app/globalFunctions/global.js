import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import moment from "moment";

export const showRideSendNotification = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Ride Request",
      body: "You have created a new ride request",
    },
    trigger: {
      seconds: 5,
    },
  });
};

export const rideCompletedNotification = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Ride Completed",
      body: "You have completed a ride",
    },
    trigger: {
      seconds: 20,
    },
  });
};

export function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getData = async (setUser) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      //store data in AsyncStorage as user
      setUser(docSnap.data());
      AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

//function that takes a date as input and returns the time in format hh:mm am/pm
export const getTime = (date) => {
  return moment(date).format("hh:mm a");
};

//function that takes a date as input and returns the date in format dddd, MMMM Do YYYY
export const getDate = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY");
};
