import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { FONTS } from "../constants";
import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";

import * as yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppScreen from "../components/AppScreen";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { TripsContext } from "../context/tripsContext";

import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().label("Description"),
  totalTime: yup.number().required().label("Total Time"),
});

const StayAddScreen = ({ route }) => {
  const navigation = useNavigation();
  const { trips, setTrips } = React.useContext(TripsContext);
  const [loading, setLoading] = React.useState(false);
  const previosData = route.params;
  const [originalData, setOriginalData] = React.useState([previosData]);

  const myStays = originalData.stays;

  React.useEffect(() => {
    getTrip();
  }, [trips]);

  //get this trip from trips context
  const getTrip = () => {
    const trip = trips.filter((trip) => trip.docID === previosData.docID);
    setOriginalData(trip[0]);
    console.log("original data");
  };

  const handleStaySubmit = (values) => {
    console.log("hehehheheheheeheh");
    const title = values.title;
    const description = values.description;
    const totalTime = values.totalTime;

    const toUpdateData = {
      title,
      description,
      totalTime,
      stayAddedAt: moment().format("DD-MM-YYYY hh:mm:ss"),
    };

    const updatedStays = [...myStays, toUpdateData];
    console.log(
      "dheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      updatedStays
    );

    const myNewData = {
      ...myStays,
      stays: updatedStays,
    };

    console.log("updatedStays", myNewData);

    updateDoc(doc(db, "trips", originalData.docID), { stays: updatedStays })
      .then(() => {
        console.log("Document successfully updated!");
        getRides();
        navigation.goBack();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  const getRides = async () => {
    console.log("run run run run run run run run run run run run run run run");
    try {
      const colRef = collection(db, "trips");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      AsyncStorage.setItem("trips", JSON.stringify(myData));
      setTrips(myData);
      console.log("Here is trips", trips);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppScreen>
        <AppHeader title="Add Stay" onPress={() => navigation.goBack()} />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Add a Stay</Text>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{ title: "", description: "", totalTime: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleStaySubmit(values)}
            >
              <AppFormField name="title" placeholder="Title" />
              <AppFormField name="description" placeholder="Description" />
              <AppFormField name="totalTime" placeholder="Total Time of Stay" />
              <SubmitButton title="Add Stay" />
            </AppForm>
          </View>
        </View>
      </AppScreen>
    </>
  );
};

export default StayAddScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 25,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: colors.black,
    marginVertical: 15,
  },
  titleScreen: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginLeft: 40,
  },
});
