import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { FONTS } from "../../constants";
import AppButton from "../../components/AppButton";
import { auth } from "../../../firebase";
import ProfileDetailCard from "../../components/ProfileDetailCard";
import { StateContext } from "../../context/StateContext";
import colors from "../../config/colors";

const ProfileScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);

  const { state, setState } = React.useContext(StateContext);

  const navigation = useNavigation();

  React.useEffect(() => {
    console.log("user", user);
    console.log(auth.currentUser.uid);
  }, []);

  //function to get user data from async storage

  const logout = () => {
    //remove user from async storage
    AsyncStorage.removeItem("user");
    auth.signOut();
  };

  const confirmLogout = () => {
    //show alert are you sure you want to logout
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes Logout!", onPress: () => logout() },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <AppScreen>
        <AppHeader title="Profile" onPress={() => navigation.goBack()} />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/icons/pro.png")}
              style={styles.image}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.userEmail}>{auth.currentUser.email}</Text>
          </View>
          <View style={styles.innerContainer}>
            {user.isAdmin ? (
              <View>
                {state === "driver" ? (
                  <AppButton
                    title="Change to Admin"
                    onPress={() => {
                      setState("admin");
                      //set State as admin in async storage
                      AsyncStorage.setItem("state", "admin");
                    }}
                  />
                ) : (
                  <AppButton
                    title="Change to Driver"
                    onPress={() => {
                      setState("driver");
                      //set State as driver in async storage
                      AsyncStorage.setItem("state", "driver");
                    }}
                  />
                )}
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.logoutBtn}>
          <AppButton
            title="Logout"
            onPress={confirmLogout}
            color={colors.danger}
          />
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../../assets/animation/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  logoutBtn: {
    marginHorizontal: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginTop: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  userEmail: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: "#666",
  },
});
