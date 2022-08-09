import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  MessageText,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { useCallback, useState, useEffect } from "react";
import { randId, sendMessage } from "../store/actions/appActions";
import { useRoute } from "@react-navigation/native";
import { auth, db } from "../firebase/firebase";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const { darkMode, userData, commentsData } = useSelector(
    (state) => state.appReducer
  );
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const currentUser = auth?.currentUser.photoURL
    ? {
        name: auth?.currentUser.displayName,
        _id: auth?.currentUser.uid,
        avatar: auth?.currentUser.photoURL,
      }
    : {
        name: auth?.currentUser.displayName,
        _id: auth?.currentUser.uid,
      };

  const dispatch = useDispatch();

  const { expenseData } = useRoute().params;

  let room = commentsData;


  useEffect(() => {
    setMessages([
      {
        _id: Date.now(),
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    (async () => {
      if (!room) {
        try {
          const dbRef = db.collection("users").doc(auth.currentUser.uid);
          const groupRef = dbRef.collection("groups").doc(expenseData.groupId);
          const expenseRef = groupRef
            .collection("comments")
            .doc(expenseData.id);

          expenseRef
            .set({
              messages: [],
              lastMessage: {},
            })
            .then(() => {
              console.log("room created");
            })
            .catch((error) => {
              console.log(error.message);
            });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    appendMessages(room?.messages);
  }, []);

  const appendMessages = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const onSend = async (messages = []) => {
    appendMessages(messages);
    const { _id, createdAt, text, user } = messages[messages.length - 1];
    dispatch(
      sendMessage({
        _id,
        createdAt: new Date(),
        text,
        user,
        groupId: expenseData.groupId,
        roomId: expenseData.id,
      })
    );
  };

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
      user={currentUser}
      messages={messages}
      onSend={onSend}
      messagesContainerStyle={{
        paddingBottom: 55,
      }}
      renderSend={(props) => {
        const { text, onSend, messageIdGenerator } = props;
        return (
          <TouchableOpacity
            onPress={() => {
              if (text) {
                onSend(
                  {
                    text: text,
                    _id: messageIdGenerator(),
                  },
                  true
                );
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
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              left: {
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: themeMode.white,
              },
              right: {
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: themeMode.blueLight,
              },
              right: {
                backgroundColor: themeMode.pinkLighter,
              },
            }}
          />
        );
      }}
      timeTextStyle={{
        right: {
          color: themeMode.blueBlack,
        },
      }}
      renderFooter={() => {
        return (
          <View
            style={{
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: themeMode.blueLight,
              }}
            >
              You joined the group chat.
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: themeMode.blueLight,
              }}
            >
              Only group members can see this message.
            </Text>
          </View>
        );
      }}
      renderInputToolbar={(props) => customInputToolbar(props)}
    />
  );
};

export default Chat;
