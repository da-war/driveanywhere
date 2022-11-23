import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import CircleIcon from "./CircleIcon";
import colors from "../config/colors";
import { FONTS, SHADOWS } from "../constants";
import AppButton from "./AppButton";
const PendingCard = ({
  arrivalLocation,
  time,
  date = "16 June 2022",
  icon = "location-enter",
  customerName = "Rana Dawar Abdullah",
  phoneNumber = "0123456789",
  destination,
  btnOne = "Accept",
  btnTwo = "Reject",
  onPressAccept,
  onPressReject,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>
          Pick Up Time: {"  "}
          {time}
        </Text>
      </View>
      <View>
        <Text style={styles.date}>
          On Date:{"  "}
          {date}
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
        <Text style={styles.headings}>Drop off Location:{"  "}</Text>
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

      <View style={styles.customerTextContainer}>
        <Text>Passenger Name:</Text>
        <View style={styles.cnameContainer}>
          <Text style={styles.cnameText}>{customerName}</Text>
        </View>
      </View>
      <View style={styles.customerTextContainer}>
        <Text>Passenger Phone:</Text>
        <View style={styles.cnameContainer}>
          <Text style={styles.cnameText}>{phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          title="Accept"
          color={colors.secondary}
          onPress={onPressAccept}
        />
        <AppButton
          title="reject"
          color={colors.danger}
          onPress={onPressReject}
        />
      </View>
    </View>
  );
};

export default PendingCard;

const styles = StyleSheet.create({
  arrivalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrivalText: {
    marginLeft: 7,
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  btnContainer: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  beHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 7,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.light,
  },
  date: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
  customerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
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
  headings: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
  },
  mainContainer: {
    padding: 12,
    borderWidth: 5,
    borderColor: colors.border,
    marginVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  timeText: {
    color: colors.white,
    fontFamily: FONTS.medium,
    fontSize: 18,
  },
  timeTextContainer: {
    padding: 7,
    justifyContent: "center",
    backgroundColor: colors.dark,
    borderRadius: 7,
  },
});
