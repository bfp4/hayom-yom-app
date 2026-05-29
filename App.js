import React from 'react';
import { useFonts } from "expo-font"
import { Provider } from "react-redux"
import store from "./redux/store"

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
      <View style={{height: "100%"}}>
        <LoadingIcon />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

