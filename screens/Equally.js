import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import CheckBox from "../components/CheckBox";
import { useState } from "react";
import { useEffect } from "react";
import PartticipantCard from "../components/PartticipantCard";
import { useNavigation } from "@react-navigation/native";

const Equally = ({ amount, groupData, handleFocusedRoute }) => {
  const dispatch = useDispatch();
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [checked, setChecked] = useState(true);
  const [selectedAll, setSelectedAll] = useState(true);
  const [split, setSplit] = useState(0);

  useEffect(() => {
    if (navigation.isFocused() === true) {
      handleFocusedRoute("equally");
    }
  }, [navigation.isFocused()]);

  // send data to split state in reducer
  useEffect(() => {
    dispatch({
      type: "SET_SPLIT",
      payload: {
        amountPerPerson: split,
        members: selectedMembers,
        groupId: groupData.id,
        numberOfPerson: selectedMembers.length,
      },
    });
  }, [split, selectedMembers]);


  // select all members in group
  useEffect(() => {
    (async () => {
      let newArr = [];
      groupData?.participants.forEach((item) => {
        newArr.push(item);
      });
      setSelectedMembers(newArr);

      setSelectedAll(true);

      setSplit(newArr.length > 0 ? amount / newArr.length : 0);
    })();
  }, []);

  // handles check box
  const handleSelectedItem = (item, isChecked) => {
    // if a box is checked
    if (isChecked) {
      // add item to selected members
      // setSelectedMembers([...selectedMembers, item]);
      selectedMembers.push(item);

      // calculate amount per person
      setSplit(
        selectedMembers.length > 0 ? amount / selectedMembers.length : 0
      );

      // if all boxes are checked
      if (groupData?.participants.length == selectedMembers.length) {
        setSelectedAll(true);
      }
    } else {
      // remove item from selected members
      selectedMembers.splice(selectedMembers.indexOf(item), 1);

      // calculate amount per person
      setSplit(
        selectedMembers.length > 0 ? amount / selectedMembers.length : 0
      );

      // if all boxes are unchecked
      if (groupData?.participants.length > selectedMembers.length) {
        setSelectedAll(false);
      }
    }
  };

  // handles select all
  const handleSelectAll = () => {
    if (!checked) {
      // clear selected members
      setSelectedMembers([]);

      // set selected all to true
      setSelectedAll(true);

      let newArr = [];

      // loop through to array and push into newArr array
      groupData?.participants.forEach((item) => {
        newArr.push(item);
      });

      // add newArr to selected members
      setSelectedMembers(newArr);

      // calculate price per person
      setSplit(newArr.length > 0 ? amount / newArr.length : 0);
    } else {
      // clear selected members
      setSelectedMembers([]);

      // set selected all to false
      setSelectedAll(false);

      // calculate price per person (0)
      setSplit(0);
    }

    // set checked to opposite of checked (always)
    setChecked(!checked);
  };

  // main render
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
        renderItem={({ item }) => (
          <ListMembers
            item={item}
            themeMode={themeMode}
            handleSelectedItem={handleSelectedItem}
            checked={checked}
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
              color: amount ? themeMode.white : themeMode.pinkLighter,
              fontFamily: "Inter_400Regular",
              marginRight: 10,
            }}
          >
            Ghc {split.toFixed(2)}/person
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: themeMode.white,
              fontFamily: "Inter_400Regular",
              marginRight: 10,
            }}
          >
            {groupData?.participants.length} people
          </Text>
        </View>
        <View
          style={{
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderLeftColor: themeMode.blueLighter,
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            flex: 3,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: themeMode.white,
              fontFamily: "Inter_400Regular",
              marginRight: 10,
            }}
          >
            All
          </Text>
          <CheckBox
            onPress={handleSelectAll}
            isChecked={selectedAll}
            size={24}
            color={themeMode.pinkLight}
          />
        </View>
      </View>
    </View>
  );
};

const ListMembers = ({ item, themeMode, handleSelectedItem, checked }) => {
  const [isChecked, setIschecked] = useState(checked);

  useEffect(() => {
    setIschecked(checked);
  }, [checked]);

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
      <CheckBox
        size={30}
        color={themeMode.pinkLight}
        onPress={() => {
          setIschecked(!isChecked);
          handleSelectedItem(item, !isChecked);
        }}
        isChecked={isChecked}
      />
    </View>
  );
};

export default Equally;
