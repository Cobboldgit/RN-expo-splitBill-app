import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import SettleUpList from "../components/SettleUpList";

const SettleUp = ({group}) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
        paddingTop: 20,
      }}
    >
      {/* date  */}
      <Text
        style={{
          color: themeMode.white,
          fontSize: 16,
          fontFamily: "Inter_400Regular",
          marginBottom: 20,
        }}
      >
        June 2022
      </Text>
      {/* date  end*/}

      <ScrollView>
        <SettleUpList group={group} />
      </ScrollView>
    </View>
  );
};

export default SettleUp;
