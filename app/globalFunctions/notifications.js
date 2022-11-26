import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { sendNotification } from "../api/expoPushTokens";

export const expoPushyNotification = async (
  user,
  bodyRequestInput = "Update",
  rideNumber
) => {
  const bodyRequest = bodyRequestInput + "Ride# " + rideNumber;

  //get doc from firestore users collection where doc id = driver.id
  const docRef = doc(db, "users", user.id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      //store data in AsyncStorage as user
      const driverData = docSnap.data();
      const myToken = driverData.token;
      //send push notification to driver
      const message = {
        to: myToken,
        sound: "default",
        title: "Driver Anywhere",
        body: bodyRequest,
        data: { data: "goes here" },
        _displayInForeground: true,
      };
      sendNotification(message);
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};
