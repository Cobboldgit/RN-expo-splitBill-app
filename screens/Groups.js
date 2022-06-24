import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation, useRoute } from "@react-navigation/native";
import GroupList from "../components/GroupList";
import {  setShowModal } from "../store/actions/appActions";
import CreateGroup from "./CreateGroup";
import { useEffect } from "react";

const Groups = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { darkMode, groupsData, } = useSelector((state) => state.appReducer);

  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;


  const handleAddButtonPress = () => {
    dispatch(setShowModal(true));
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      {/* Modal  */}
      <CreateGroup />

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
          >
            <TouchWithFeed
              onPress={handleAddButtonPress}
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="add-circle" color={themeMode.white} size={24} />
              }
            />
          </View>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* description */}
        <View
          style={{
            marginLeft: 60,
            marginTop: 30,
            marginBottom: 30,
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
            Groups
          </Text>
        </View>
        {/* description end  */}

        {/* groups  */}
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <GroupList/>
        </View>
        {/* groups end */}
      </ScrollView>
    </View>
  );
};

export default Groups;
