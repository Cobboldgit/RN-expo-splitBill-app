import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button3D from "../components/Button3D";
import SelectImage from "../components/SelectImage";
import { auth, db } from "../firebase/firebase";
import { uploadImage } from "../store/actions/appActions";

const ProfilePicture = ({}) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditProfilePicModal, setEditProfilePicModal] = useState(false);
  const [editType, setEditType] = useState("");
  const navigation = useNavigation();

  const handleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const handleEditCredModal = (type) => {
    setEditType(type);
    setShowEditModal(!showEditModal);
  };

  const handleEditProfilePic = () => {
    setEditProfilePicModal(!showEditProfilePicModal);
  };

  const handleSetPickedImage = async (uri) => {
    console.log(uri);
    const user = auth.currentUser;

    if (uri) {
      const { url } = await uploadImage(
        uri,
        `images/${user.uid}`,
        `${user.uid}_profile_pic`
      );
      user
        .updateProfile({
          photoURL: url,
        })
        .then(() => {
          console.log("Profile Picture Updated");
          db.collection("users").doc(user.uid).update({ photoUrl: url });
        })
        .catch((error) => {
          console.log(error);
          handleSetPickedImage(uri);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
      {/* modals start  */}
      <PreviewImage
        visible={showProfileModal}
        handleOpen={handleProfileModal}
        image={userData?.photoUrl}
        handleOpenEditModal={handleEditProfilePic}
      />

      <EditProfilePic
        visible={showEditProfilePicModal}
        handleOpen={handleEditProfilePic}
        handleSetPickedImage={handleSetPickedImage}
      />

      <EditCredModal
        visible={showEditModal}
        type={editType}
        handleOpen={handleEditCredModal}
      />
      {/* modals end  */}

      {/* header  */}
      <View
        style={{
          backgroundColor: themeMode.pinkLight,
          height: 100,
          paddingTop: StatusBar.currentHeight + 20,
          paddingHorizontal: 16,
          flexDirection: "row",
          zIndex: 5,
        }}
      >
        <TouchWithFeed
          onPress={() => navigation.goBack()}
          size={{ width: 50 }}
          icon={
            <Ionicons name="arrow-back" size={24} color={themeMode.white} />
          }
        />
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 20,
          }}
        >
          Profile
        </Text>
      </View>
      {/* header end  */}

      <View
        style={{
          flex: 1,
        }}
      >
        {/* profile pic  */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            onPress={
              userData?.photoUrl != ""
                ? handleProfileModal
                : handleEditProfilePic
            }
            style={({ pressed }) => ({
              height: 150,
              width: 150,
              borderRadius: 100,
              backgroundColor: themeMode.pinkLighter,
              transform: [{ scale: pressed ? 1.1 : 1 }],
            })}
          >
            <TouchableOpacity
              onPress={handleEditProfilePic}
              activeOpacity={0.6}
              style={{
                position: "absolute",
                zIndex: 4,
                bottom: 0,
                right: 0,
              }}
            >
              <LinearGradient
                colors={[themeMode.pinkLight, themeMode.pinkLighter]}
                style={{
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="camera" size={24} color={themeMode.white} />
              </LinearGradient>
            </TouchableOpacity>
            {userData?.photoUrl != "" && (
              <Image
                source={{
                  uri: userData?.photoUrl,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 100,
                }}
              />
            )}
          </Pressable>
        </View>
        {/* profile pic end  */}

        {/* credentials  */}
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          {/* name  */}
          <Pressable
            onPress={() => handleEditCredModal("name", userData?.displayName)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: themeMode.blueLight,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingVertical: 20,
              backgroundColor: pressed ? themeMode.blueLight : "transparent",
            })}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Ionicons name="person" size={24} color={themeMode.blueLighter} />
            </View>
            <View
              style={{
                flex: 7,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.blueLighter,
                  fontSize: 16,
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.white,
                  fontSize: 18,
                }}
              >
                {userData?.displayName}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Entypo name="edit" color={themeMode.pinkLight} size={20} />
            </View>
          </Pressable>
          {/* name end  */}
          {/* email  */}
          <Pressable
            onPress={() => handleEditCredModal("email", userData?.email)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: themeMode.blueLight,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingVertical: 20,
              backgroundColor: pressed ? themeMode.blueLight : "transparent",
            })}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Ionicons name="mail" size={24} color={themeMode.blueLighter} />
            </View>
            <View
              style={{
                flex: 7,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.blueLighter,
                  fontSize: 16,
                }}
              >
                Email
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.white,
                  fontSize: 18,
                }}
              >
                {userData?.email}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Entypo name="edit" color={themeMode.pinkLight} size={20} />
            </View>
          </Pressable>
          {/* email end  */}
          {/* Phone  */}
          <Pressable
            onPress={() => handleEditCredModal("phone", userData?.phoneNumber)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: themeMode.blueLight,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingVertical: 20,
              backgroundColor: pressed ? themeMode.blueLight : "transparent",
            })}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Entypo name="phone" size={24} color={themeMode.blueLighter} />
            </View>
            <View
              style={{
                flex: 7,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.blueLighter,
                  fontSize: 16,
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.white,
                  fontSize: 18,
                }}
              >
                {userData?.phoneNumber}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Entypo name="edit" color={themeMode.pinkLight} size={20} />
            </View>
          </Pressable>
          {/* phone end  */}
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

