import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import OweDrawList from "./OweDrawList";

const OweDraw = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderColor: themeMode.blueLight,
        marginLeft: 23
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: themeMode.blueLight,
            position: 'absolute',
            zIndex: 1,
            left: -25,
            top: -15,
          }}
        ></View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            marginLeft: 40,
            marginBottom: 20
          }}
        >
          You paid Ghc 100.00
        </Text>
      </View>
      <OweDrawList themeMode={themeMode}/>
    </View>
  );
};

export default OweDraw;
