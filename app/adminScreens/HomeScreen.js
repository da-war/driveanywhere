import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppHeader from "../components/AppHeader";
import AppScreen from "../components/AppScreen";
import { COLORS } from "../constants/index";
import AdminCard from "../components/AdminCard";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/userContext";

import LottieView from "lottie-react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { userDataLoading, setUserDataLoading } = React.useContext(UserContext);
  return (
    <>
      <AppScreen>
        <View style={{ flex: 1 }}>
          <AppHeader icon="car-back" title="Admin Dashboard" />
          <View style={styles.mainContainer}>
            <ScrollView>
              <View>
                <View style={styles.twoCardContainer}>
                  <AdminCard
                    source={require("../../assets/icons/assign.png")}
                    title="Create Trip"
                    onPress={() => navigation.navigate("createtrip")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/inprogesss.png")}
                    title="InProgress Rides"
                    onPress={() => navigation.navigate("inProgress")}
                  />
                </View>

                <View style={styles.twoCardContainer}>
                  <AdminCard
                    source={require("../../assets/icons/rides.png")}
                    title="All Rides"
                    onPress={() => navigation.navigate("adminRides")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/pro.png")}
                    title="All Driver"
                    onPress={() => navigation.navigate("driverprofile")}
                  />
                </View>
                <View style={styles.twoCardContainer}>
                  <AdminCard
                    source={require("../../assets/icons/drivers.png")}
                    title="Driver Requests"
                    onPress={() => navigation.navigate("driverrequests")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/report.png")}
                    title="Get Reports"
                    onPress={() => navigation.navigate("adminmycomplete")}
                  />
                </View>
                <View style={styles.twoCardContainer}>
                  <AdminCard
                    source={require("../../assets/icons/nocar.png")}
                    title="Rejected Rides"
                    onPress={() => navigation.navigate("rejectedRides")}
                  />
                  <AdminCard
                    source={require("../../assets/icons/reported.png")}
                    title="Reported Problems"
                    onPress={() => navigation.navigate("adminreportedproblems")}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </AppScreen>
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
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    height: 150,
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 20,
  },
  twoCardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginHorizontal: 17,
  },
});
