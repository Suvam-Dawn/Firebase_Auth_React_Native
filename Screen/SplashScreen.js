import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import firebase from "react-native-firebase";
export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    GoogleSignin.configure();
    await GoogleSignin.hasPlayServices();
    const isGSignedIn = await GoogleSignin.isSignedIn();
    if (isGSignedIn) {
      const firebaseUser = await firebase.auth().currentUser;
      var userData = firebaseUser._user;
      this.props.navigation.replace("DetailsScreen", {
        status: "G-Login",
        user: userData
      });
    } else {
      const pageProps = this.props;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var userData = user._user;
          pageProps.navigation.replace("DetailsScreen", {
            status: "Phone-Login",
            user: userData
          });
        } else {
          setTimeout(() => {
            pageProps.navigation.replace("LoginScreen");
          }, 500);
        }
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Firebase Auth App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
