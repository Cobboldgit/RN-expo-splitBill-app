import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Settle = ({ data, index }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();
  console.log(data?.photoURL);
  const handlePress = () => {
    navigation.navigate("expenseDetails", { data, index });
  };

  const amountYouPaid = parseFloat(data?.amount).toFixed(2);

  const paidBy =
    data?.paidBy.phoneNumber === userData?.phoneNumber
      ? "You"
      : data?.paidBy.contactName;

  const rawDate = data?.createdAt;
  const convertedDate = new Date(rawDate).toLocaleString();
  const dateArray = convertedDate.split(" ");
  const month = dateArray[1];
  const day = dateArray[2];

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 16,
          }}
        >
          {month}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 24,
          }}
        >
          {day}
        </Text>
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: themeMode.pinkLighter,
          width: 80,
          marginRight: 10,
        }}
      >
        {data?.photoURL != "" && (
          <Image
            resizeMode="cover"
            source={{ uri: data?.photoURL }}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        )}
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 20,
            color: themeMode.white,
          }}
        >
          {data?.description}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
          }}
        >
          {`${paidBy} paid Ghc ${amountYouPaid}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Settle;
