import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../constants";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";

const ThemeList = ({ data }) => {
  const [activeItem, setActive] = useState("dark");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const dispatch = useDispatch();

  const handlePressed = (color) => {
    dispatch({ type: "DARK_MODE", payload: color === "dark" ? true : false });
  };

  const handleModalVisible = (image, color) => {
    setModalVisible(!modalVisible);
    image && setSelectedImage({ image, color });
  };

  return (
    <Fragment>
      <Modal
        onRequestClose={() => handleModalVisible()}
        transparent={true}
        animationType="fade"
        visible={modalVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleModalVisible}
            style={{
              position: "absolute",
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-close" size={40} color="white" />
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              source={selectedImage?.image}
              style={{
                height: "70%",
                width: "70%",
              }}
            />
            <View
              style={{
                position: "absolute",
                height: 100,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
              }}
            >
              <Text
                style={{
                  color: themeMode.blueLighter,
                  fontFamily: "Inter_400Regular",
                  fontSize: 18,
                }}
              >
                {selectedImage?.color} color
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={() => {
              setActive(item.color);
              handlePressed(item.color);
            }}
            onLongPress={() => {
              handleModalVisible(item.image, item.color);
            }}
            style={{
              height: Dimensions.get("screen").height / 2.5 + 10,
              width: Dimensions.get("screen").width / 2 - 25,
              borderRadius: 20,
              backgroundColor: "pink",
              borderWidth: activeItem === item.color ? 10 : 5,
              borderColor: themeMode.pinkLight,
              overflow: "hidden",
              // margin: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setActive(item.color);
                handlePressed(item.color);
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                borderColor: themeMode.pinkLight,
                borderWidth: 3,
                position: "absolute",
                zIndex: 1,
                right: 0,
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {activeItem === item.color ? (
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    backgroundColor: themeMode.pinkLight,
                  }}
                ></View>
              ) : null}
            </TouchableOpacity>
            <Image
              source={item.image}
              resizeMode={"cover"}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </TouchableOpacity>
        );
      })}
    </Fragment>
  );
};

export default ThemeList;
