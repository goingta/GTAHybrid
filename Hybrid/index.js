import React, { Component } from "react";
import { AppRegistry, View, Text } from "react-native";
import { setJSExceptionHandler } from "react-native-exception-handler";
import App from "./src/pages/index/index";

setJSExceptionHandler((e, isFatal) => {
  if (isFatal) {
    alert(
      "Unexpected error occurred",
      `
            Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
            We will need to restart the app.
            `
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
}, true);

class TestHome extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <View>
        <Text>lkfdjslaf</Text>
      </View>
    );
  }
}

// AppRegistry.registerComponent("Home", () => TestHome);
AppRegistry.registerComponent("Home", () => App);
