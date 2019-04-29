import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
  componentDidMount = async () => {};
  _logout = async () => {
    var navigate = this;
    if (this.props.navigation.state.params.status === "G-Login") {
      GoogleSignin.configure();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      firebase
        .auth()
        .signOut()
        .then(function() {
          navigate.props.navigation.replace("LoginScreen");
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (this.props.navigation.state.params.status === "Phone-Login") {
      firebase
        .auth()
        .signOut()
        .then(function() {
          navigate.props.navigation.replace("LoginScreen");
        })
        .catch(function(error) {
          console.log(error);
        });
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
                uri: this.props.navigation.state.params.user.photoURL
              }}
            />
            <Text>
              Creation Time:
              {this.props.navigation.state.params.user.metadata.creationTime}
            </Text>
            <Text>
              Last SignIn Time:
              {this.props.navigation.state.params.user.metadata.lastSignInTime}
            </Text>
            <Text>
              Email:
              {this.props.navigation.state.params.user.email}
            </Text>
            <Text>
              Name:
              {this.props.navigation.state.params.user.displayName}
            </Text>
            <Text>
              UID:
              {this.props.navigation.state.params.user.uid}
            </Text>
          </View>
        ) : this.props.navigation.state.params.status === "Phone-Login" ? (
          <View style={styles.container}>
            <Text>
              Creation Time:
              {this.props.navigation.state.params.user.metadata.creationTime}
            </Text>
            <Text>
              Last SignIn Time:
              {this.props.navigation.state.params.user.metadata.lastSignInTime}
            </Text>
            <Text>
              UID:
              {this.props.navigation.state.params.user.uid}
            </Text>
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
