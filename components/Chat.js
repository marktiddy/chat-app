import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Platform } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class Chat extends React.Component {
  //Start our chat in the state
  state = {
    messages: []
  };

  //Next, on component will mount we'll add in some chat details

  componentDidMount() {
    this.setState({
      messages: [
        //some initial messages including a system message
        {
          _id: 1,
          text: `${this.props.navigation.state.params.name} has entered the chat`,
          createdAt: new Date(),
          system: true
        },
        {
          _id: 2,
          text: `Hello ${this.props.navigation.state.params.name}`,
          createdAt: new Date(),
          user: {
            _id: 3,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  //custom method called onSend
  //Here we call set state and pass in the state when the change is applied
  //We then use append which is provided by Gifted Chat and adds the new message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  //Function to render our bubble differently
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          }
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: `${this.props.navigation.state.params.bgColor}`
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
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
  container: {
    flex: 1,
    backgroundColor: "blue"
  },
  mainText: {
    color: "white",
    fontSize: 20
  }
});
