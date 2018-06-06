import React from "react";
import { Platform } from "react-native";
import Login from "./src/pages/Login";
import Wallet from "./src/pages/Wallet";
import Home from "./src/pages/Home";
import { createTabNavigator, TabBarBottom } from "react-navigation";
import { Icon } from "antd-mobile/lib";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const App = createTabNavigator(
  {
    Home: { screen: Home },
    Wallet: { screen: Wallet }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => <Icon type="close" />,
      tabBarPosition: "bottom",
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      },
      animationEnabled: false,
      swipeEnabled: false
    })
  }
);

export default App;
