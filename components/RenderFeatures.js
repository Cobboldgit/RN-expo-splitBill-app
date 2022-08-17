import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const RenderFeatures = ({ themeMode, onPress }) => {
  const features = [
    {
      title: "Groups",
      icon: <FontAwesome name="group" size={24} color={themeMode.blueBlack} />,
      screen: "groups",
    },
    {
      title: "Expenses",
      icon: <FontAwesome name="dollar" size={24} color={themeMode.blueBlack} />,
      screen: "expenses",
    },
    {
      title: "Friends",
      icon: <Ionicons name="person" size={24} color={themeMode.blueBlack} />,
      screen: "friends",
    },
    {
      title: "Splits",
      icon: <FontAwesome name="cut" size={24} color={themeMode.blueBlack} />,
      screen: "splits",
    },
  ];

  return features.map((feature, index) => {
    return (
      <RenderItems
        onPress={onPress}
        key={index}
        item={feature}
        themeMode={themeMode}
      />
    );
  });
};

const RenderItems = ({ item, themeMode, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.screen)}
      style={{
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={[themeMode.pinkLighter, themeMode.pinkLight]}
        style={{
          height: 60,
          width: 60,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {item.icon}
      </LinearGradient>
      <Text
        style={{
          color: themeMode.white,
          fontSize: 16,
          fontFamily: "Inter_400Regular",
          marginTop: 10,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderFeatures;
