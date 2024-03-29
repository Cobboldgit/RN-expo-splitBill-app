import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Fragment } from "react";
import Screen from "./routes/screen";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import * as Notifications from "expo-notifications";
import Notify from "./components/Notify";

// Ignore yellow warnings
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// renders screens
const Main = () => {
  const { darkMode } = useSelector((state) => state.appReducer);

  return (
    <Fragment>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Notify />
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
