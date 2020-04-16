import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class CustomActions extends React.Component {
  //Get location
  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let result = await Location.getCurrentPositionAsync({}).catch((e) =>
        console.log(e)
      );

      if (result) {
        this.props.onSend({
          createdAt: "",
          user: this.props.user,
          location: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          },
        });
      }
    }
  }

  async takePicture() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA
    ).catch((e) => console.log(e));
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: "Images",
      }).catch((e) => console.log(e));

      if (!result.cancelled) {
        this.props.onSend({
          createdAt: "",
          user: this.props.user,
          image: "https://reactnative.dev/img/header_logo.png",
        });
        console.log(result);
      }
    }
  }
  async choosePicture() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    ).catch((e) => console.log(e));
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
      }).catch((e) => console.log(e));

      if (!result.cancelled) {
        this.props.onSend({
          createdAt: "",
          user: this.props.user,
          image: "https://reactnative.dev/img/header_logo.png",
        });
        console.log(result);
      }
    }
  }

  onActionsPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.choosePicture();
            return;
          case 1:
            this.takePicture();
            return;
          case 2:
            this.getLocation();
            return;
          default:
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionsPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
