import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Group = ({ group }) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("groupDetails", { group });
  };


  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: themeMode.blueLight,
          height: 100,
          width: 132,
          borderRadius: 10,
          marginRight: 16,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: group.photoURL }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_900Black",
            color: themeMode.white,
          }}
        >
          {group?.groupName}
        </Text>
        {group?.expenses.length > 0 ? (
          <RenderExpense
            expense={group?.expenses[0]}
            length={group?.expenses.length}
            themeMode={themeMode}
          />
        ) : (
          <Text>No Expense</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const RenderExpense = ({ expense, length, themeMode }) => {
  return (
    <View>
      <Text
        style={{
          color: themeMode.white,
          fontFamily: "Inter_400Regular",
        }}
      >
        You have {length} expenses
      </Text>
      <Text
        style={{
          color: themeMode.pinkLighter,
          fontFamily: "Inter_400Regular",
        }}
      >
        {expense?.description} expense is {expense?.amount}
      </Text>
      {length > 1 && (
        <Text
          style={{
            color: themeMode.pinkLighter,
            fontFamily: "Inter_400Regular",
          }}
        >
          plus other {length - 1}
        </Text>
      )}
    </View>
  );
};

export default Group;
