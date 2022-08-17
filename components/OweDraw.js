import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import OweDrawList from "./OweDrawList";

const OweDraw = ({data}) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;


  const amountYouPaid = parseFloat(data?.amount).toFixed(2);

  const paidBy =
    data?.paidBy.phoneNumber === userData?.phoneNumber
      ? "You"
      : data?.paidBy.contactName;

  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderColor: themeMode.blueLight,
        marginLeft: 23
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: themeMode.blueLight,
            position: 'absolute',
            zIndex: 1,
            left: -25,
            top: -15,
          }}
        >
          <Image source={{uri: userData?.photoUrl}} style={{
            height: '100%',
            width: '100%',
            borderRadius: 50,
          }}/>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            marginLeft: 40,
            marginBottom: 20
          }}
        >
          {paidBy} paid Ghc {amountYouPaid}
        </Text>
      </View>
      <OweDrawList themeMode={themeMode} data={data}/>
    </View>
  );
};

export default OweDraw;
