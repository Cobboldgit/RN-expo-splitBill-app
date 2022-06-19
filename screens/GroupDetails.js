import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SettleUp from "./SettleUp";
import Balances from "./Balances";
import Totals from "./Totals";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const GroupDetails = () => {
  const navigation = useNavigation();
  const { darkMode } = useSelector((state) => state.appReducer);
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
          height: 150,
          backgroundColor: themeMode.pinkLight,
          paddingHorizontal: 16,
          paddingTop: StatusBar.currentHeight,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{
              width: 35,
            }}
            icon={
              <Ionicons name="arrow-back" color={themeMode.white} size={24} />
            }
          />
          <TouchWithFeed
            flex={{
              alignItems: "flex-end",
            }}
            size={{
              width: 35,
            }}
            icon={
              <Ionicons name="settings" color={themeMode.white} size={24} />
            }
          />
        </View>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 8,
            borderColor: themeMode.blueBlack,
            height: 100,
            width: 100,
            backgroundColor: themeMode.pinkLight,
            position: "absolute",
            top: 100,
            zIndex: 1,
            left: 60,
          }}
        ></View>
      </View>
      {/* header end  */}

      {/* description  */}
      <View
        style={{
          marginLeft: 68,
          marginTop: 70,
        }}
      >
        {/* line 1 */}
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Inter_900Black",
            color: themeMode.white,
            marginBottom: 10,
          }}
        >
          Friday night
        </Text>

        {/* line 2 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: themeMode.pinkLight,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              marginRight: 5,
            }}
          >
            You are owed
          </Text>
          <Text
            style={{
              color: themeMode.pinkLight,
              fontSize: 16,
              fontFamily: "Inter_900Black",
              marginRight: 5,
            }}
          >
            Ghc 400.00
          </Text>
          <Text
            style={{
              color: themeMode.pinkLight,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
            }}
          >
            You are owed
          </Text>
        </View>

        {/* line 3 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: themeMode.white,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              marginRight: 5,
            }}
          >
            Augustine owes you
          </Text>
          <Text
            style={{
              color: themeMode.pinkLight,
              fontFamily: "Inter_400Regular",
              fontSize: 16,
            }}
          >
            Ghc 20.00
          </Text>
        </View>

        {/* line 4 */}
        <Text
          style={{
            color: themeMode.white,
            fontSize: 16,
            fontFamily: "Inter_400Regular",
            marginRight: 5,
            marginBottom: 10,
          }}
        >
          Plus 3 others
        </Text>
      </View>
      {/* description end */}

      {/* body  */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 5,
          marginTop: 30,
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              tabBarLabel: () => {
                if (route.name === "settleUp") {
                  return (
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 18,
                        color: themeMode.white,
                      }}
                    >
                      Settle up
                    </Text>
                  );
                } else if (route.name === "balances") {
                  return (
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        fontSize: 18,
                        color: themeMode.white,
                      }}
                    >
                      Balances
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
                      Totals
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
          <Tab.Screen name="settleUp" component={SettleUp} />
          <Tab.Screen name="balances" component={Balances} />
          <Tab.Screen name="totals" component={Totals} />
        </Tab.Navigator>
      </View>
      {/* body end */}
    </View>
  );
};

export default GroupDetails;
