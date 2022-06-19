import { View, Text } from "react-native";
import React from "react";

const OweDrawList = ({themeMode}) => {
  const data = [1, 2, 3, 4, 4, 5, 5, 56, 6];
  return data.map((tiem, index) => {
    return <RenderOweDrawList key={index} themeMode={themeMode} />;
  });
};

const RenderOweDrawList = ({ item, themeMode }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          height: 1,
          width: 30,
          backgroundColor: themeMode.blueLight,
          marginRight: 11,
        }}
      />
      <Text
        style={{
          color: themeMode.blueLighter,
          fontSize: 16,
          fontFamily: "Inter_400Regular",
        }}
      >
        Augustine owes Ghc 20.00
      </Text>
    </View>
  );
};

export default OweDrawList;
