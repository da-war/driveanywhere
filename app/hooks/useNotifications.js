import React from "react";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Alert } from "react-native";

import navigation from "../navigation/rootNavigation";
import { StateContext } from "../context/StateContext";
import { UserContext } from "../context/userContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default useNotifications = (notificationListener) => {
  const notiResponseListener = React.useRef();
  const { state, setState } = React.useContext(StateContext);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    registerForPushNotificationsAsync();

    notiResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //code to handle notification response and take user to screens based on the response.data
        console.log("response", response.notification.request.content.data);

        if (response.notification.request.content.data.route === "inProgress") {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("inProgress");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "inprogress"
        ) {
          setState("driver");
          setTimeout(() => {
            navigation.navigate("inprogress");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "sdrides"
        ) {
          setState("driver");
          setTimeout(() => {
            navigation.navigate("sdrides");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "rejected"
        ) {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("rejectedRides");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "accepted"
        ) {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("adminRides");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "completed"
        ) {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("adminmycomplete");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "active"
        ) {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("adminRides");
          }, 700);
        } else if (
          response.notification.request.content.data.route ===
          "driverCancelTrip"
        ) {
          setState("driver");
          setTimeout(() => {
            navigation.navigate("canceledrides");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "driverRequest"
        ) {
          setState("admin");
          setTimeout(() => {
            navigation.navigate("driverrequests");
          }, 700);
        } else if (
          response.notification.request.content.data.route === "nowdriver"
        ) {
          setState("driver");
          setTimeout(() => {
            navigation.navigate("sdhome");
          }, 700);
        }
      });
  }, []);

  //get user permission for the notifications
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device?.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        Alert.alert(
          "Notification Permission",
          "You need to allow notifications"
        );
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Token", token);
      if (token) {
        await uploadToken(token);
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }
  };

  const uploadToken = async (token) => {
    const userToken = token;
    const data = {
      token: userToken,
    };
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Document written ");
        Alert.alert("Token uploaded successfully");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Something went wrong while registering the Notification");
      });
  };
};
