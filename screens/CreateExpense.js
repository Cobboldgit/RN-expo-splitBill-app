import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import { createExpense, setShowModal } from "../store/actions/appActions";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const CreateExpense = () => {
  // states
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidFor, setPaidFor] = useState([]);
  // const [paidBy, setPaidBy] = useState("");

  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { group } = useRoute().params;

  // selectors
  const { darkMode, selectedPaidBy, userData, split, equalSplit } = useSelector(
    (state) => state.appReducer
  );
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  useEffect(() => {
    if (amount != 0) {
      dispatch({
        type: "SET_SPLIT",
        payload: {
          amountPerPerson: amount / group.participants.length,
          members: group.participants,
          groupId: group.id,
          numberOfPerson: group.participants.length,
        },
      });
    }
  }, [amount]);

  console.log("split", equalSplit);

  // paid by
  const handlePaidBy = () => {
    navigation.navigate("paidBy", { members: group.participants });
  };

  // split proportion
  const handleSplitProportion = () => {
    navigation.navigate("splitProportion", {
      group: group,
      amount: +amount,
    });
  };


  // submit
  const handleSubmit = () => {
    let data = {
      description,
      amount: +amount,
      paidBy: selectedPaidBy,
      paidFor: split?.members,
      equal: equalSplit,
      groupId: split?.groupId,
    };

    dispatch(createExpense(data));
    navigation.goBack()
  };

  // console.log(split);

  const paidByText =
    selectedPaidBy?.phoneNumber === userData?.phoneNumber
      ? "You"
      : selectedPaidBy?.contactName;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* header */}

      <View
        style={{
          height: 70,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: themeMode.white,
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingHorizontal: 16,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{
              width: 50,
            }}
            icon={
              <Ionicons
                name="arrow-back"
                color={themeMode.blueLighter}
                size={30}
              />
            }
          />
          <Text
            style={{
              color: themeMode.white,
              fontSize: 20,
              fontFamily: "Inter_400Regular",
            }}
          >
            Add Expense
          </Text>
        </View>
        <TouchWithFeed
          onPress={handleSubmit}
          size={{
            width: undefined,
          }}
          icon={
            <Text
              style={{
                fontSize: 18,
                color: themeMode.pinkLight,
                fontFamily: "Inter_400Regular",
              }}
            >
              Save
            </Text>
          }
        />
      </View>
      {/* header end */}
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {/* participants */}
          <View
            style={{
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_900Black",
                color: themeMode.white,
                fontSize: 18,
              }}
            >
              With you and
            </Text>
          </View>
          {/* participants end  */}

          {/* description   */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: themeMode.blueLight,
                  borderRadius: 5,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: themeMode.blueLighter,
                  height: 50,
                  width: 50,
                  marginRight: 15,
                }}
              ></View>
            </TouchableOpacity>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor={themeMode.blueLight}
              style={{
                height: 48,
                flex: 1,
                borderBottomColor: themeMode.blueLighter,
                borderBottomWidth: 1,
                fontSize: 18,
                fontFamily: "Inter_400Regular",
                color: themeMode.white,
              }}
            />
          </View>
          {/* description end  */}

          {/* amount */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: themeMode.blueLight,
                  borderRadius: 5,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: themeMode.blueLighter,
                  height: 50,
                  width: 50,
                  marginRight: 15,
                }}
              ></View>
            </TouchableOpacity>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
              placeholder="0.00"
              placeholderTextColor={themeMode.blueLight}
              style={{
                height: 48,
                flex: 1,
                borderBottomColor: themeMode.blueLighter,
                borderBottomWidth: 1,
                fontSize: 20,
                fontFamily: "Inter_400Regular",
                color: themeMode.white,
              }}
            />
          </View>
          {/* amount end */}

          {/* paid by  */}
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              alignItems: "center",
              // flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 18,
                color: themeMode.white,
              }}
            >
              Paid by
            </Text>
            <TouchableOpacity
              onPress={handlePaidBy}
              style={{
                backgroundColor: themeMode.blueLight,
                borderColor: themeMode.blueLighter,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 5,
                //   width: 100,
                paddingHorizontal: 10,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: themeMode.white,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                }}
              >
                {paidByText}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 18,
                color: themeMode.white,
              }}
            >
              and split
            </Text>
            <TouchableOpacity
              onPress={handleSplitProportion}
              style={{
                backgroundColor: themeMode.blueLight,
                borderColor: themeMode.blueLighter,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 5,
                //   width: 100,
                paddingHorizontal: 10,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: themeMode.white,
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                }}
              >
                {equalSplit ? "Equally" : "UnEqually"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* paid by end  */}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateExpense;
