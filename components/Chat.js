import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  //Start our chat in the state
  state = {
    messages: []
  };

  //Next, on component will mount we'll add in some chat details

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello Developer",
          createdAt: new Date(),
          user: {
            _id: 2,
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

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
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
