import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { icons, images, theme } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import ThemeList from "../components/ThemeList";
import { Ionicons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation } from "@react-navigation/native";

const Theme = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const themeData = [
    {
      image: images.theme1,
      color: "dark",
      id: 1,
    },
    {
      image: images.theme2,
      color: "light",
      id: 2,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
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
              // marginBottom: 30,
            }}
          >
            <TouchWithFeed
              onPress={() => navigation.goBack()}
              size={{ width: 50, height: 20 }}
              icon={
                <Ionicons name="arrow-back" color={themeMode.white} size={24} />
              }
            />
            {/* <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchWithFeed
                onPress={handleSelectImage}
                flex={{
                  alignItems: "flex-end",
                }}
                size={{ width: 35 }}
                icon={
                  <Ionicons name="camera" color={themeMode.white} size={24} />
                }
              />
              <TouchWithFeed
                onPress={handleDeletePressed}
                flex={{
                  alignItems: "flex-end",
                }}
                size={{ width: 35 }}
                icon={
                  <Ionicons
                    name="trash-bin"
                    color={themeMode.white}
                    size={24}
                  />
                }
              />
              <TouchWithFeed
                onPress={handleEditPressed}
                flex={{
                  alignItems: "flex-end",
                }}
                size={{ width: 35 }}
                icon={
                  <MaterialIcons
                    name="edit"
                    color={themeMode.white}
                    size={24}
                  />
                }
              />
            </View> */}
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
            Theme
          </Text>
          <Text
            style={{
              color: themeMode.blueLighter,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
            }}
          >
            Long press on theme to view
          </Text>
        </View>

        {/* themes start */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <ThemeList data={themeData} />
        </View>
        {/* themes end  */}
      </ScrollView>
    </View>
  );
};

export default Theme;
