import { View, Text } from "react-native";
import React from "react";
import { theme } from "../constants";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.lightTheme.blueBlack,
      }}
    >
      <Text
        style={{
          color: theme.lightTheme.pinkLight,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Split Bills
      </Text>
    </View>
  );
};

export default Loading;
