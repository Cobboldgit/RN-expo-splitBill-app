import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const PartticipantCard = ({ edit, item }) => {
  const { darkMode, participants, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        opacity: edit ? 0.7 : 1,
      }}
    >
      <Avatar />
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            color: themeMode.white,
          }}
        >
          { item?.phoneNumber === userData.phoneNumber ? "You" : item?.contactName }
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: themeMode.blueLighter,
          }}
        >
          No email address
        </Text>
      </View>
    </View>
  );
};

export default PartticipantCard;
