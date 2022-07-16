import { View, Text, FlatList, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import PartticipantCard from "../components/PartticipantCard";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Unequally = ({ amount, groupData, handleFocusedRoute }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [split, setSplit] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  let total = split?.reduce((a, b) => a + b.amount, 0);
  let amt = parseFloat(amount).toFixed(2);
  let balance = amt - total;

  // when focosed
  useEffect(() => {
    if (navigation.isFocused() === true) {
      handleFocusedRoute("Unequally");
    }
  }, [navigation.isFocused()]);

  // get members with amount
  useEffect(() => {
    let members = [];
    for (let i = 0; i < groupData.participants.length; i++) {
      for (let j = 0; j < split.length; j++) {
        if (groupData.participants[i].id === split[j].id) {
          members.push(groupData.participants[i]);
        }
      }
    }
    setSelectedMembers(members);
  }, [split]);

  // send data to reducer
  useEffect(() => {
    dispatch({
      type: "SET_SPLIT",
      payload: {
        members: selectedMembers,
        groupId: groupData.id,
        numberOfPerson: selectedMembers.length,
        amountPerPerson: split,
      },
    });
  }, [split, selectedMembers]);

  // get input amount
  const handleSplit = (value, index, id) => {
    const number = parseFloat(value);

    const data = {
      id: id,
      amount: number,
    };

    if (split[index]) {
      let currData = split[index];
      currData.amount = number;
      setSplit([
        ...split.slice(0, index),
        { id: currData.id, amount: currData.amount },
        ...split.slice(index + 1),
      ]);
    } else {
      setSplit([...split, data]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter_900Black",
                color: themeMode.white,
                marginBottom: 10,
              }}
            >
              Split equally
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: themeMode.white,
              }}
            >
              Select which people owe an equal share of the bill
            </Text>
          </View>
        )}
        data={groupData?.participants}
        keyExtractor={(item) => `${item.phoneNumber}`}
        renderItem={({ item, index }) => (
          <ListMembers
            item={item}
            themeMode={themeMode}
            handleSplit={handleSplit}
            index={index}
          />
        )}
      />

      <View
        style={{
          height: 80,
          backgroundColor: themeMode.blueBlack,
          justifyContent: "center",
          paddingVertical: 16,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: amount ? themeMode.white : "red",
              fontFamily: "Inter_400Regular",
              marginRight: 10,
            }}
          >
            Ghc {total?.toFixed(2)} of Ghc {amt}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: themeMode.white,
              fontFamily: "Inter_400Regular",
              marginRight: 10,
            }}
          >
            Ghc {balance.toFixed(2)} left
          </Text>
        </View>
      </View>
    </View>
  );
};

const ListMembers = ({ item, themeMode, handleSplit, index }) => {
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   handleSplit(value);
  // },[value])

  return (
    <View
      style={{
        borderRadius: 5,
        alignItems: "center",
        paddingHorizontal: 16,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <PartticipantCard item={item} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
          }}
        >
          Ghc
        </Text>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          onBlur={() => {
            if (value != "") {
              handleSplit(value, index, item.id);
            }
          }}
          placeholder="0.00"
          placeholderTextColor={themeMode.blueLighter}
          keyboardType="numeric"
          style={{
            borderBottomColor: themeMode.blueLighter,
            borderBottomWidth: 1,
            color: themeMode.white,
            fontSize: 16,
            fontFamily: "Inter_400Regular",
            minWidth: "15%",
            maxWidth: 70,
            paddingLeft: 5,
            textAlign: "right",
          }}
        />
      </View>
    </View>
  );
};

export default Unequally;
