import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import AppScreen from "../components/AppScreen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants";

import LottieView from "lottie-react-native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phone: Yup.string().required().label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const handleSignUp = (values) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("Here is db", db);
        const user = userCredential.user;
        const userName = values.name;
        const userPhone = values.phone;
        const userEmail = values.email;
        setDoc(doc(db, "users", user.uid), {
          name: userName,
          phone: userPhone,
          email: userEmail,
          trips: [],
          isDriver: false,
          isAdmin: false,
          id: user.uid,
          drequest: "notRequested",
        })
          .then(() => {
            Alert.alert("Success", "Data Gathered Successfully");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
        setLoading(false);
        Alert.alert("Success", "Account created successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        // ..
      });
  };
  return (
    <>
      <AppScreen style={{ marginBottom: 50 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />

            <Text style={styles.titleText}>Sign Up Now!</Text>

            <KeyboardAvoidingView behavior="position">
              <AppForm
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  phoneNumber: "",
                }}
                onSubmit={(values) => handleSignUp(values)}
                validationSchema={validationSchema}
              >
                <AppFormField
                  name="name"
                  placeholder="Enter Your Name"
                  icon="alpha-n-box"
                />
                <AppFormField
                  name="phone"
                  placeholder="Enter Phone Number e.g. +4142423434"
                  icon="card-account-phone"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />
                <View
                  style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
                >
                  <SubmitButton title="Register" color={COLORS.secondary} />
                </View>
              </AppForm>
            </KeyboardAvoidingView>
            <View style={styles.textContainer}>
              <Text style={styles.normal}>Don't have an Account? </Text>
              <Text
                style={styles.bold}
                onPress={() => navigation.navigate("login")}
              >
                Login!
              </Text>
            </View>
          </View>
        </ScrollView>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/register.json")}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: colors.secondary,
  },
  container: {
    paddingHorizontal: 17,
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  normal: {
    fontSize: 12,
    color: colors.gray,
  },
  textContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default RegisterScreen;
