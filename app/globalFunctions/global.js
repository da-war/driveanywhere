import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import moment from "moment";
import { sendNotification } from "../api/expoPushTokens";

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

//function to get the value of token field from a doc where the id is the same as inpu
export const getUserAndSendNotification = async (
  id,
  users = [],
  bodyRequest,
  route
) => {
  //find the user with the id in the users array and get the token
  const user = users.find((user) => user.id === id);
  const token = user.token;
  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn", token);
  //send notification to the user
  const message = {
    to: token,
    sound: "default",
    title: "Ride Request",
    body: bodyRequest,
    data: { route: route },
  };

  sendNotification(message);
};

export const getAdminsFromUsersAndSendNotificationToAllAdmins = (
  admins,
  bodyRequest,
  route
) => {
  admins.forEach((admin) => {
    const token = admin.token;
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn", token);
    //send notification to the user
    const message = {
      to: token,
      sound: "default",
      title: "Ride Request",
      body: bodyRequest,
      data: { route: route },
    };

    sendNotification(message);
  });
};
