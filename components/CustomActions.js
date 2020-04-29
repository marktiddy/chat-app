import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const firebase = require('firebase');
require('firebase/firestore');

export default class CustomActions extends React.Component {
  /** Random number generator function
   * @returns {int} random number for us to use as an Id
   */
  genRand = () => 1 + Math.floor(6000000 * Math.random());

  /** Blob function to upload images
  * This function turns the users image into a blob so we can upload it to firebase and save a reference to it
  * @async function
  * @param {string} uri of image
  * @returns {string} url for user to download the image from cloud storage
  */
  uploadImageFetch = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`${this.genRand()}`);
    const snapshot = await ref.put(blob);
    return await snapshot.ref.getDownloadURL();
  };

  /**
 * Function to get user location
 * @async function gets their location if user has given permission
 * Location information is saved once it is returned by the async function
 */
  async getLocation() {
    if (status === 'granted') {
      const result = await Location.getCurrentPositionAsync({}).catch((e) => console.log(e));

      if (result) {
        this.props.onSend({
          createdAt: '',
          user: this.props.user,
          location: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          },
        });
      }
    }
  }

  /** function to get permission to use camera and return the image selected by the user
   * @async function to get permission from user
   * if their status is granted they can pick an email
   * function then calls upload function
   */

  async takePicture() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
    ).catch((e) => console.log(e));
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch((e) => console.log(e));

      if (!result.cancelled) {
        this.props.onSend({
          createdAt: '',
          user: this.props.user,
          image: await this.uploadImageFetch(result.uri),
        });
      }
    }
  }

  /** function to get permission to use gallery and return the image selected by the user
   * @async function to get permission from user
   * if their status is granted they can pick an email
   * function then calls upload function
   */
  async choosePicture() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    ).catch((e) => console.log(e));
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch((e) => console.log(e));

      if (!result.cancelled) {
        this.props.onSend({
          createdAt: '',
          user: this.props.user,
          image: await this.uploadImageFetch(result.uri),
        });
      }
    }
  }

  onActionsPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
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

          default:
        }
      },
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionsPress}
        accesibble
        accesibilityLabel="More options"
        accessibilityHint="Take a photo,share an image or location"
        accessibilityRole="button"
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
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
