import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useCallback, useEffect } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";
import AppHeader from "../components/AppHeader";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";
import MessageCard from "../components/MessageCard";
import { COLORS } from "../constants";
import { TripsContext } from "../context/tripsContext";
import { UserContext } from "../context/userContext";

import LottieView from "lottie-react-native";
import moment from "moment";
import { sendNotification } from "../api/expoPushTokens";
import { ScrollView } from "react-native";
import { getUserAndSendNotification } from "../globalFunctions/global";
import { AllUsersContext } from "../context/allUsersContext";

export function CommentsScreen({ route }) {
  const data = route.params;
  const scrollView = React.useRef();
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { trips, setTrips } = React.useContext(TripsContext);
  const { user, setUser } = React.useContext(UserContext);
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [newMessage, setNewMessage] = useState("");
  const docID = data.docID;
  const comment = data.comments;

  //onSnapshot function to get doc and listen for changes from collection comments where id is comment
  //detect changes and update the state using onSnapshot
  const getComments = useCallback(async () => {
    //get doc from collection comments where id is comment
    const docRef = doc(db, "comments", comment);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //get data from doc
      const data = docSnap.data();
      //get messages from data
      const messages = data.messages;
      //set messages to state
      setMessages(messages);
      //also if doc data gets updated, update the state
    } else {
      console.log("No such document!");
    }
  }, [comment]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  //sendMessage function to add new comment to the collection comments
  const sendMessage = async (message) => {
    const newMessage = {
      message,
      user,
      createdAt: moment().format("DD/MM/YYYY HH:mm a"),
    };
    //append new message to messages array
    const newMessages = [...messages, newMessage];

    const docRef = doc(db, "comments", comment);
    updateDoc(docRef, {
      messages: newMessages,
    })
      .then((docRef) => {
        if (data.admin) {
          const adminId = data.adminId;
          const tripId = data.tripId;
          const bodyRequest = "Comments UPDATE in Ride#: " + tripId;
          const route = "inProgress";
          getUserAndSendNotification(adminId, users, bodyRequest, route);
        }
        if (data.driver) {
          const driverId = data.driverId;
          const tripId = data.tripId;
          const bodyRequest = "Comments UPDATE in Ride#: " + tripId;
          const route = "inprogress";
          getUserAndSendNotification(driverId, users, bodyRequest, route);
        }
        //update the state
        getComments();
        //update the frontend state of the messages array
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <>
      <AppScreen>
        <AppHeader title="Comments" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          {/* add scroll view on message update automaticall scroll to end */}
          <ScrollView
            ref={scrollView}
            onContentSizeChange={() => scrollView.current.scrollToEnd()}
          >
            {messages.map((message, index) => (
              <View key={index}>
                <MessageCard
                  user={message.user.id}
                  message={message.message}
                  time={message.createdAt}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <AppTextInput
            placeholder="Type your message here..."
            style={{ flex: 1 }}
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(newMessage);
              setNewMessage("");
            }}
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: COLORS.white }}>Send</Text>
          </TouchableOpacity>
        </View>
      </AppScreen>
    </>
  );
}
