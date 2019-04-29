import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import firebase from "react-native-firebase";
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ""
    };
  }
  _signIn = async () => {
    try {
      GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();

      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      var userData = firebaseUserCredential.user;
      this.props.navigation.replace("DetailsScreen", {
        status: "G-Login",
        user: userData
      });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  render() {
    return (
      <GoogleSigninButton
        style={styles.container}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 192,
    height: 48,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  }
});
