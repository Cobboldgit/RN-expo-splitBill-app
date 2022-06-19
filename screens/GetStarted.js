import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";

import { useNavigation } from "@react-navigation/native";
import Button3D from "../components/Button3D";

const GetStarted = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const navigation = useNavigation();
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handlPress = () => {
    navigation.navigate("auth");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          marginTop: "auto",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={handlPress} activeOpacity={0.6}>
          <Button3D text={'Get Started'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
