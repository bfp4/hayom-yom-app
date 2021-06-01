import React, { useState } from 'react';
import { useFonts } from "@use-expo/font"
import { Provider } from "react-redux"
import store from "./redux/store"
import firebaseConfig from "./firebaseConfig"
import * as firebase from "firebase"
import useAddFirestore from "./hooks/useAddFirestore"

import LoadingIcon from "./components/loading-icon/LoadingIcon"
import Main from "./components/main/Main"
import { View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    "lemonada-bold": require("./assets/fonts/Lemonada-SemiBold.ttf"),
    "lemonada": require("./assets/fonts/Lemonada-Regular.ttf")
  })

  if (!fontsLoaded) {
    return (
      <View>
        <LoadingIcon size="100%" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

