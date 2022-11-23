import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TripsContext } from "../context/tripsContext";
import colors from "../config/colors";
import { FONTS } from "../constants/index";
import AppTextInput from "../components/AppTextInput";
import Ccard from "../components/Ccard";
import { useNavigation } from "@react-navigation/native";

const AdminUpcomingRides = () => {
  const navigation = useNavigation();
  const { trips, setTrips } = React.useContext(TripsContext);
  const [ridesData, setRidesData] = React.useState([]);

  React.useEffect(() => {
    getRequestedTrips();
  }, []);

  const getRequestedTrips = () => {
    const requestedTrips = trips.filter(
      (trip) => trip.requestStatus === "upcoming"
    );
    setRidesData(requestedTrips);
  };

  const handleSearch = (value) => {
    if (!value.length) return setRidesData(ridesData);

    const filteredData = ridesData.filter((item) =>
      item.tripId.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredData.length) {
      setRidesData(filteredData);
    } else {
      setRidesData(ridesData);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>Upcoming Rides</Text>
      {ridesData.length >= 1 && (
        <View style={styles.mainContainer}>
          <View>
            <AppTextInput
              icon="magnify"
              placeholder="Search by Ride#"
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <ScrollView>
            <FlatList
              data={ridesData}
              keyExtractor={(item) => item.docID.toString()}
              renderItem={({ item }) => (
                <Ccard
                  rideNumber={item.tripId}
                  onPress={() => navigation.navigate("upcomingDetails", item)}
                />
              )}
            />
          </ScrollView>
        </View>
      )}
      {ridesData.length === 0 && (
        <View style={styles.mainContainerNo}>
          <Text style={styles.text}>No Upcoming Rides to show</Text>
        </View>
      )}
    </View>
  );
};

export default AdminUpcomingRides;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  mainContainerNo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 18,
    color: colors.gray,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginVertical: 10,
  },
});
