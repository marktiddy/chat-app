import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class Chat extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: `${this.props.navigation.state.params.bgColor}`,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={styles.mainText}
        >{`Welcome ${this.props.navigation.state.params.name}. Let's chat`}</Text>
      </View>
    );
  }

  //Let's set the title bar to show their name
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  };
}

const styles = StyleSheet.create({
  mainText: {
    color: "white",
    fontSize: 20
  }
});
