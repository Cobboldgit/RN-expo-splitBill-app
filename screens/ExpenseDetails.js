import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  ScrollView,
  Pressable,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TouchWithFeed from "../components/TouchWithFeed";
import OweDraw from "../components/OweDraw";
import { useNavigation, useRoute } from "@react-navigation/native";

import Chat from "../components/Chat";
import Button3d from "../components/Button3D";
import { useEffect } from "react";
import {
  editExpense,
  getComments,
  uploadImage,
} from "../store/actions/appActions";
import SelectImage from "../components/SelectImage";

const ExpenseDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data, index } = useRoute().params;
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const [showSelectImage, setShowSelectImage] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = dispatch(getComments(data.groupId, data.id));
    return () => unsubscribe;
  }, []);

  const amountYouPaid = parseFloat(data?.amount).toFixed(2);

  const paidBy =
    data?.paidBy.phoneNumber === userData?.phoneNumber
      ? "You"
      : data?.paidBy.contactName;

  const rawDate = data?.createdAt;
  const convertedDate = new Date(rawDate).toLocaleString();
  const dateArray = convertedDate.split(" ");
  const month = dateArray[1];
  const day = dateArray[2];
  const year = dateArray[4];

  const handleEditPressed = () => {};
  const handleDeletePressed = () => {};

  const handleSelectImage = () => {
    setShowSelectImage(!showSelectImage);
  };

  const handleSetPickedImage = async (uri) => {
    setPickedImage(uri);

    const { url } = await uploadImage(
      uri,
      `images/${data.id}`,
      `${data?.description}-${Date.now()}`
    );

    console.log(url);
    // let url = uri

    dispatch(
      editExpense({ id: data.id, groupId: data.groupId, photoURL: url })
    );

    alert("done");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
      }}
    >
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
      {/* header  */}
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
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchWithFeed
              onPress={handleSelectImage}
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="camera" color={themeMode.white} size={24} />
              }
            />
            <TouchWithFeed
              onPress={handleDeletePressed}
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <Ionicons name="trash-bin" color={themeMode.white} size={24} />
              }
            />
            <TouchWithFeed
              onPress={handleEditPressed}
              flex={{
                alignItems: "flex-end",
              }}
              size={{ width: 35 }}
              icon={
                <MaterialIcons name="edit" color={themeMode.white} size={24} />
              }
            />
          </View>
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
        >
          <Image
            resizeMode="cover"
            source={{ uri: pickedImage || data?.photoURL }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      </View>
      {/* header end  */}

      <ScrollView
        style={{
          flexGrow: 1,
        }}
      >
        {/* description */}
        <View
          style={{
            marginLeft: 65,
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Inter_900Black",
              color: themeMode.white,
              marginBottom: 5,
            }}
          >
            {data?.description}
          </Text>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.white,
            }}
          >
            Ghc {amountYouPaid}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.blueLighter,
            }}
          >
            Added by {paidBy} on {day} {month} {year}
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.blueLighter,
            }}
          >
            Updated by you on 1 June 2022
          </Text> */}
        </View>
        {/* description end  */}

        {/* chart  */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 30,
          }}
        >
          {/* owe graph  */}
          <OweDraw data={data} />
        </View>
        {/* chart end */}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingVertical: 20,
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("letsSplit", { data });
          }}
          style={({ pressed }) => {
            return {
              transform: [{ scale: pressed ? 0.98 : 1 }],
            };
          }}
        >
          <Button3d text={"Let's split"} />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter_400Regular",
              color: themeMode.blueLighter,
            }}
          >
            Do you want to say something?{" "}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("comment", { expenseData: data, index });
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: themeMode.pinkLighter,
                textDecorationLine: "underline",
              }}
            >
              Comment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExpenseDetails;
