import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import Input from "../components/Input";
import { useState } from "react";
import Button3D from "../components/Button3D";
import {randId} from "../store/actions/appActions"

const CreateContact = ({
  modalVisible,
  handleModalVisible,
  selectedContact,
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleCreateContact = () => {
    if (name && phoneNumber) {
      selectedContact({ contactName: name.trim(), phoneNumber, id: randId(5) });
      handleModalVisible();
    }
  };

  return (
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
        {/* header  */}
        <View
          style={{
            height: 70,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: themeMode.blueLighter,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingHorizontal: 16,
          }}
        >
          <TouchWithFeed
            onPress={handleModalVisible}
            size={{
              width: 50,
            }}
            icon={<AntDesign name="down" size={24} color={themeMode.white} />}
          />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              color: themeMode.white,
              fontSize: 20,
            }}
          >
            Create contact
          </Text>
        </View>
        {/* header end  */}

        <ScrollView>
          {/* input  */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 30,
            }}
          >
            <Input
              value={name}
              onChangeText={setName}
              placeholder={"Name"}
              bottom={20}
            />
            <Input
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={"Phone number"}
              bottom={20}
            />
            <TouchableOpacity onPress={handleCreateContact}>
              <Button3D text={"Create"} />
            </TouchableOpacity>
          </View>
          {/* input end */}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CreateContact;
