import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import SquareButton from "./SquareButton";
import { Ionicons } from "@expo/vector-icons";

const Friends = ({ type }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: themeMode.blueLight,
        height: 64,
        borderRadius: 15,
        width: type === "friends" ? "100%" : "47%",
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 2,
      }}
    >
      <SquareButton
        icon={<Ionicons name="person" size={40} color={themeMode.pinkLight} />}
        colors={[themeMode.blueLight, themeMode.black]}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 16,
            color: themeMode.white,
            marginLeft: 10,
          }}
        >
          Augustine
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Friends;
