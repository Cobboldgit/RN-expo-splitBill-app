import { View, Text, TextInput } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const Input = ({ placeholder, value, onChangeText, bottom }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={themeMode.white}
      style={{
        height: 60,
        borderRadius: 10,
        backgroundColor: themeMode.pinkLighter,
        marginBottom: bottom || 0,
        color: themeMode.white,
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
        paddingHorizontal: 20
      }}
    />
  );
};

export default Input;
