import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, AsyncStorage } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { Platform } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
const firebase = require("firebase");
require("firebase/firestore");
global.crypto = require("@firebase/firestore");
import { API_KEY } from "../keys";
import { decode, encode } from "base-64";
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "./CustomActions";
//Import moment
import moment from "moment";

const Chat = ({ navigation }) => {
  //Set our state
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  //set up firebase
  global.crypto.getRandomValues = (byteArray) => {
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = Math.floor(256 * Math.random());
    }
  };

  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: API_KEY,
      authDomain: "chat-app-969e4.firebaseapp.com",
      databaseURL: "https://chat-app-969e4.firebaseio.com",
      projectId: "chat-app-969e4",
      storageBucket: "chat-app-969e4.appspot.com",
      messagingSenderId: "188998855349",
      appId: "1:188998855349:web:016b9740d4b27b41b46cfc",
    });
  }

  //create a reference to our messages
  const referenceAllMessages = firebase.firestore().collection("message");

  //Helper function to process our messages
  const onMessagesUpdate = (snapshot) => {
    const newMessages = [];
    snapshot.forEach((doc) => {
      var data = doc.data();
      newMessages.push(data);
    });
    setMessages(newMessages);
  };

  //Our on send function
  //TODO - Update for firebase
  const onSend = (newMessage = []) => {
    const currentMessages = messages;
    const m = newMessage[0];
    setMessages(GiftedChat.append(currentMessages, newMessage));
    referenceAllMessages.add({
      _id: m._id,
      createdAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
      text: m.text,
      user: {
        _id: m.user._id,
        avatar: currentUser.avatar,
      },
    });
    saveLocalMessages();
  };

  //Function to save messages to local storage
  const saveLocalMessages = async () => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (e) {
      console.log(e.message);
    }
  };

  //function to delete messages (if we ever want it)

  const deleteLocalMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (e) {
      console.log(e.message);
    }
  };

  //Helper function to get messages from local storage
  const getLocalMessages = async () => {
    let localMessages = "";
    try {
      localMessages = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(localMessages));
    } catch (e) {
      console.log(e.message);
    }
  };

  //Stuff to do when our app loads
  useEffect(() => {
    //Check if a user is connected and set the state appropriately
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    const //check if user has been signed in
      authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }
        //Update user state
        setCurrentUser({
          _id: user.uid,
          avatar: "https://placeimg.com/140/140/any",
        });
      });

    //Now do stuff depending on user connectivity status
    var unsubscribe;
    if (isConnected) {
      //Firebase snapshots
      unsubscribe = referenceAllMessages.onSnapshot((snap) => {
        onMessagesUpdate(snap);
      });
    } else {
      //Get our local messages
      getLocalMessages();
    }

    //First, lets load messages from localStorage

    //Unsubscribe at the end
    return () => {
      authUnsubscribe();
      if (isConnected) {
        unsubscribe();
      }
    };
  }, []);

  //Function to render our bubble differently
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#333",
          },
        }}
      />
    );
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //Function to not render the input
  const renderInputToolbar = (props) => {
    if (isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${navigation.state.params.bgColor}`,
      }}
    >
      <GiftedChat
        renderBubble={renderBubble}
        renderActions={renderCustomActions}
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        onSend={(newMessage) => onSend(newMessage)}
        user={{
          _id: currentUser._id,
        }}
      />
      {Platform.OS === "android" ? <KeyboardSpacer /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  mainText: {
    color: "white",
    fontSize: 20,
  },
});

Chat["navigationOptions"] = (screenProps) => ({
  title: screenProps.navigation.state.params.name + " is chatting",
});

export default Chat;
