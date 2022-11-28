import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants";
import colors from "../config/colors";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import AppButton from "../components/AppButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Modal } from "react-native";

import LottieView from "lottie-react-native";
import { sendNotification } from "../api/expoPushTokens";
import { getUserAndSendNotification } from "../globalFunctions/global";
import { AllUsersContext } from "../context/allUsersContext";

const RequestDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  const [loading, setLoading] = React.useState(false);
  const { users, setUsers } = React.useContext(AllUsersContext);

  useEffect(() => {
    console.log("here is images", data.images);
    console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, []);

  const onPressAccept = () => {
    setLoading(true);
    const newData = {
      status: "accepted",
    };
    const docRef = doc(db, "drequests", data.docId);
    updateDoc(docRef, newData)
      .then(() => {
        console.log("Document successfully updated!");
        makeDriver();
        if (data.user.token) {
          const userId = data.user.id;
          const bodyRequest = "Congratulations! Your are now a driver";
          const route = "nowdriver";
          getUserAndSendNotification(userId, users, bodyRequest, route);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Something went wrong", error.message);
        setLoading(false);
      });
  };

  const makeDriver = () => {
    const newData = {
      isDriver: true,
    };
    const docRef = doc(db, "users", data.user.id);
    updateDoc(docRef, newData)
      .then(() => {
        setLoading(false);
        Alert.alert("Driver Request Accepted");
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Something went wrong", error.message);
        setLoading(false);
      });
  };

  const onPressReject = () => {
    setLoading(true);
    const newData = {
      status: "rejected",
    };
    const docRef = doc(db, "drequests", data.docId);
    updateDoc(docRef, newData)
      .then(() => {
        setLoading(false);
        Alert.alert("Driver Request Rejected");
        if (data.user) {
          const userId = data.user.id;
          const bodyRequest = "We are sorry, your request has been rejected";
          const route = "driverRequest";
          getUserAndSendNotification(userId, users, bodyRequest, route);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Something went wrong", error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <AppScreen>
        <AppHeader
          title="Request Details"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.titleText}>Request Details</Text>

        <ScrollView style={styles.scroll}>
          <View style={styles.mainContainer}>
            <Text style={styles.descriptionHeading}>
              Description Added by:{"  " + data.user.name}
            </Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>{data.description}</Text>
            </View>
            <Text style={styles.descriptionHeading}>
              Images of the Documents
            </Text>
            <View>
              <FlatList
                data={data.images}
                keyExtractor={(item) => item.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("imagedetails", item)}
                    style={styles.imageContainer}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: item }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <AppButton
              title="Approve as Driver"
              onPress={onPressAccept}
              color={COLORS.secondary}
            />
            <AppButton
              title="Reject Request"
              onPress={onPressReject}
              color={colors.danger}
            />
          </View>
        </ScrollView>
      </AppScreen>
      <Modal visible={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView source={require("../../assets/animation/verify.json")} />
        </View>
      </Modal>
    </>
  );
};

export default RequestDetailsScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  descriptionHeading: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: colors.medium,
    marginVertical: 10,
  },
  descriptionBox: {
    backgroundColor: colors.white,
    minHeight: 50,
    borderRadius: 15,
    padding: 12,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: colors.medium,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 15,
    marginVertical: 10,
    borderColor: colors.medium,
    borderWidth: 1,
  },
  imageContainer: {
    maxWidth: "45%",
    marginHorizontal: "2%",
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.gray,
    textAlign: "center",
    marginVertical: 15,
  },
});
