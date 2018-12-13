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

AppRegistry.registerComponent("Home", () => App);
