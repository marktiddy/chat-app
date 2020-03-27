import React from "react";
import { StyleSheet, Text, View } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

import Start from "./components/Start";
import Chat from "./components/Chat";

//import react Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//Create a navigator
const navigator = createStackNavigator({
  Main: { screen: Start },
  Chat: { screen: Chat }
});

//Now link it all together
const navigatorContainer = createAppContainer(navigator);
//Export it
export default navigatorContainer;
