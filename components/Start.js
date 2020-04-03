import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { withOrientation } from "react-navigation";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",

      bgColor: "#737083"
    };
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/bg-image.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>ChatApp</Text>
          </View>
          <View style={styles.loginView}>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                padding: 10
              }}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              placeholder="Enter Your Name"
            ></TextInput>
            <Text style={styles.bgChooseTitle}>Choose Background Color:</Text>

            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={
                  this.state.bgColor === "#090C08"
                    ? [
                        styles.circleView,
                        styles.blackCircle,
                        styles.circleBorder
                      ]
                    : [styles.circleView, styles.blackCircle]
                }
                onPress={() => {
                  this.setState({ bgColor: "#090C08" });
                }}
              />
              <TouchableOpacity
                style={
                  this.state.bgColor === "#737083"
                    ? [
                        styles.circleView,
                        styles.grayCircle,
                        styles.circleBorder
                      ]
                    : [styles.circleView, styles.grayCircle]
                }
                onPress={() => {
                  this.setState({ bgColor: "#737083" });
                }}
              />
              <TouchableOpacity
                style={
                  this.state.bgColor === "#8A95A5"
                    ? [
                        styles.circleView,
                        styles.blueCircle,
                        styles.circleBorder
                      ]
                    : [styles.circleView, styles.blueCircle]
                }
                onPress={() => {
                  this.setState({ bgColor: "#8A95A5" });
                }}
              />
              <TouchableOpacity
                style={
                  this.state.bgColor === "#B9C6AE"
                    ? [
                        styles.circleView,
                        styles.greenCircle,
                        styles.circleBorder
                      ]
                    : [styles.circleView, styles.greenCircle]
                }
                onPress={() => {
                  this.setState({ bgColor: "#B9C6AE" });
                }}
              />
            </View>
            {
              // button takes us to the next screen on click and passes in the name as a prop
            }
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Chatting"
              accessibilityHint="Press this to start the chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*adding the spacer for moving the screen when user types their name*/}
        <KeyboardSpacer />
      </ImageBackground>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "ChatApp"
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "black",
    justifyContent: "center",
    padding: 10
  },
  loginView: {
    height: 300,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    padding: 30,
    marginHorizontal: 10,
    marginBottom: 30
  },
  title: {
    flex: 66,
    alignContent: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "white",
    textAlign: "center",
    fontSize: 45,
    fontWeight: "600"
  },
  colorOptions: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },

  bgChooseTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#737083",
    marginTop: 15
  },
  circleView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    position: "relative",
    marginRight: 10
  },

  circleBorder: {
    borderWidth: 4,
    borderColor: "yellow"
  },

  grayCircle: {
    backgroundColor: "#737083"
  },
  blackCircle: {
    backgroundColor: "#090C08"
  },
  blueCircle: {
    backgroundColor: "#8A95A5"
  },
  greenCircle: {
    backgroundColor: "#B9C6AE"
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#737083",
    padding: 20
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center"
  }
});
