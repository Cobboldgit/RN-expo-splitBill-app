import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from "react-native";
import React from "react";
import AppModal from "../components/AppModal";
import {
  createNewGroup,
  randId,
  setShowModal,
  uploadImage,
} from "../store/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import TouchWithFeed from "../components/TouchWithFeed";
import { useState } from "react";
import { theme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import SelectImage from "../components/SelectImage";
import { Fragment } from "react";
import { auth, db } from "../firebase/firebase";
import Loader from "../components/Loader";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [pickedImage, setPickedImage] = useState(null);
  const [showSelectImage, setShowSelectImage] = useState(false);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const [loading, setLoading] = useState(false)

  const handleCloseButtonPress = () => {
    dispatch(setShowModal(false));
  };

  const handleSelectImage = () => {
    setShowSelectImage(!showSelectImage);
  };

  const handleSetPickedImage = (url) => {
    setPickedImage(url);
  };

  const handleSave = async () => {
    setLoading(true)
    const user = auth.currentUser;
    let photoURL;

    if (pickedImage) {
      const { url } = await uploadImage(
        pickedImage,
        `images/${user.uid}`,
        `${name}`
      );
      photoURL = url;
    }

    const groupData = {
      groupName: name.trim(),
      
      
    };

    if (photoURL) {
      groupData.photoURL = photoURL;
    }

    new Promise.all([
      dispatch(createNewGroup(groupData)),
      dispatch(setShowModal(false)),
    ]);

    setLoading(false)
  };

  return (
    <Fragment>
      {/* <Loader state={loading}/> */}
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
      <AppModal>
        <View
          style={{
            flex: 1,
            backgroundColor: themeMode.blueBlack,
          }}
        >
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
                onPress={handleCloseButtonPress}
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
                Create a group
              </Text>
            </View>
            <TouchWithFeed
              onPress={handleSave}
              size={{
                width: undefined,
              }}
              icon={
                <Text
                  style={{
                    color: themeMode.pinkLight,
                    fontSize: 16,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  Save
                </Text>
              }
            />
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
      </AppModal>
    </Fragment>
  );
};

export default CreateGroup;
