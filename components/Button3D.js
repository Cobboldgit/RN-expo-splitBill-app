import { Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const Button3D = ({ text }) => {
  const { darkMode } = useSelector((state) => state.appReducer);

  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <LinearGradient
      style={{
        height: 60,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={[themeMode.pinkLighter, themeMode.pinkLight]}
    >
      <Text
        style={{
          fontSize: 20,
          color: themeMode.white,
          fontFamily: "Inter_900Black",
        }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
};

export default Button3D;
