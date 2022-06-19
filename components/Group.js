import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Group = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("groupDetails");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: themeMode.blueLight,
          height: 100,
          width: 132,
          borderRadius: 10,
          marginRight: 16,
        }}
      ></View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_900Black",
            color: themeMode.white,
          }}
        >
          Family trip
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_400Regular",
            color: themeMode.blueLighter,
          }}
        >
          No expense
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Group;
