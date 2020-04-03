import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Platform } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
const firebase = require("firebase");
require("firebase/firestore");
global.crypto = require("@firebase/firestore");
import { API_KEY } from "../keys";
import { decode, encode } from "base-64";
//Import moment
import moment from "moment";

const Chat = ({ navigation }) => {
  //Set our state
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  //set up firebase
  global.crypto.getRandomValues = byteArray => {
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
      appId: "1:188998855349:web:016b9740d4b27b41b46cfc"
    });
  }

  //create a reference to our messages
  const referenceAllMessages = firebase.firestore().collection("message");

  //Helper function to process our messages
  const onMessagesUpdate = snapshot => {
    const newMessages = [];
    snapshot.forEach(doc => {
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
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
      text: m.text,
      user: {
        _id: m.user._id,
        avatar: currentUser.avatar
      }
    });
  };

  //Stuff to do when our app loads
  useEffect(() => {
    //check if user has been signed in
    const authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //Update user state
      setCurrentUser({
        _id: user.uid,
        avatar: "https://placeimg.com/140/140/any"
      });
    });
    //Firebase snapshots
    const unsubscribe = referenceAllMessages.onSnapshot(snap => {
      onMessagesUpdate(snap);
    });
    //initial message code

    //Unsubscribe at the end
    return () => {
      authUnsubscribe();
      unsubscribe();
    };
  }, []);

  //Function to render our bubble differently
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#333"
          }
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${navigation.state.params.bgColor}`
      }}
    >
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: currentUser._id
        }}
      />
      {Platform.OS === "android" ? <KeyboardSpacer /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue"
  },
  mainText: {
    color: "white",
    fontSize: 20
  }
});

Chat["navigationOptions"] = screenProps => ({
  title: screenProps.navigation.state.params.name + " is chatting"
});

export default Chat;
