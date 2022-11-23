import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import colors from "../config/colors";
import { FONTS } from "../constants/index";
import ProfileDetailCard from "../components/ProfileDetailCard";
import servicecolors from "../config/servicecolors";
import AppButton from "../components/AppButton";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { DriversContext } from "../context/driversContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DriverDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [currentDriver, setCurrentDriver] = React.useState(null);
  const data = route.params;
  const [isMyAdmin, setIsMyAdmin] = React.useState(data.isAdmin);

  const { drivers, setDrivers } = React.useContext(DriversContext);

  React.useEffect(() => {
    setCurrentDriver(data);
  }, []);

  const getDrivers = async () => {
    try {
      const q = query(collection(db, "users"), where("isDriver", "==", true));
      const querySnapshot = await getDocs(q);
      const drivers = querySnapshot.docs.map((doc) => doc.data());
      AsyncStorage.setItem("drivers", JSON.stringify(drivers));
      setDrivers(drivers);
      console.log("Here is the list of drivers", drivers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallDriver = () => {
    const phoneNumber = `tel:${data.phone}`;
    Linking.openURL(phoneNumber);
  };

  const handleToggleSwitch = async () => {
    if (isMyAdmin) {
      const data = {
        isAdmin: false,
      };
      try {
        const docRef = doc(db, "users", currentDriver.id);
        updateDoc(docRef, data)
          .then((docRef) => {
            console.log("Admin Status Removed");
            setIsMyAdmin(false);
            getDrivers();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      const data = {
        isAdmin: true,
      };
      try {
        const docRef = doc(db, "users", currentDriver.id);
        updateDoc(docRef, data)
          .then((docRef) => {
            console.log("Admin Status Added");
            setIsMyAdmin(true);
            getDrivers();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };
  return (
    <AppScreen>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <AppHeader
            title="Driver Details"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.topContainer}>
            <Image
              source={require("../../assets/icons/pro.png")}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.nameText}>{data.name}</Text>
            <Text style={styles.emailText}>{data.email}</Text>
          </View>

          <View style={styles.profileCardsContainer}>
            <ProfileDetailCard
              bgColor={servicecolors.six}
              title="Admin"
              cSwitch={true}
              isEnabled={isMyAdmin}
              toggleSwitch={() => handleToggleSwitch()}
            />
          </View>

          <View style={styles.btnContainer}>
            <AppButton title="Call Driver" onPress={handleCallDriver} />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default DriverDetailsScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  emailText: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  image: {
    height: 110,
    width: 110,
  },
  nameText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: colors.medium,
  },
  profileCardsContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
