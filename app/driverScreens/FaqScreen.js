import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import Fcard from "../components/Fcard";
import { useNavigation } from "@react-navigation/native";

const faqs = [
  {
    id: "1",
    question: "How to Report a problem?",
    answer:
      "Report any problem by visiting to report problem screen you'll find in the Home Screen.",
  },
  {
    id: "2",
    question: "How to be an get?",
    answer: "Just register as a driver and wait for the admin to approve you.",
  },
];

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
