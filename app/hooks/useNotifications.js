import React from "react";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Alert } from "react-native";

export default useNotifications = (notificationListener) => {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
    if (notificationListener)
      Notifications.addNotificationReceivedListener(() => {
        navigation.navigate("profile");
      });
  }, []);

  //get user permission for the notifications
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        alert("Notification Permission", "You need to allow notifications");
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (token) {
      uploadToken(token);
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
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Something went wrong while registering the Notification");
      });
  };
};
