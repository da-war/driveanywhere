import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AppForm from "../components/forms/AppForm";
import FormImagePicker from "../components/forms/FormImagePicker";

import * as yup from "yup";
import { FONTS } from "../constants";
import colors from "../config/colors";
import SubmitButton from "../components/forms/SubmitButton";
import { db, storage } from "../../firebase";
import { UserContext } from "../context/userContext";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "yup";

const ApplicationFormScreen = () => {
  const userData = useContext(UserContext);
  //driving license validationSchema
  const validationSchema = yup.object().shape({
    images: yup
      .array()
      .required("Please select at least one image")
      .label("Images"),
  });

  const handleSubmit = (values) => {
    console.log(values.images);
    setDoc(doc(db, "driverapplication", userData.id), {
      images: images,
      id: userData.id,
      timeStamp: Date.now().toString(),
      name: userData.name,
    })
      .then(() => {
        Alert.alert("Success", "Data Gathered Successfully");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 17,
        },
        styles.bg,
      ]}
    >
      <Text style={styles.text}>
        Please Submit Image/Images of Your Driving License{" "}
      </Text>

      <AppForm
        initialValues={{ images: [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <FormImagePicker name="images" />
        <SubmitButton title="Submit Application" />
      </AppForm>
    </View>
  );
};

export default ApplicationFormScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.white,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
});
