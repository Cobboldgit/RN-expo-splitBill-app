import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  askForCameraPermission,
  pickImage,
} from "../store/actions/appActions";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

const SelectImage = ({ handleSelectImage, handleSetPickedImage }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const [camPermission, setCamPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await askForCameraPermission();
      setCamPermission(status);
    })();
  }, []);

  const handlAddProfilePicture = async (type) => {
    const result = await pickImage(type);
    if (!result?.cancelled) {
      handleSetPickedImage(result.uri)
      handleSelectImage()
    }
    if (!camPermission) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }
    if (camPermission === "granted") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>You need to allow this permission</Text>
        </View>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleSelectImage}>
      <View
        style={{
          flex: 1,
          backgroundColor: darkMode ? `rgba(0,0,0,0.8)` : `rgba(0,0,0,0.5)`,
        }}
      >
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            backgroundColor: themeMode.blueBlack,
            flex: 1,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              // justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={handleSelectImage}>
              <Ionicons name="close" size={30} color={themeMode.white} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_400Regular",
                color: themeMode.white,
                marginLeft: 30,
              }}
            >
              Select file
            </Text>
          </View>
          <View
            style={{
              flex: 8,
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => handlAddProfilePicture("camera")}
              style={{
                height: 200,
                width: 150,
                borderRadius: 10,
                backgroundColor: themeMode.pinkLightest,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="camera" size={60} color={themeMode.pinkLight} />
              <Text
                style={{
                  fontSize: 20,
                  color: themeMode.pinkLight,
                }}
              >
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlAddProfilePicture("gallery")}
              style={{
                height: 200,
                width: 150,
                borderRadius: 10,
                backgroundColor: themeMode.pinkLightest,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="file-tray"
                size={60}
                color={themeMode.pinkLight}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: themeMode.pinkLight,
                }}
              >
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectImage;
