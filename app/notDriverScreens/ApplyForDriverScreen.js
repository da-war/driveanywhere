import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppForm from "../components/forms/AppForm";
import FormImagePicker from "../components/forms/FormImagePicker";
import SubmitButton from "../components/forms/SubmitButton";

import * as yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import { COLORS } from "../constants";
import UploadScreen from "../global/UploadScreen";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../firebase";
import {
  getAdminsFromUsersAndSendNotificationToAllAdmins,
  getData,
  randomString,
} from "../globalFunctions/global";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import { FONTS } from "../constants/index";
import moment from "moment";
import { AllUsersContext } from "../context/allUsersContext";
const initialItems = { images: [], description: "" };

const validationSchema = yup.object().shape({
  images: yup.array().min(1, "Please select at least one image."),
  description: yup.string().required().min(1).label("Description"),
});

const ApplyForDriverScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [urls, setUrls] = React.useState([]);
  const { user, setUser } = React.useContext(UserContext);
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [admins, setAdmins] = React.useState([]);
  const [myDescription, setMyDescription] = React.useState("");

  React.useEffect(() => {
    //get users from users array where isAdmin is true
    getAdmins();
  }, []);

  const getAdmins = () => {
    const admins = users.filter((user) => user.isAdmin === true);
    setAdmins(admins);
  };

  const handleSubmit = async (values) => {
    setProgress(0);
    setModalVisible(true);

    const images = values.images;
    const description = values.description;
    uploadImagesToFirebase(images, description);
  };

  //firebase function to which takes list of pics from mobile and uploads them to firebase storage and returns a list of urls
  const uploadImagesToFirebase = async (images, description) => {
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = Date.now() + randomString(5);
      const storageRef = ref(storage, `images/${fileName}.jpeg`);
      //create blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      //upload blob
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "An error occurred while uploading.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            urls.push(downloadURL);
            if (urls.length === images.length) {
              //all images uploaded
              setUrls(urls);
              setProgress(0);
              setModalVisible(false);
              //save data to firebase
              helloFunction(urls, description);
            }
          });
        }
      );
    }
  };

  const helloFunction = (urls, description) => {
    setModalVisible(true);
    const docId = randomString(35);
    setDoc(doc(db, "drequests", docId), {
      images: urls,
      description: description,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      user: user,
      status: "pending",
      docId: docId,
    })
      .then(() => {
        const data = {
          drequest: "sent",
        };
        const docRef = doc(db, "users", user.id);
        updateDoc(docRef, data)
          .then((docRef) => {
            Alert.alert("Request Sent to the admin");

            getData(setUser);
            setModalVisible(false);
            const bodyRequest =
              "You have a new driver request from " + user.name;
            const route = "driverRequest";
            getAdminsFromUsersAndSendNotificationToAllAdmins(
              admins,
              bodyRequest,
              route
            );
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
            setModalVisible(false);
          });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.log(error);
        setModalVisible(false);
      });
  };
  return (
    <AppScreen>
      <AppHeader title="Become Driver" onPress={() => navigation.goBack()} />
      <View style={styles.mainContainer}>
        <Text style={styles.titleTexto}>
          Please Attach your ID Card and Driver License Images
        </Text>
        <UploadScreen
          onDone={() => setModalVisible(false)}
          progress={progress}
          visible={modalVisible}
        />
        <AppForm
          initialValues={initialItems}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormImagePicker name="images" />

          <AppFormField
            name="description"
            placeholder="Description About Yourself"
            multiline
            numberOfLines={3}
          />

          <SubmitButton title="Submit the request" />
        </AppForm>
      </View>
    </AppScreen>
  );
};

export default ApplyForDriverScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  titleTexto: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});
