import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  StackNavigator,
  createDrawerNavigator,
  DrawerItems,
  NavigationActions,
  createMaterialTopTabNavigator,
  StackRouter
} from "react-navigation";
import LoginScreen from "./Screen/LoginScreen";
import SplashScreen from "./Screen/SplashScreen";
import DetailsScreen from "./Screen/DetailsScreen";

const RootStack = StackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: LoginScreen
    },
    DetailsScreen: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "SplashScreen",
    /* The header config is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#000000"
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      animationEnabled: true
    }
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
