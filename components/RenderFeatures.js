import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const RenderFeatures = ({ themeMode, onPress }) => {
  const features = [
    {
      title: "Groups",
      icon: "",
      screen: 'groups'
    },
    {
      title: "Expenses",
      icon: "",
      screen: 'expenses'
    },
    {
      title: "Friends",
      icon: "",
      screen: 'friends'
    },
    {
      title: "Splits",
      icon: "",
      screen: 'splits'
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
        }}
      >
        <Image />
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
