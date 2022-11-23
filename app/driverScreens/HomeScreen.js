import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import colors from "../config/colors";
import AdminCard from "../components/AdminCard";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import { UserContext } from "../context/userContext";
import { FONTS } from "../constants";
import { TripsContext } from "../context/tripsContext";
import { InProgressContext } from "../context/InProgressTripsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userDataLoading, setUserDataLoading, user, setUser } =
    React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const { trips, setTrips } = React.useContext(TripsContext);
  const { setMyInProgressTripss, myInProgressTripss } =
    React.useContext(InProgressContext);
  React.useEffect(() => {
    settingInProgress();
    getUser();
    console.log("user", user);
  }, []);

  const getUser = async () => {
    const myUser = await user;
    if (myUser) {
      setUser(myUser);
    }
  };

  const settingInProgress = () => {
    const inProgressTrips = trips.filter(
      (trip) => trip.status === "inProgress"
    );
    setMyInProgressTripss(inProgressTrips);
    console.log("inProgressTrips", inProgressTrips);
    console.log("hello hello hello");
  };

  return (
    <>
      {user && (
        <AppScreen>
          <AppHeader icon="car-back" title="Dashboard" />
          {myInProgressTripss.length > 0 && (
            <TouchableOpacity style={styles.inProgressContainer}>
              <Text style={styles.inProgressText}>
                One in Progress Trip Go to Trip Page!
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.mainContainer}>
            {user.isDriver && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                <View style={styles.cardsContainer}>
                  <AdminCard
                    source={require("../../assets/icons/rides.png")}
                    title="Active Rides"
                    onPress={() => navigation.navigate("sdrides")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/done.png")}
                    title="Completed Rides"
                    onPress={() => navigation.navigate("completedrides")}
                  />
                </View>
                <View style={styles.cardsContainer}>
                  <AdminCard
                    source={require("../../assets/icons/cancel.png")}
                    title="Cancelled Rides"
                    onPress={() => navigation.navigate("canceledrides")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/tips.png")}
                    title="Tips"
                    onPress={() => navigation.navigate("tipscreen")}
                  />
                </View>
                <View style={styles.cardsContainer}>
                  <AdminCard
                    source={require("../../assets/icons/faqs.png")}
                    title="FAQs"
                    onPress={() => navigation.navigate("faqs")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/problem.png")}
                    title="Report Problem"
                    onPress={() => navigation.navigate("reportproblem")}
                  />
                </View>
              </ScrollView>
            )}
            {!user.isDriver && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                <Text style={styles.welcomeText}>Hello {user.name}!</Text>
                <Text style={styles.detailText}>
                  Please click the following button and send us your Driving
                  License and ID Card for verification. After verification, you
                  will be able to start getting your rides.
                </Text>

                <Text style={styles.thanksText}>Thank You!</Text>
                <AdminCard
                  source={require("../../assets/icons/assign.png")}
                  title="Driver Request"
                  onPress={() => navigation.navigate("notdriver")}
                />
              </ScrollView>
            )}
          </View>
        </AppScreen>
      )}

      <Modal visible={userDataLoading}>
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

export default HomeScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  detailText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    marginVertical: 15,
    color: colors.medium,
  },
  inProgressContainer: {
    backgroundColor: colors.danger,
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  inProgressText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: colors.white,
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    alignSelf: "center",
    marginVertical: 15,

    color: colors.gray,
  },
  thanksText: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    alignSelf: "center",
    marginBottom: 15,
    color: colors.gray,
  },
  helpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
