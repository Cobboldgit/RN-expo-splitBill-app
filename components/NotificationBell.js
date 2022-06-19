import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { theme } from "../constants";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const NotificationBell = ({ onPress }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 10,
          backgroundColor: themeMode.blueLight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: themeMode.white,
            height: 8,
            width: 8,
            borderRadius: 8,
            position: "absolute",
            zIndex: 1,
            top: 10,
            right: 15,
          }}
        />
        <Ionicons name="notifications" size={30} color={themeMode.pinkLight} />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBell;
