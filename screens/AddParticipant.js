import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect, Fragment } from "react";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import ListContact from "../components/ListContact";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {useContacts} from "../hooks";
import CreateContact from "./CreateContact";
import TouchWithFeed from "../components/TouchWithFeed";
import ListSelectedContacts from "../components/ListSelectedContacts";
import { checkIfMemberExist } from "../store/actions/appActions";

const AddParticipant = ({ modalVisible, handleModalVisible }) => {
  const contacts = useContacts();
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const [showCreateContactModal, setShowCreateContactModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredContacts(contacts);
  }, []);

  const searchFilterFunction = (term) => {
    if (term) {
      const newContacts = contacts.filter((contact) => {
        const contactData = contact.contactName
          ? contact.contactName.toUpperCase()
          : "".toUpperCase();

        const termData = term.toUpperCase();

        return contactData.indexOf(termData) > -1;
      });
      setFilteredContacts(newContacts);
      setSearch(term);
    } else {
      setFilteredContacts(contacts);
      setSearch(term);
    }
  };

  const handleCreateContactModal = () => {
    setShowCreateContactModal(!showCreateContactModal);
  };

  const handleSetSelectedContacts = (contact) => {
    const a = dispatch(checkIfMemberExist(contact));
    if (selectedContacts.includes(contact) || a) {
      return alert("Member already exist");
    }

    setSelectedContacts([...selectedContacts, contact]);
  };

  const handleRemoveSelectedContact = (contact) => {
    const contacts = selectedContacts.filter((c) => c.id !== contact.id);
    setSelectedContacts(contacts);
  };

  const handleSubmit = () => {
    handleModalVisible(selectedContacts);
  };

  // top component
  const listHeaderComponent = () => {
    return (
      <View>
        {selectedContacts.length > 0 ? (
          <View
            style={{
              paddingLeft: 10,
              paddingVertical: 20,
            }}
          >
            <FlatList
              style={{
                height: 80,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={selectedContacts}
              keyExtractor={(item, index) => `${item.contactName}-${index}`}
              renderItem={({ item }) => (
                <ListSelectedContacts
                  contact={item}
                  remove={handleRemoveSelectedContact}
                />
              )}
            />
          </View>
        ) : (
          <View
            style={{
              paddingVertical: 10,
            }}
          ></View>
        )}

        <View
          style={{
            marginHorizontal: 16,
          }}
        >
          {/* create contact  */}
          <TouchableOpacity
            onPress={handleCreateContactModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 2,
              }}
            >
              <View
                style={{
                  backgroundColor: themeMode.pinkLight,
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="person-add" size={24} color={themeMode.white} />
              </View>
            </View>
            <View
              style={{
                flex: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  color: themeMode.white,
                }}
              >
                Add a new contact to group
              </Text>
            </View>
          </TouchableOpacity>
          {/* create contact end  */}

          {/* friends in group */}

          <View>
            <Text
              style={{
                fontFamily: "Inter_900Black",
                fontSize: 16,
                color: themeMode.white,
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              Friends in group
            </Text>
          </View>

          {/* friends in group end */}

          {/* list from contact  */}
          <Text
            style={{
              fontFamily: "Inter_900Black",
              fontSize: 16,
              color: themeMode.white,
              marginVertical: 20,
            }}
          >
            From your contacts
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Fragment>
      {/* create contact  */}
      <CreateContact
        selectedContact={handleSetSelectedContacts}
        modalVisible={showCreateContactModal}
        handleModalVisible={handleCreateContactModal}
      />
      {/* create contact end*/}

      {/* main modal  */}
      <Modal
        visible={modalVisible}
        onRequestClose={handleModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: themeMode.blueBlack,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              position: "absolute",
              backgroundColor: themeMode.pinkLight,
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              bottom: 20,
              right: 20,
              zIndex: 999,
            }}
          >
            <MaterialIcons name="done" size={30} color={themeMode.white} />
          </TouchableOpacity>

          {/* input  */}
          <View
            style={{
              flexDirection: "row",
              height: 70,
              alignItems: "center",
              paddingHorizontal: 16,
              borderBottomColor: themeMode.white,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <View
              style={{
                flex: 1.5,
              }}
            >
              <TouchWithFeed
                onPress={handleModalVisible}
                size={{
                  width: undefined,
                }}
                icon={
                  <AntDesign name="down" size={24} color={themeMode.white} />
                }
              />
            </View>
            <TextInput
              name={search}
              onChangeText={searchFilterFunction}
              placeholderTextColor={themeMode.blueLighter}
              placeholder="Enter contact name"
              style={{
                flex: 8.5,
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: themeMode.white,
              }}
            />
          </View>

          {/* list  */}
          <View
            style={{
              flex: 9,
            }}
          >
            <ListContact
              ListHeaderComponent={listHeaderComponent}
              selectedContact={handleSetSelectedContacts}
              contacts={filteredContacts}
            />
            {/* list from contact end */}
          </View>
          {/* list end  */}
        </View>
      </Modal>
      {/* main modal end  */}
    </Fragment>
  );
};

export default AddParticipant;
