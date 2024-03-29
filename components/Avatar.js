import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import {Ionicons} from "@expo/vector-icons"

const Avatar = ({ uri, height, width }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        height: height || 50,
        width: width || 50,
        backgroundColor: themeMode.blueLight,
        borderRadius: 50,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden',
        borderColor: themeMode.pinkLight,
        borderBottomWidth: 1,
        borderRightWidth: 1,
      }}
    >
      {uri ? (
        <Image source={{ uri }} style={{ height: "100%", width: "100%" }} />
      ) :<Ionicons name="person" size={30} color={themeMode.blueBlack}/> }
    </View>
  );
};

export default Avatar;
