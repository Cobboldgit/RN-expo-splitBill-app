import { View, Text, StatusBar } from "react-native";
import { theme } from "../constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import TouchWithFeed from "../components/TouchWithFeed";
import { Ionicons } from "@expo/vector-icons";

const ContactOrSupport = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      <View
        style={{
          height: 100,
          backgroundColor: themeMode.pinkLight,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{ width: 50, height: 20 }}
            icon={
              <Ionicons name="arrow-back" color={themeMode.white} size={24} />
            }
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 5,
            borderColor: themeMode.blueBlack,
            height: 60,
            width: 60,
            backgroundColor: themeMode.pinkLight,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>

      <View
        style={{
          marginLeft: 65,
          marginTop: 40,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontSize: 24,
            fontFamily: "Inter_900Black",
          }}
        >
          Contact / Support
        </Text>
        <Text
          style={{
            color: themeMode.blueLighter,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
          }}
        >
          Contact or support
        </Text>
      </View>
    </View>
  );
};

export default ContactOrSupport;
