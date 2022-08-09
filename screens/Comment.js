import { View, Text, StatusBar } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";
import TouchWithFeed from "../components/TouchWithFeed";
import { Ionicons } from "@expo/vector-icons";
import Chat from "../components/Chat";
import { useState } from "react";
import { useEffect } from "react";

const Comment = () => {
  const navigation = useNavigation();
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
      }}
    >
      {/* header  */}
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
          <View
            style={{
              flexDirection: "row",
            }}
          ></View>
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 65,
            width: 65,
            backgroundColor: themeMode.blueBlack,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>
      {/* header end  */}

      <View
        style={{
          marginLeft: 60,
          marginTop: 30,
          // marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Inter_900Black",
            color: themeMode.white,
            marginBottom: 10,
          }}
        >
          Comments
        </Text>
      </View>

      <Chat />
    </View>
  );
};

export default Comment;
