import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import TouchWithFeed from "../components/TouchWithFeed";
import PartticipantCard from "../components/PartticipantCard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { setSelectedPaidBy } from "../store/actions/appActions";

const PaidBy = () => {
  // hooks
  const { members } = useRoute().params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // selectors
  const { darkMode, selectedPaidBy } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleSelectedContact = (contact) => {
    dispatch(setSelectedPaidBy(contact));
    navigation.goBack();
  };

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
            Who paid?
          </Text>
        </View>
      </View>
      {/* header  end*/}

      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        {members.map((contact, index) => {
          return (
            <ListMembers
              contact={contact}
              key={index}
              themeMode={themeMode}
              handleSelected={handleSelectedContact}
              index={index}
              selected={selectedPaidBy}
            />
          );
        })}
      </View>
    </View>
  );
};

const ListMembers = ({ contact, themeMode, handleSelected, selected }) => {
  const [select, setSelect] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        handleSelected(contact);
        setSelect(!select);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <PartticipantCard item={contact} />
      </View>
      {select ? (
        <Ionicons name="md-checkmark" size={30} color={themeMode.white} />
      ) : null}
    </TouchableOpacity>
  );
};

export default PaidBy;
