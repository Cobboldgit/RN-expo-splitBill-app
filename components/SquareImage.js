import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const SquareImage = ({ url }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: themeMode.blueLight,
          borderRadius: 5,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: themeMode.blueLighter,
          height: 50,
          width: 50,
          marginRight: 15,
          overflow: "hidden",
        }}
      >
        {url ? (
          <Image
            source={{ uri: url }}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default SquareImage;
