import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import AppScreen from "../components/AppScreen";
import BackButton from "../components/BackButton";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import CircleButton from "../components/CircleButton";
import colors from "../config/colors";

const TripPage = ({ navigation, route }) => {
  const data = route.params;

  //with Linking call the phone number
  const handleCallAdmin = () => {
    const phoneNumber = `tel:${data.passengerPhone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <AppScreen>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.titleScreen}>Trip Page</Text>
          </View>

          {data && (
            <View style={{ flex: 1 }}>
              <View style={styles.block}>
                <Text style={styles.headings}>Trip Details</Text>
                <WithHeading
                  data={data.arrivalLocation}
                  heading="Pick Up Location :"
                />
                <WithHeading data={data.date} heading="Pick Up on Date :" />
                <WithHeading data={data.time} heading="Pick Up Tizme :" />
                <WithHeading data={data.destination} heading="Destination:" />
              </View>
              <View style={styles.block}>
                <Text style={styles.headings}>Passenger Details</Text>
                <WithHeading
                  data={data.passengerName}
                  heading="Passenger Name:"
                />
                <WithHeading
                  data={data.passengerPhone}
                  heading="Passenger Phone Number :"
                />
              </View>
              <View style={styles.cBtn}>
                <CircleButton
                  title="Add Comment"
                  bgColor="tomato"
                  icon="chat-plus"
                  onPress={() => navigation.navigate("comments", data)}
                />
                <CircleButton
                  title="Add Stay"
                  bgColor={colors.black}
                  icon="clock-time-nine"
                />
              </View>

              <View style={styles.block}>
                <AppButton
                  icon="phone"
                  title="Call Admin"
                  onPress={handleCallAdmin}
                />
                <AppButton
                  color={COLORS.secondary}
                  title="Mark Trip Complete"
                />
              </View>
            </View>
          )}
          {!data && (
            <View>
              <Text>No Data</Text>
              <AppButton title="In-progress Trips" />
            </View>
          )}
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default TripPage;

const styles = StyleSheet.create({
  block: {
    marginVertical: 25,
    marginHorizontal: 17,
  },
  cBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headingText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 25,
  },
  headings: {
    marginHorizontal: 17,
    textAlign: "center",
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginBottom: 15,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginLeft: 40,
  },
});
