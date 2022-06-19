import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const SquareButton = ({ colors = Array, onPress, icon }) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        style={{
          height: 60,
          width: 60,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <LinearGradient
      colors={colors}
      style={{
        height: 60,
        width: 60,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </LinearGradient>
  );
};

export default SquareButton;
