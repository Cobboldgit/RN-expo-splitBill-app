import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const TouchWithFeed = ({ onPress, icon, size: { width, height }, flex }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return Platform.OS === "android" ? (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(themeMode.pinkLighter, true)}
    >
      <View
        style={{
          width: width || undefined,
          height: height || undefined,
          ...flex,
        }}
      >
        {icon}
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: width || undefined,
          height: height || undefined,
          ...flex,
        }}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default TouchWithFeed;
