import { StyleSheet, Linking, I18nManager, Text } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from '@react-navigation/native';

import { AppStack } from "./src/navigation/AppStack";
import { Provider } from "react-redux";
import { store } from "./src/store";
export default function App() {
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  // if (__DEV__) {
  //   require("./ReactotronConfig");
  // }
  let [fontsLoaded] = useFonts({
    Bold: require("./src/assets/fonts/Bold.ttf"),
    Light: require("./src/assets/fonts/Light.ttf"),
    Regular: require("./src/assets/fonts/Regular.ttf"),
    Medium: require("./src/assets/fonts/Medium.ttf"),
    ExtraBold: require("./src/assets/fonts/ExtraBold.ttf")
  });
  if (!fontsLoaded) {
    return null;
  }



  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});