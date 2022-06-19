import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const Chat = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const customInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          height: 100,
          justifyContent: "center",
          backgroundColor: themeMode.blueLight,
          borderTopColor: themeMode.blueLighter,
          paddingHorizontal: 16,
        }}
      />
    );
  };

  return (
    <GiftedChat
    
      renderSend={(props) => {
        const { text, onSend } = props;
        return (
          <TouchableOpacity
            onPress={() => {
              if (text) {
                alert(text);
              }
            }}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="send" color={themeMode.blueLighter} size={30} />
          </TouchableOpacity>
        );
      }}
      placeholder="Add a comment..."
      textInputProps={{
        backgroundColor: themeMode.blueBlack,
        borderColor: themeMode.blueLighter,
        borderRadius: 50,
        paddingHorizontal: 16,
        color: themeMode.white,
        paddingVertical: 10,
        margin: 0,
      }}
      renderInputToolbar={(props) => customInputToolbar(props)}
    />
  );
};

export default Chat;
