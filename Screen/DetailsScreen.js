import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
    console.log(this.props.navigation.state.params.user);
  };
  _logout = async () => {
    if (this.props.navigation.state.params.status === "G-Login") {
        GoogleSignin.configure();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.navigation.replace("LoginScreen");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.navigation.state.params.status === "G-Login" ? (
          <View style={styles.container}>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: this.props.navigation.state.params.user.photo
              }}
            />
            <Text>Email: {this.props.navigation.state.params.user.email}</Text>
            <Text>Name: {this.props.navigation.state.params.user.name}</Text>
          </View>
        ) : (
          <View style={styles.container} />
        )}
        <TouchableOpacity style={styles.logout} onPress={this._logout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logout: {
    height: 30,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#000000"
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    color: "#ffffff",
    marginLeft: 10,
    marginRight: 10
  }
});
