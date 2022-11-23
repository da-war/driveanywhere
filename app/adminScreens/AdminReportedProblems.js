import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { FONTS } from "../constants";
import colors from "../config/colors";
import { FlatList } from "react-native";
import { db } from "../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import AppButton from "../components/AppButton";

const AdminReportedProblems = () => {
  const navigation = useNavigation();

  const [problems, setProblems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  //get all docs from problems collection where status is not resolved
  //display them in a list
  //on click of a problem navigate to the problem details screen
  const getProblems = async () => {
    setLoading(true);
    //get problems using firebase 9
    const problemsRef = collection(db, "problems");
    const problemsSnapshot = await getDocs(problemsRef);
    const problemsList = problemsSnapshot.docs.map((doc) => doc.data());
    setProblems(problemsList);
    setLoading(false);
  };
  React.useEffect(() => {
    getProblems();
  }, []);

  const handleProblem = (item) => {
    //update doc in firestore 9
    const data = {
      status: "resolved",
    };
    updateDoc(doc(db, "problems", item.id), data)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    getProblems();
  };
  return (
    <>
      <AppScreen>
        <AppHeader
          title="Reported Problems"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Reported Problems</Text>

        <View style={{ flex: 1 }}>
          <FlatList
            data={problems}
            keyExtractor={(item) => item.docId.toString()}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Text style={styles.problemTitle}>Title: {item.title}</Text>
                <Text style={styles.descriptionHeading}>Description:</Text>
                <Text style={styles.problemDescription}>
                  {item.description}
                </Text>
                <AppButton
                  title="mark as resolved"
                  onPress={() => handleProblem(item)}
                />
              </View>
            )}
          />
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animation/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default AdminReportedProblems;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: colors.white,
    marginVertical: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: colors.gray,
    textAlign: "center",
    marginVertical: 10,
  },
  problemTitle: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: colors.gray,
  },
  descriptionHeading: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
  },
  problemDescription: {
    fontSize: 10,
    fontFamily: FONTS.semiBold,
    marginLeft: 20,
  },
});
