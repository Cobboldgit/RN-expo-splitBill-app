import { View, Text, TouchableOpacity, FlatList, } from "react-native";
import React from "react";
import useContacts from "../hooks/useHooks";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../constants/theme";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const ListContact = ({ contacts, selectedContact, ListHeaderComponent }) => {
  const unfilteredContacts = useContacts();
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  if (contacts.length > 0) {
    return (
      <FlatList
        ListHeaderComponent={ListHeaderComponent()}
        data={contacts}
        keyExtractor={(item) => `${item.contactName}${item.phoneNumber}`}
        renderItem={({ item }) => (
          <Contact
            contact={item}
            themeMode={themeMode}
            selectedContact={selectedContact}
          />
        )}
      />
      // contacts.map((contact, index) => {
      //   return <Contact key={index} contact={contact} themeMode={themeMode} />;
      // });
    );
  } else if (unfilteredContacts.length > 0) {
    return (
      <FlatList
        data={unfilteredContacts}
        ListHeaderComponent={ListHeaderComponent()}
        keyExtractor={(item) => `${item.contactName}${item.phoneNumber}`}
        renderItem={({ item }) => (
          <Contact
            contact={item}
            themeMode={themeMode}
            selectedContact={selectedContact}
          />
        )}
      />
    );
  } else {
    return (
      <Text
        style={{
          color: "white",
        }}
      >
        Loading
      </Text>
    );
  }
};

const Contact = ({ contact, themeMode, selectedContact }) => {
  return (
    <TouchableOpacity
      onPress={() => selectedContact(contact)}
      style={{
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: 16
      }}
    >
      <View
        style={{
          flex: 2,
        }}
      >
        <MaterialIcons name="phone" size={24} color={themeMode.white} />
      </View>
      <View
        style={{
          flex: 8,
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
          }}
        >
          {contact.contactName}
        </Text>
        <Text
          style={{
            color: themeMode.blueLighter,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
          }}
        >
          {contact.phoneNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListContact;
