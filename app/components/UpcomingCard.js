import { StyleSheet, Text, View } from "react-native";
import React from "react";

import CircleIcon from "./CircleIcon";
import colors from "../config/colors";
import { FONTS } from "../constants";
import AppButton from "./AppButton";
const UpcomingCard = ({
  arrivalLocation,
  destination,
  time,
  date = "16 June 2022",
  icon = "location-enter",
  btnTitle = "See Details",
  customerName = "Rana Dawar Abdullah",
  tripId,
  onPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.timeTextContainer}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.timeText}>
          Ride#:{"   "} {tripId}
        </Text>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Ride Date: {"  "}
            {date}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Ride Time: {"  "}
            {time}
          </Text>
        </View>

        <View style={styles.beHorizontal}>
          <Text style={styles.headings}>Pick Up Location:{"  "}</Text>
          <View style={styles.arrivalContainer}>
            <CircleIcon icon={icon} />
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={styles.arrivalText}
            >
              {arrivalLocation}
            </Text>
          </View>
        </View>

        <View style={styles.beHorizontal}>
          <Text style={styles.headings}>Drop Off Location:{"  "}</Text>
          <View style={styles.arrivalContainer}>
            <CircleIcon icon="location-exit" />
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={styles.arrivalText}
            >
              {destination}
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <AppButton
            title={btnTitle}
            color={colors.secondary}
            onPress={onPress}
            style={{ paddingHorizontal: 25 }}
          />
        </View>
      </View>
    </View>
  );
};

export default UpcomingCard;

const styles = StyleSheet.create({
  arrivalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrivalText: {
    marginLeft: 7,
    fontFamily: FONTS.medium,
    fontSize: 10,
  },
  headings: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
  },
  beHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 7,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.light,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  customerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 17,
  },
  cnameContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: 20,
  },
  cnameText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginVertical: 8,
  },
  innerHeading: {
    fontSize: 17,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginBottom: 5,
    marginTop: 15,
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.dark,
    marginVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 25,
    overflow: "hidden",
  },
  secondContainer: {
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  timeText: {
    color: colors.white,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
  },
  timeTextContainer: {
    padding: 7,
    justifyContent: "center",
    backgroundColor: colors.dark,
    alignItems: "center",
  },
});
