import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppHeader from "../components/AppHeader";
import { FONTS } from "../constants/index";
import colors from "../config/colors";

import moment from "moment";
import * as yup from "yup";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppScreen from "../components/AppScreen";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/userContext";

const initialValues = { title: "", description: "" };

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Problem Title"),
  description: yup.string().required().label("Problem Description"),
});
function generateRandomString() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 17; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const ReportProblem = () => {
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const navigation = useNavigation();
  const handlePress = async (values) => {
    setLoading(true);
    const title = values.title;
    const description = values.description;
    const userId = auth.currentUser.uid;
    const time = moment().format("MMM Do YY");
    const docId = generateRandomString();

    try {
      await setDoc(doc(db, "problems", docId), {
        title,
        description,
        userId,
        time,
        docId,
      });

      setLoading(false);
      navigation.goBack();
      Alert.alert("Problem Reported to the Admin");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error);
    }
  };
  return (
    <>
      <AppScreen>
        <AppHeader
          onPress={() => navigation.goBack()}
          title="Problem Reporting"
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Report a Problem</Text>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handlePress(values)}
            >
              <AppFormField name="title" placeholder="Problem Title" />
              <AppFormField
                name="description"
                placeholder="Problem Description"
                numberOfLines={5}
                multiline={true}
              />

              <SubmitButton color={colors.danger} title="Report it" />
            </AppForm>
          </View>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/problem.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: colors.gray,
  },
});
