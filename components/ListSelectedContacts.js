import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const ListSelectedContacts = ({ contact, remove }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        alignItems: "center",
        width: 80,
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: themeMode.pinkLight,
          marginRight: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 20,
          }}
        >
          {contact.contactName.split(" ")[0].split("")[0]}
        </Text>
        <TouchableOpacity
          onPress={() => remove(contact)}
          style={{
            backgroundColor: themeMode.blueLight,
            height: 20,
            width: 20,
            borderRadius: 20,
            position: "absolute",
            top: 5,
            left: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="close" size={10} color={themeMode.blueLighter} />
        </TouchableOpacity>
      </View>

      <Text
        numberOfLines={1}
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          color: themeMode.white,
        }}
      >
        {contact.contactName}
      </Text>
    </View>
  );
};

export default ListSelectedContacts;
