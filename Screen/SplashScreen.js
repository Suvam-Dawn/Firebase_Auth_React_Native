import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const isGSignedIn = await GoogleSignin.isSignedIn();
    if (isGSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      this.props.navigation.replace("DetailsScreen", {
        status: "G-Login",
        user: currentUser.user
      });
    } else {
      setTimeout(() => {
        this.props.navigation.replace("LoginScreen");
      }, 500);
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
