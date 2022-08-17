import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { icons, images, theme } from "../constants";
import { useState } from "react";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "confirm"];
const initialPin = { a: "", b: "", c: "", d: "" };

const Passcode = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const [pin, setPin] = useState({ ...initialPin });
  const [hidden, setHidden] = useState(true);

  const onEnterPin = (btn) => {
    if (typeof btn === "number") {
      for (let i = 0; i < Object.keys(pin).length; i++) {
        let key = Object.keys(pin)[i];
        if (!pin[key]) {
          const newPin = { ...pin };
          newPin[key] = btn.toString();
          setPin(newPin);
          console.log(newPin);
          break;
        }
      }
    } else {
      if (btn == "clear") {
        for (let i = 0; i < Object.keys(pin).length; i++) {
          let key = Object.keys(pin).reverse()[i];
          if (pin[key]) {
            const newPin = { ...pin };
            newPin[key] = "";
            setPin(newPin);
            console.log(newPin);
            break;
          }
        }
      }
      if (btn == "confirm") {
        let pinValue = Object.keys(pin)
          .map((pinKey) => pin[pinKey])
          .filter((x) => x)
          .join("");
        alert(
          pinValue.length !== Object.keys(pin).length
            ? "Please enter " + Object.keys(pin).length + " digit PIN"
            : "pin you entered is - " + pinValue
        );
        if (pinValue.length == Object.keys(pin).length) {
          setPin({...initialPin});
        }
        console.log(pinValue);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      <View
        style={{
          height: 100,
          backgroundColor: themeMode.pinkLight,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginBottom: 30,
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{ width: 50, height: 20 }}
            icon={
              <Ionicons name="arrow-back" color={themeMode.white} size={24} />
            }
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 5,
            borderColor: themeMode.blueBlack,
            height: 60,
            width: 60,
            backgroundColor: themeMode.pinkLight,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>

      <View
        style={{
          marginLeft: 65,
          marginTop: 40,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontSize: 24,
            fontFamily: "Inter_900Black",
          }}
        >
          Passcode
        </Text>
        <Text
          style={{
            color: themeMode.blueLighter,
            fontFamily: "Inter_400Regular",
            fontSize: 16,
          }}
        >
          Set 4-digit passcode to secure your account
        </Text>
      </View>

      {/* passcode input */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Object.keys(pin).map((pinKey) => {
              return (
                <View
                  key={pinKey}
                  style={{
                    width: 60,
                    height: 40,
                    marginHorizontal: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pin[pinKey] ? (
                    hidden ? (
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 10,
                          backgroundColor: themeMode.white,
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'Inter_900Black',
                          color: themeMode.white
                        }}
                      >
                        {pin[pinKey]}
                      </Text>
                    )
                  ) : (
                    <View
                      style={{
                        height: 2,
                        width: "100%",
                        backgroundColor: themeMode.pinkLighter,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            <Text style={{
              fontFamily: 'Inter_400Regular',
              color: themeMode.white
            }}>{hidden ? "SHOW" : "HIDE"}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {data.map((btn) => {
            return (
              <View
                key={btn}
                style={{
                  width: 100 / 3 + "%",
                  backgroundColor: themeMode.blueLight,
                }}
              >
                <TouchableWithoutFeedback onPress={() => onEnterPin(btn)}>
                  <View
                    style={{
                      alignItems: "center",
                      paddingVertical: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: "Inter_400Regular",
                        color: themeMode.white
                      }}
                    >
                      {btn}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </View>
      {/* passcode input end */}
    </View>
  );
};

export default Passcode;
