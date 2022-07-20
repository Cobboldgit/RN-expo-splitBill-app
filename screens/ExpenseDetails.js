import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import OweDraw from "../components/OweDraw";
import { useNavigation, useRoute } from "@react-navigation/native";

import Chat from "../components/Chat";

const ExpenseDetails = () => {
  const navigation = useNavigation();

  const { data } = useRoute().params;
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

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
  const year = dateArray[4];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
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
            // marginBottom: 30,
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
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="camera" color={themeMode.white} size={24} />
              }
            />
            <TouchWithFeed
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="trash-bin" color={themeMode.white} size={24} />
              }
            />
            <TouchWithFeed
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <MaterialIcons name="edit" color={themeMode.white} size={24} />
              }
            />
          </View>
        </View>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 5,
            borderColor: themeMode.blueBlack,
            height: 60,
            width: 60,
            backgroundColor: themeMode.pinkLight,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>
      {/* header end  */}

      <ScrollView
        style={{
          flexGrow: 1,
        }}
      >
        {/* description */}
        <View
          style={{
            marginLeft: 65,
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_900Black",
              color: themeMode.white,
              marginBottom: 5,
            }}
          >
            {data?.description}
          </Text>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.white,
            }}
          >
            Ghc {amountYouPaid}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.blueLighter,
            }}
          >
            Added by {paidBy} on {day} {month} {year}
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.blueLighter,
            }}
          >
            Updated by you on 1 June 2022
          </Text> */}
        </View>
        {/* description end  */}

        {/* chart  */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 30,
          }}
        >

          {/* owe graph  */}
          <OweDraw data={data}/>
        </View>
        {/* chart end */}

        {/* comment */}
        <View style={{ height: 450 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter_900Black",
              color: themeMode.white,
              marginHorizontal: 16,
            }}
          >
            Comments
          </Text>

          {/* chat  */}
          <Chat />
        </View>
        {/* comment end */}
      </ScrollView>
    </View>
  );
};

export default ExpenseDetails;
