import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const Header = ({ onPress, title }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 30,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Inter_900Black",
          color: themeMode.white,
        }}
      >
        {title}
      </Text>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            themeMode.pinkLighter,
            true
          )}
          onPress={onPress}
        >
          <View>
            <Text
              style={{
                color: themeMode.blueLighter,
                fontSize: 16,
                fontFamily: "Inter_400Regular",
              }}
            >
              see all
            </Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: themeMode.blueLighter,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
            }}
          >
            see all
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
