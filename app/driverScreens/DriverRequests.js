import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../components/AppScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import RequestCard from "../components/RequestCard";
import { RequestsContext } from "../context/requestsContext";

const DriverRequests = () => {
  const navigation = useNavigation();
  const { requests, setRequests } = React.useContext(RequestsContext);
  const [myRequests, setMyRequests] = React.useState(requests);

  //get all the requests where status is pending
  //function that returns all the requests where status is pending

  React.useEffect(() => {
    getData();
    console.log("here is my requests", myRequests);
    console.log("here is requests", requests);
  }, []);

  const getData = () => {
    const myRequests = requests.filter(
      (request) => request.status === "pending"
    );
    setMyRequests(myRequests);
  };

  return (
    <AppScreen>
      <AppHeader title="Driver Requests" onPress={() => navigation.goBack()} />
      <Text style={styles.titleText}>All Driver Requests</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={myRequests}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <RequestCard
              name={item.user.name}
              images={item.images}
              onPress={() => navigation.navigate("driverrequestdetails", item)}
            />
          )}
        />
      </View>
    </AppScreen>
  );
};

export default DriverRequests;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginVertical: 15,
  },
});
