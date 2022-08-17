import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { icons } from "../constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { setRateInfo } from "../store/actions/appActions";

const RateSystem = ({ closeModal }) => {
  const [currentMood, setMood] = useState("");
  const [inputValue, setText] = useState("");
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const dispatch = useDispatch();

  const rateData = [
    {
      icon: icons.great,
      title: "Great",
    },
    {
      icon: icons.good,
      title: "Good",
    },
    {
      icon: icons.okay,
      title: "Okay",
    },
    {
      icon: icons.bad,
      title: "Bad",
    },
    {
      icon: icons.bad,
      title: "",
    },
  ];


  const handleRatePressed = (mood) => {
    setMood(mood.toLowerCase());
  };

  const handleCloseModal = () => {
    if (currentMood) {
      let data = {
        rate: currentMood,
      };

      if (inputValue) {
        data.reason = inputValue;
      }

      dispatch(setRateInfo(data));
      setText("");
    }
    closeModal();
  };

  const handleOnDone = () => {
    alert("Done");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
          paddingHorizontal: 16,
          paddingVertical: 16,
          zIndex: 2,
        }}
      >
        <TouchableOpacity onPress={() => handleCloseModal()}>
          <Ionicons name="close" color={themeMode.white} size={40} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Inter_900Black",
          }}
        >
          What do you think of the app
        </Text>
      </View>
      <View
        style={{
          height: 150,
          width: "100%",
          position: "absolute",
          bottom: Dimensions.get("screen").height / 2 - 80,
        }}
      >
        {rateData.map((item) => {
          return currentMood === item.title.toLowerCase() ? (
            <Image
              key={item.title}
              resizeMode="contain"
              source={item.icon}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
            />
          ) : null;
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 30,
          flexWrap: "wrap",
        }}
      >
        {rateData.reverse().map((item) => {
          return item.title != "" ? (
            <TouchableOpacity
              onPress={() => handleRatePressed(item.title)}
              key={item.title}
              style={{
                backgroundColor:
                  currentMood != item.title.toLowerCase()
                    ? themeMode.pinkLighter
                    : themeMode.blueBlack,
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderRadius: 10,
                width: "40%",
                marginBottom: 10,
                // transform: [{scale: currentMood === item.title.toLowerCase() ? 1.2 : 1}]
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_900Black",
                  fontSize: 24,
                  color: "white",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ) : null;
        })}
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          width: "100%",
          bottom: 30,
          position: "absolute",
        }}
      >
        <TextInput
          returnKeyType="done"
          autoCapitalize="sentences"
          autoCorrect={true}
          onSubmitEditing={() => {
            handleOnDone();
          }}
          value={inputValue}
          onChangeText={setText}
          placeholder="Tell us why..."
          style={{
            borderBottomColor: themeMode.blueLight,
            width: "100%",
            borderBottomWidth: 3,
            fontSize: 18,
            fontFamily: "Inter_400Regular",
            paddingVertical: 10,
            color: themeMode.black,
          }}
        />
      </View>
    </View>
  );
};

export default RateSystem;
