import { View, Text } from "react-native";
import React from "react";
import {useIsArray} from "../hooks";
import { useSelector } from "react-redux";

const OweDrawList = ({ themeMode, data }) => {
  const datas = [1, 2, 3, 4, 4, 5, 5, 56, 6];
  console.log(data);
  return data?.paidFor.map((item, index) => {
    return (
      <RenderOweDrawList
        key={index}
        index={index}
        themeMode={themeMode}
        item={item}
        amountPerPerson={data?.amountPerPerson || data?.paidFor}
      />
    );
  });
};

const RenderOweDrawList = ({ item, themeMode, index, amountPerPerson }) => {

  const { userData } = useSelector((state) => state.appReducer);

  const amountYouOwe = useIsArray(amountPerPerson)
    ? parseFloat(amountPerPerson[index]?.amount).toFixed(2)
    : parseFloat(amountPerPerson).toFixed(2);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          height: 1,
          width: 30,
          backgroundColor: themeMode.blueLight,
          marginRight: 11,
        }}
      />
      <Text
        style={{
          color: themeMode.blueLighter,
          fontSize: 16,
          fontFamily: "Inter_400Regular",
        }}
      >
        {item?.contactName === userData?.displayName ? 'You' : item?.contactName} owes Ghc {amountYouOwe}
      </Text>
    </View>
  );
};

export default OweDrawList;
