import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Settle = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("expenseDetails");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 16,
          }}
        >
          Jun
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 24,
          }}
        >
          01
        </Text>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: themeMode.pinkLighter,
          width: 80,
          marginRight: 10,
        }}
      ></View>
      <View>
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 20,
            color: themeMode.white,
          }}
        >
          Bar
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
          }}
        >
          You paid Ghc 400.00
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Settle;
