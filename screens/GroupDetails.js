import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  TouchableNativeFeedback,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SettleUp from "./SettleUp";
import Balances from "./Balances";
import Totals from "./Totals";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getAllGroups, setSelectedPaidBy } from "../store/actions/appActions";

const Tab = createMaterialTopTabNavigator();

const GroupDetails = () => {
  const navigation = useNavigation();
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const group = useRoute().params.group;
  const dispatch = useDispatch();
  const [numberOfPeopleWhoOwe, setNumberOfPeopleWhoOwe] = useState(0);

  const youAreOwed = group?.expenses
    ?.reduce((a, b) => a + b.amount, 0)
    .toFixed(2);

  const whoOweYou = group?.expenses.map((expense) => {
    let length = 0;
    let amount, name;
    if (expense.equal === true) {
      amount = parseFloat(expense.amountPerPerson).toFixed(2);
      name = expense.paidFor[0].contactName;
    } else {
      amount = expense.paidFor[0].amount;
      name = expense.paidFor[0].contactName;
    }

    length = length + expense.paidFor.length;
    return { name, amount, length };
  });

  console.log(whoOweYou[0]?.length);

  useEffect(() => {
    dispatch(
      setSelectedPaidBy({
        contactName: userData?.displayName,
        phoneNumber: userData?.phoneNumber,
      })
    );
  }, []);

  const handleAddExpense = () => {
    navigation.navigate("createExpense", { group });
  };

  const handleGoToSettings = () => {
    navigation.navigate("groupSettings", { group });
  };

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchWithFeed
              onPress={handleAddExpense}
              flex={{
                alignItems: "flex-end",
              }}
              size={{
                width: 35,
              }}
              icon={
                <Ionicons name="add-circle" color={themeMode.white} size={24} />
              }
            />
            <TouchWithFeed
              onPress={handleGoToSettings}
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
        </View>
        <TouchableOpacity
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
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: group?.photoURL }}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </TouchableOpacity>
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
          {group?.groupName}
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
            Ghc {youAreOwed}
          </Text>
        </View>

        {/* line 3 */}
        {whoOweYou.length > 0 && (
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
              {whoOweYou[0]?.name} owes
            </Text>
            <Text
              style={{
                color: themeMode.pinkLight,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              }}
            >
              Ghc {whoOweYou[0]?.amount}
            </Text>
          </View>
        )}

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
          Plus {numberOfPeopleWhoOwe} others
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
          <Tab.Screen
            name="settleUp"
            children={() => <SettleUp group={group} />}
          />
          <Tab.Screen name="balances" component={Balances} />
          <Tab.Screen name="totals" component={Totals} />
        </Tab.Navigator>
      </View>
      {/* body end */}
    </View>
  );
};

export default GroupDetails;
