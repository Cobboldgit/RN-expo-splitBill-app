import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import TouchWithFeed from "../components/TouchWithFeed";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Equally from "./Equally";
import Unequally from "./Unequally";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { setEqualSplit } from "../store/actions/appActions";

const Tab = createMaterialTopTabNavigator();

const SplitProportion = ({}) => {
  const navigation = useNavigation();
  const { amount, group } = useRoute().params;
  const [focusedScreen, setFocusedScreen] = useState('equally');

  const dispatch = useDispatch();

  const { darkMode, userData, split } = useSelector(
    (state) => state.appReducer
  );
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleFocusedRoute = (routeName) => {
    setFocusedScreen(routeName);
  };

  const handleSubmit = () => {
    if (focusedScreen === "equally") {
      dispatch(setEqualSplit(true))
    } else {
      dispatch(setEqualSplit(false))
    }
    navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* header */}
      <View
        style={{
          height: 70,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //   borderBottomColor: themeMode.white,
          //   borderBottomWidth: StyleSheet.hairlineWidth,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{
              width: 50,
            }}
            icon={
              <Ionicons
                name="arrow-back"
                color={themeMode.blueLighter}
                size={30}
              />
            }
          />
          <Text
            style={{
              color: themeMode.white,
              fontSize: 20,
              fontFamily: "Inter_400Regular",
            }}
          >
            Adjust split
          </Text>
        </View>
        <TouchWithFeed
          onPress={handleSubmit}
          flex={{
            alignItems: "flex-end",
          }}
          size={{
            width: 50,
          }}
          icon={
            <Ionicons
              name="md-checkmark"
              color={themeMode.blueLighter}
              size={30}
            />
          }
        />
      </View>
      {/* header  end*/}

      <View
        style={{
          flex: 1,
        }}
      >
        <Tab.Navigator
          initialRouteName="equally"
          screenOptions={({ route }) => {
            return {
              tabBarLabel: ({ focused }) => {
                if (route.name === "equally") {
                  return (
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 18,
                        color: themeMode.white,
                      }}
                    >
                      Equally
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 18,
                        color: themeMode.white,
                      }}
                    >
                      Unequally
                    </Text>
                  );
                }
              },
              tabBarStyle: {
                backgroundColor: themeMode.blueBlack,
                borderRadius: 10,
                elevation: 0,
                shadowOpacity: 0,
                overflow: "hidden",
                height: 60,
                justifyContent: "center",
              },
              tabBarIndicatorStyle: {
                backgroundColor: themeMode.blueLighter,
              },
            };
          }}
        >
          <Tab.Screen
            name="equally"
            children={() => (
              <Equally
                amount={amount}
                groupData={group}
                handleFocusedRoute={handleFocusedRoute}
              />
            )}
          />
          <Tab.Screen
            name="unequally"
            children={() => (
              <Unequally
                amount={amount}
                groupData={group}
                handleFocusedRoute={handleFocusedRoute}
              />
            )}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default SplitProportion;
