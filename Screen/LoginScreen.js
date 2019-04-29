import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
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
      userInfo: "",
      modalVisible: false,
      input: "",
      temp: "Mobile Number",
      maxLength: 13,
      confirmResult: null
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
  _phoneLogin = () => {
    if (this.state.temp === "Mobile Number") {
      firebase
        .auth()
        .signInWithPhoneNumber("+91" + this.state.input)
        .then(confirmResult => {
          console.log(confirmResult);
          this.setState({ confirmResult });
          Alert.alert("OTP sent....");
          this.setState({ temp: "Enter OTP", maxLength: 6, input: "" });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      if (this.state.confirmResult) {
        const { confirmResult } = this.state;
        confirmResult
          .confirm(this.state.input)
          .then(user => {
            var userData = user._user;
            this.props.navigation.replace("DetailsScreen", {
              status: "Phone-Login",
              user: userData
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
  render() {
    return (
      <View
        style={{
          width: 192,
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          alignItems: "center"
        }}
      >
        <GoogleSigninButton
          style={styles.container}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
        />
        <Button
          style={styles.phone}
          title="Sign in with Phone"
          onPress={() => {
            this.setState({
              modalVisible: true,
              input: "",
              maxLength: 10,
              temp: "Mobile Number"
            });
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1
            }}
          >
            <Text
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
              style={{
                backgroundColor: "transparent",
                flex: 0.5
              }}
            />
            <View
              style={{
                backgroundColor: "#ffffff",

                flex: 0.5
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  flexDirection: "column",
                  borderWidth: 1,
                  borderColor: "#000000",
                  margin: 5,
                  padding: 10,
                  borderRadius: 7
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5
                  }}
                >
                  {this.state.temp}
                </Text>
                <TextInput
                  ref="Input"
                  maxLength={this.state.maxLength}
                  onSubmitEditing={this._phoneLogin}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
                  selectionColor={"#000000"}
                  placeholderTextColor={"#000000"}
                  onChangeText={input => this.setState({ input })}
                  value={this.state.input}
                />
              </View>
              <TouchableOpacity
                onPress={this._phoneLogin}
                style={{
                  flex: 0.25,
                  margin: 5,
                  backgroundColor: "#000000",
                  justifyContent: "center",
                  alignContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
  },
  phone: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20
  }
});
