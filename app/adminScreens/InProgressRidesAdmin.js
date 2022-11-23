import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants";
import colors from "../config/colors";
import { TripsContext } from "../context/tripsContext";
import Ccard from "../components/Ccard";
import AppTextInput from "../components/AppTextInput";

const InProgressRidesAdmin = () => {
  const navigation = useNavigation();
  const { trips, setTrips } = React.useContext(TripsContext);
  const [ridesData, setRidesData] = React.useState([]);

  React.useEffect(() => {
    getInProgressTrips();
  }, []);

  const getInProgressTrips = () => {
    const inProgressTrips = trips.filter(
      (trip) => trip.requestStatus === "inprogress"
    );
    setRidesData(inProgressTrips);
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
    <AppScreen>
      <AppHeader title="InProgress Rides" onPress={() => navigation.goBack()} />
      {ridesData.length > 0 && (
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>All InProgress Rides</Text>
          <View>
            <AppTextInput
              icon="magnify"
              placeholder="Search by Ride#"
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <FlatList
            data={ridesData}
            renderItem={({ item }) => (
              <Ccard
                rideNumber={item.tripId}
                onPress={() => navigation.navigate("inProgressDetail", item)}
              />
            )}
          />
        </View>
      )}
      {ridesData.length === 0 && (
        <View style={styles.mainContainerFree}>
          <Text style={styles.titleText}>No InProgress Rides</Text>
        </View>
      )}
    </AppScreen>
  );
};

export default InProgressRidesAdmin;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginVertical: 15,
    alignSelf: "center",
    color: colors.gray,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  mainContainerFree: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
