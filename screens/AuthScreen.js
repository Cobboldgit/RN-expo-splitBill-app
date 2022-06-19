import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./Login";
import Register from "./Register";

const Tab = createMaterialTopTabNavigator();

const AuthScreen = () => {
  const { darkMode } = useSelector((state) => state.appReducer);

  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            minHeight: 500,
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginHorizontal: 16,
            backgroundColor: themeMode.blueLight,
            borderRadius: 20,
            marginTop: Dimensions.get("window").height / 4
          }}
        >
          <Tab.Navigator
            screenOptions={({ route }) => {
              return {
                tabBarLabel: () => {
                  if (route.name === "login") {
                    return (
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          fontSize: 18,
                          color: themeMode.white,
                        }}
                      >
                        Login
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
                        Register
                      </Text>
                    );
                  }
                },
                tabBarStyle: {
                  backgroundColor: "#ffffff36",
                  borderRadius: 10,
                  elevation: 0,
                  shadowOpacity: 0,
                  overflow: "hidden",
                  height: 60,
                  justifyContent: "center",
                },
                tabBarIndicatorStyle: {
                  backgroundColor: themeMode.pinkLight,
                  height: "100%",
                },
              };
            }}
            initialRouteName="login"
          >
            <Tab.Screen name="login" component={Login} />
            <Tab.Screen name="register" component={Register} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
