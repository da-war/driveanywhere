import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import * as Yup from "yup";
import { auth } from "../../firebase";
import AppScreen from "../components/AppScreen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import { FONTS } from "../constants";

import LottieView from "lottie-react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loading, setLoading] = React.useState(false);
  const handleLogin = (values) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Success", "User logged in successfully");
        // ...
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        setLoading(false);
      });
  };
  return (
    <>
      <AppScreen>
        <View style={styles.container}>
          <KeyboardAvoidingView>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />

            <Text style={styles.titleText}>Login</Text>

            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => handleLogin(values)}
              validationSchema={validationSchema}
            >
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
              <View style={{ width: "100%", marginTop: 20, marginBottom: 10 }}>
                <SubmitButton title="Login" />
              </View>
            </AppForm>
            <View style={styles.textContainer}>
              <Text style={styles.normal}>Don't have an Account? </Text>
              <Text
                style={styles.bold}
                onPress={() => navigation.navigate("register")}
              >
                Sign Up!
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/login.json")}
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
    padding: 17,
    flex: 1,
  },
  logo: {
    width: 175,
    height: 175,
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

export default LoginScreen;
