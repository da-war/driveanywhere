import React from "react";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Alert } from "react-native";

import navigation from "../navigation/rootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default useNotifications = (notificationListener) => {
  const notiResponseListener = React.useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    registerForPushNotificationsAsync();

    notiResponseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (lastNotificationResponse) {
          //console.log(lastNotificationResponse);

          //get the route
          const route = JSON.stringify(
            lastNotificationResponse.notification.request.content.data.route
          );
          //use some function to return the correct screen by route
          getFullPath(JSON.parse(route));
        }
      });
  }, [lastNotificationResponse]);

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

const getFullPath = (route) => {
  switch (route) {
    case "inprogress":
      navigation.navigate("inprogress", {});
      break;
    case "inProgress":
      navigation.navigate("inProgress", {});
      break;
    default:
      navigation.navigate("Home", {});
      break;
  }
};
