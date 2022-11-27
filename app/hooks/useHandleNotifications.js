import React from "react";
import { Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";

export default function useHandleNotification() {
  React.useEffect(() => {
    handleNotifications();
  }, []);

  const handleNotifications = () => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("response", response);
      Alert.alert("Notification", "You have a new notification");
    });
  };
}
