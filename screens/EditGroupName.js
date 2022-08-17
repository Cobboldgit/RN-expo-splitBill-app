import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { setDataFromEditGroupName } from "../store/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import TouchWithFeed from "../components/TouchWithFeed";
import { useState } from "react";
import { theme } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SelectImage from "../components/SelectImage";
import { Fragment } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditGroupName = () => {
  const { photoURL, groupName } = useRoute().params;
  const [name, setName] = useState(groupName);
  const [pickedImage, setPickedImage] = useState(photoURL);
  const [showSelectImage, setShowSelectImage] = useState(false);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const handleSelectImage = () => {
    setShowSelectImage(!showSelectImage);
  };

  const handleSetPickedImage = (url) => {
    setPickedImage(url);
  };

  const handleSubmit = async () => {
    const groupData = {
      groupName: name,
    };

    if (pickedImage != photoURL) {
      groupData.photoURL = pickedImage;
    }

    dispatch(setDataFromEditGroupName(groupData));
    handleGoBack();
    // new Promise.all([
    //   dispatch(createNewGroup(groupData)),
    //   dispatch(setShowModal(false)),
    // ]);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Fragment>
      {/* select image start */}
      <Modal
        onRequestClose={handleSelectImage}
        visible={showSelectImage}
        transparent={true}
        animationType="slide"
      >
        <SelectImage
          handleSelectImage={handleSelectImage}
          handleSetPickedImage={handleSetPickedImage}
        />
      </Modal>
      {/* select image end  */}

      {/* main start */}
      <View
        style={{
          flex: 1,
          backgroundColor: themeMode.blueBlack,
          paddingTop: StatusBar.currentHeight,
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

        {/* header  */}
        <View
          style={{
            alignItems: "center",
            borderBottomColor: themeMode.blueLighter,
            borderBottomWidth: StyleSheet.hairlineWidth,
            flexDirection: "row",
            height: 70,
            paddingHorizontal: 16,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchWithFeed
              onPress={handleGoBack}
              icon={
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color={themeMode.blueLighter}
                />
              }
              size={{ width: 50 }}
            />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                color: themeMode.white,
                fontSize: 20,
                marginLeft: 20,
              }}
            >
              Edit group
            </Text>
          </View>
        </View>

        {/* body  */}
        <View
          style={{
            flex: 9,
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          {/* Input and camera */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* camera  */}
            <TouchableOpacity
              onPress={handleSelectImage}
              style={{
                borderWidth: 1,
                borderColor: themeMode.blueLighter,
                backgroundColor: themeMode.blueLight,
                height: 60,
                width: 60,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {!pickedImage ? (
                <Ionicons
                  name="camera"
                  size={24}
                  color={themeMode.blueLighter}
                />
              ) : (
                <Image
                  source={{ uri: pickedImage }}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              )}
            </TouchableOpacity>

            {/* input  */}
            <View
              style={{
                flex: 1,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_900Black",
                  fontSize: 14,
                  color: themeMode.white,
                }}
              >
                Group name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{
                  borderBottomColor: themeMode.pinkLight,
                  borderBottomWidth: 2,
                  height: 42,
                  color: themeMode.white,
                  fontSize: 20,
                  fontFamily: "Inter_400Regular",
                }}
              />
            </View>
          </View>
          {/* input end  */}

          <Text
            style={{
              fontFamily: "Inter_900Black",
              fontSize: 20,
              color: themeMode.white,
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            Type
          </Text>

          <Text
            style={{
              fontFamily: "Inter_900Black",
              fontSize: 20,
              color: themeMode.white,
              marginBottom: 20,
            }}
          >
            Group members
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: themeMode.white,
              marginBottom: 20,
            }}
          >
            You will be able to add members after you save the group
          </Text>
        </View>
      </View>
      {/* main end */}
    </Fragment>
  );
};

export default EditGroupName;
