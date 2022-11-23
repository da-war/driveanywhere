import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import colors from "../config/colors";
import Fcard from "../components/Fcard";
import { useNavigation } from "@react-navigation/native";

const FaqScreen = () => {
  const navigation = useNavigation();
  return (
    <AppScreen>
      <AppHeader title="FAQs" onPress={() => navigation.goBack()} />

      <View style={styles.cardsContainer}>
        {faqs.map((faq) => (
          <Fcard answer={faq.answer} question={faq.question} />
        ))}
      </View>
    </AppScreen>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    marginHorizontal: 17,
  },
  topComponent: {
    marginVertical: 15,
    marginHorizontal: 17,
  },
});
