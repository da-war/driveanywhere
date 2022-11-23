import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const DriverCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text>DriverCard</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
