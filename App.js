import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Fragment } from "react";
import Screen from "./routes/screen";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";

// Ignore yellow warnings
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);



// renders screens
const Main = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  
  return (
    <Fragment>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Screen />
    </Fragment>
  );
};

// Main export
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
