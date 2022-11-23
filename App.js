import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import colors from "./app/config/colors";
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import DriverAppNavigator from "./app/navigation/driver/DriverAppNavigator";
import { UserProvider } from "./app/context/userContext";
import { DriversProvider } from "./app/context/driversContext";
import { StateProvider } from "./app/context/StateContext";
import { TripsProvider } from "./app/context/tripsContext";
import { InProgressProvider } from "./app/context/InProgressTripsContext";
import { navigationRef } from "./app/navigation/rootNavigation";
import { RequestsProvider } from "./app/context/requestsContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light,
  },
};

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebaseAuthState();
  }, []);

  const firebaseAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  const [fontsLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  if (user) {
    return (
      <StateProvider>
        <UserProvider>
          <DriversProvider>
            <TripsProvider>
              <RequestsProvider>
                <InProgressProvider>
                  <NavigationContainer ref={navigationRef} theme={theme}>
                    <DriverAppNavigator />
                  </NavigationContainer>
                </InProgressProvider>
              </RequestsProvider>
            </TripsProvider>
          </DriversProvider>
        </UserProvider>
      </StateProvider>
    );
  } else {
    return (
      <NavigationContainer theme={theme}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
