import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../store/actions/appActions";
import { images } from "../constants";
import { theme } from "../constants";

const GroupList = ({}) => {
  const { groupsData } = useSelector((state) => state.appReducer);

  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  if (groupsData.length > 0) {
    return groupsData.map((group, index) => {
      return <Group key={index} group={group} />;
    });
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <Image
          source={images.noGroup}
          style={{
            height: 200,
            width: 200,
            borderRadius: 200,
          }}
        />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            marginTop: 10,
            color: themeMode.blueLighter,
          }}
        >
         No group found
        </Text>
        <Pressable
          style={({ pressed }) => {
            return {
              transform: [{ scale: pressed ? 0.98 : 1 }],
              marginTop: 10
            };
          }}
        >
          <View
            style={{
              height: 60,
              width: 200,
              backgroundColor: themeMode.pinkLighter,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: themeMode.white,
                fontSize: 16,
                fontFamily: "Inter_400Regular",
              }}
            >
              + Create
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
};

export default GroupList;