const EditProfilePic = ({ visible, handleOpen, handleSetPickedImage }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleOpen}
      transparent={true}
      statusBarTranslucent
    >
      <SelectImage
        handleSelectImage={handleOpen}
        handleSetPickedImage={handleSetPickedImage}
      />
    </Modal>
  );
};

const EditCredModal = ({ visible, handleOpen, type }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const [name, setName] = useState(userData?.displayName);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phoneNumber);

  const user = auth.currentUser;

  const handleSaveName = () => {
    if (name !== userData?.displayName) {
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          db.collection("users").doc(user.uid).update({
            displayName: name,
          });
        });
    }
    handleOpen();
  };

  const handleSaveEmail = () => {
    if (email !== userData?.email) {
      user
        .updateProfile({
          email: email,
        })
        .then(() => {
          db.collection("users").doc(user.uid).update({
            email: email,
          });
        });
    }
    handleOpen();
  };

  const handleSavePhone = () => {
    if (phone !== userData?.phoneNumber) {
      user
        .updateProfile({
          phoneNumber: phone,
        })
        .then(() => {
          db.collection("users").doc(user.uid).update({
            phoneNumber: phone,
          });
        });
    }
    handleOpen();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => handleOpen()}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={[`rgba(0,0,0,0.2)`, `rgba(0,0,0,0.5)`]}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {type === "name" ? (
            <LinearGradient
              colors={[themeMode.pinkLight, themeMode.pinkLighter]}
              style={{
                height: Dimensions.get("screen").height / 3 - 50,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity onPress={() => handleOpen()}>
                  <Ionicons name="close" size={30} color={themeMode.white} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 7,
                  paddingHorizontal: 16,
                  justifyContent: "space-around",
                }}
              >
                <TextInput
                  value={name}
                  onChangeText={setName}
                  autoFocus={true}
                  placeholder="Enter new name"
                  style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: themeMode.pinkLighter,
                    paddingVertical: 20,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    fontFamily: "Inter_400Regular",
                  }}
                />
                <Pressable
                  style={({ pressed }) => ({
                    transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                  })}
                  onPress={handleSaveName}
                >
                  <Button3D text={"Save"} />
                </Pressable>
              </View>
            </LinearGradient>
          ) : type === "email" ? (
            <LinearGradient
              colors={[themeMode.pinkLight, themeMode.pinkLighter]}
              style={{
                height: Dimensions.get("screen").height / 3 - 50,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity onPress={() => handleOpen()}>
                  <Ionicons name="close" size={30} color={themeMode.white} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 7,
                  paddingHorizontal: 16,
                  justifyContent: "space-around",
                }}
              >
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoFocus={true}
                  placeholder="Enter new email"
                  style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: themeMode.pinkLighter,
                    paddingVertical: 20,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    fontFamily: "Inter_400Regular",
                  }}
                />
                <Pressable
                  style={({ pressed }) => ({
                    transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                  })}
                  onPress={handleSaveEmail}
                >
                  <Button3D text={"Save"} />
                </Pressable>
              </View>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={[themeMode.pinkLight, themeMode.pinkLighter]}
              style={{
                height: Dimensions.get("screen").height / 3 - 50,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <TouchableOpacity onPress={() => handleOpen()}>
                  <Ionicons name="close" size={30} color={themeMode.white} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 7,
                  paddingHorizontal: 16,
                  justifyContent: "space-around",
                }}
              >
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  autoFocus={true}
                  placeholder="Enter new phone number"
                  style={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: themeMode.pinkLighter,
                    paddingVertical: 20,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    fontFamily: "Inter_400Regular",
                  }}
                />
                <Pressable
                  style={({ pressed }) => ({
                    transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                  })}
                  onPress={handleSavePhone}
                >
                  <Button3D text={"Save"} />
                </Pressable>
              </View>
            </LinearGradient>
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
const PreviewImage = ({
  image,
  visible,
  handleOpen,
  handleOpenEditModal,
}) => {
  const handleEditProfilePic = () => {
    handleOpenEditModal()
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => handleOpen()}
      statusBarTranslucent
    >
      <LinearGradient
        colors={[`rgba(0,0,0,0.9)`, `rgba(0,0,0,0.9)`]}
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              height: 60,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={handleOpen}>
                <Ionicons name="close" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_400Regular",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Profile Picture
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={handleEditProfilePic}>
                <Entypo
                  style={{ alignSelf: "flex-end" }}
                  name="edit"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "black",
            height: 300,
            width: "100%",
            flex: 1,
          }}
        >
          <Image
            resizeMode="cover"
            source={{
              uri: image,
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        ></View>
      </LinearGradient>
    </Modal>
  );
};

export default ProfilePicture;
