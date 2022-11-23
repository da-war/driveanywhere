import {
  Alert,
  Button,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ProfileCard from "../components/ProfileCard";
import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import LottieView from "lottie-react-native";
import AppScreen from "../components/AppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DriversContext } from "../context/driversContext";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants";
import colors from "../config/colors";

import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AppButton from "../components/AppButton";

const DriverProfile = () => {
  const [loading, setLoading] = React.useState(false);
  const [myDrivers, setMyDrivers] = React.useState([]);
  const navigation = useNavigation();

  const { drivers, setDrivers } = React.useContext(DriversContext);

  React.useEffect(() => {
    console.log("Driverssss", drivers);
  }, []);

  const getDrivers = async () => {
    //if function can not complete in 10 sec stop function
    setTimeout(() => {
      setLoading(false);
    }, 15000);

    try {
      setLoading(true);
      const q = query(collection(db, "users"), where("isDriver", "==", true));
      const querySnapshot = await getDocs(q);
      const drivers = querySnapshot.docs.map((doc) => doc.data());
      //store drivers list of array in async storage
      AsyncStorage.setItem("drivers", JSON.stringify(drivers));
      setMyDrivers(drivers);
      setDrivers(drivers);
      setLoading(false);

      console.log("Here is drivers", drivers);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  //function to generate excel file from drivers list of objects
  const generateExcel = async () => {
    const headers = ["Name", "Email", "Phone", "ID", "Is Admin"];
    const mainArray = [];
    //get name, email, phone, id, isDriver from each object in drivers array and store it in an array and push it to mainArray
    drivers.forEach((driver) => {
      const driverArray = [
        driver.name,
        driver.email,
        driver.phone,
        driver.id,
        driver.isAdmin,
      ];
      mainArray.push(driverArray);
    });
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([headers, ...mainArray]);
    XLSX.utils.book_append_sheet(wb, ws, "Drivers", true);

    const base64 = await XLSX.write(wb, { type: "base64" });
    const fileName = FileSystem.documentDirectory + "Drivers.xlsx";
    await FileSystem.writeAsStringAsync(fileName, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(fileName);
    });
  };

  return (
    <>
      <AppScreen>
        <AppHeader title="Drivers" onPress={() => navigation.goBack()} />

        <ScrollView
          style={styles.innerMainContainer}
          refreshControl={
            <RefreshControl onRefresh={getDrivers} refreshing={loading} />
          }
        >
          <AppButton title="Get .xlsx file" onPress={generateExcel} />
          <Text style={styles.title}>Drivers</Text>
          <FlatList
            data={drivers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProfileCard
                name={item.name}
                onPress={() => navigation.navigate("driverdetails", item)}
              />
            )}
          />
        </ScrollView>
      </AppScreen>
    </>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  innerMainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginVertical: 10,
    alignSelf: "center",
    color: colors.medium,
  },
});
