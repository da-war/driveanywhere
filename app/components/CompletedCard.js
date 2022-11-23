import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import CircleIcon from "./CircleIcon";
import colors from "../config/colors";
import { FONTS } from "../constants";
import AppButton from "./AppButton";
const CompletedCard = ({
  arrivalLocation,
  destination,
  time,
  date = "16 June 2022",
  icon = "location-enter",
  btnTitle = "See Details",
  customerName = "Rana Dawar Abdullah",
  onPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.timeTextContainer}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.timeText}>
          Pick Up Location: {time}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <Text style={styles.innerHeading}>Pick Up Location</Text>
      <View style={styles.arrivalContainer}>
        <CircleIcon icon={icon} />
        <Text style={styles.arrivalText}>{arrivalLocation}</Text>
      </View>
      <View style={styles.customerTextContainer}>
        <Text>Passenger Name:</Text>
        <View style={styles.cnameContainer}>
          <Text style={styles.cnameText}>{customerName}</Text>
        </View>
      </View>
      <Text style={styles.innerHeading}>Pick Up Location</Text>
      <View style={styles.arrivalContainer}>
        <CircleIcon icon="location-exit" />
        <Text style={styles.arrivalText}>{destination}</Text>
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
  );
};

export default CompletedCard;

const styles = StyleSheet.create({
  arrivalContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  arrivalText: {
    marginLeft: 7,
    fontFamily: FONTS.regular,
    fontSize: 12,
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
  dateContainer: {},
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
    borderWidth: 3,
    borderColor: colors.border,
    marginVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 25,
    overflow: "hidden",
    marginHorizontal: 17,
  },
  timeText: {
    color: colors.white,
    fontFamily: FONTS.semiBold,
    fontSize: 18,
  },
  timeTextContainer: {
    padding: 7,
    justifyContent: "center",
    backgroundColor: colors.dark,
    alignItems: "center",
  },
});
