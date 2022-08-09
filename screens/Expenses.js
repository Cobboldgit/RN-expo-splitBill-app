import { View, Text, StatusBar, SectionList, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import SettleUpList from "../components/SettleUpList";
import Settle from "../components/Settle";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";

const Expenses = () => {
  const [data, setData] = React.useState([]);
  const { darkMode, userData, groupsData } = useSelector(
    (state) => state.appReducer
  );
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  useEffect(() => {
    const rootData = [];

    groupsData.forEach((group) => {
      group.expenses.forEach((expense) => {
        rootData.push(expense);
      });
    });

    setData(rootData);
  }, [groupsData]);

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
              // onPress={handleAddButtonPress}
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="add-circle" color={themeMode.white} size={24} />
              }
            />
          </View>
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 65,
            width: 65,
            backgroundColor: themeMode.blueBlack,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>
      {/* header end  */}

      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              marginLeft: 60,
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Inter_900Black",
                color: themeMode.white,
                marginBottom: 10,
              }}
            >
              Expenses
            </Text>
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <View style={{
            paddingHorizontal: 16,
          }}>
            <Settle data={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Expenses;
