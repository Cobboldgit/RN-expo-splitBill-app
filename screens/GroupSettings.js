import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import TouchWithFeed from "../components/TouchWithFeed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SquareImage from "../components/SquareImage";
import {
  addParticipant,
  clearParticipants,
  editGroup,
  setDataFromAddParticipant,
  setDataFromEditGroupName,
  uploadImage,
} from "../store/actions/appActions";

import { useState } from "react";
import { useEffect } from "react";
import AddParticipant from "./AddParticipant";
import { auth } from "../firebase/firebase";
import { Fragment } from "react";
import PartticipantCard from "../components/PartticipantCard";

const GroupSettings = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  // const [dataFromAddParticipant, setdataFromAddParticipant] = useState([]);
  const navigation = useNavigation();
  const group = useRoute().params.group;
  const dispatch = useDispatch();
  const {
    darkMode,
    participants,
    dataFromEditGroupName,
    dataFromAddParticipant,
  } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  useEffect(() => {
    dispatch(clearParticipants());
    group?.participants.forEach((item) => {
      dispatch(addParticipant(item));
    });
  }, []);

  useEffect(() => {
    if (dataFromAddParticipant.length > 0) {
      dataFromAddParticipant.forEach((contact) => {
        dispatch(addParticipant(contact));
      });
      // setdataFromAddParticipant([]);
    }
  }, [dataFromAddParticipant]);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    let photoURL;

    if (dataFromEditGroupName && dataFromEditGroupName.photoURL) {
      const { url } = await uploadImage(
        dataFromEditGroupName.photoURL,
        `images/${user.uid}`,
        `${dataFromEditGroupName.groupName}`
      );
      photoURL = url;
    }

    const data = {
      groupName: dataFromEditGroupName && dataFromEditGroupName.groupName
        ? dataFromEditGroupName?.groupName
        : group?.groupName,
      participants,
      groupId: group.id,
      photoURL: photoURL ? photoURL : group?.photoURL,
    };

    // if (photoURL) {
    //   data.dataFromEditGroupName.photoURL = photoURL;
    // }

    await dispatch(editGroup(data));
    dispatch(setDataFromEditGroupName(null))
    dispatch(setDataFromAddParticipant([]))
    navigation.goBack();
  };

  const handleEditGroupName = () => {
    navigation.navigate("editGroupName", {
      photoURL: group?.photoURL,
      groupName: group?.groupName,
    });
  };

  const handleAddPeopleToGroup = () => {
    // if (dataFromAddParticipant) {
    //   setdataFromAddParticipant(dataFromAddParticipant);
    // }
    // setShowPartModal(!showPartModal);
    navigation.navigate("addParticipant");
  };

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      {/* <AddParticipant
        modalVisible={showPartModal}
        handleModalVisible={handleAddPeopleToGroup}
      /> */}

      {/* header  */}
      <View
        style={{
          height: 70,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: themeMode.white,
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingHorizontal: 16,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{
              width: 50,
            }}
            icon={
              <Ionicons
                name="arrow-back"
                color={themeMode.blueLighter}
                size={30}
              />
            }
          />
          <Text
            style={{
              color: themeMode.white,
              fontSize: 20,
              fontFamily: "Inter_400Regular",
            }}
          >
            Group settings
          </Text>
        </View>
        <TouchWithFeed
          onPress={handleSubmit}
          size={{
            width: undefined,
          }}
          icon={
            <Text
              style={{
                fontSize: 18,
                color: themeMode.pinkLight,
                fontFamily: "Inter_400Regular",
              }}
            >
              Save
            </Text>
          }
        />
      </View>
      {/* header end */}

      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        {/* edit group name  */}
        <TouchableOpacity
          onPress={handleEditGroupName}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquareImage
              url={dataFromEditGroupName?.photoURL || group?.photoURL}
            />
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    color: themeMode.white,
                    fontSize: 16,
                  }}
                >
                  {group?.groupName}
                </Text>
                {dataFromEditGroupName &&
                  dataFromEditGroupName?.groupName !== group?.groupName && (
                    <Fragment>
                      <View
                        style={{
                          width: 25,
                          height: 2,
                          backgroundColor: themeMode.blueLighter,
                          marginHorizontal: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          color: themeMode.blueLighter,
                          fontSize: 16,
                        }}
                      >
                        {dataFromEditGroupName?.groupName}
                      </Text>
                    </Fragment>
                  )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    color: themeMode.blueLighter,
                  }}
                >
                  Type
                </Text>
                <View
                  style={{
                    width: 25,
                    height: 2,
                    backgroundColor: themeMode.blueLighter,
                    marginHorizontal: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    color: themeMode.blueLighter,
                  }}
                >
                  Type
                </Text>
              </View>
            </View>
          </View>
          <MaterialIcons name="edit" color={themeMode.white} size={24} />
        </TouchableOpacity>
        {/* edit group name end  */}

        {/* group members */}

        {/* header  */}
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 20,
            color: themeMode.white,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          Group members
        </Text>
        {/* header end */}

        {/* add people  */}
        <TouchableOpacity
          onPress={handleAddPeopleToGroup}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="person-add" color={themeMode.white} size={24} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              color: themeMode.white,
              fontSize: 16,
              marginLeft: 20,
            }}
          >
            Add people to group
          </Text>
        </TouchableOpacity>
        {/* add people end  */}

        {/* list new participants  */}

        {dataFromAddParticipant.length > 0 &&
          dataFromAddParticipant.map((item, index) => {
            return <PartticipantCard key={index} item={item} edit={true} />;
          })}

        {/* list new participants end */}

        {/* list participants  */}

        {group?.participants.length > 0 &&
          group.participants.map((item, index) => {
            return <PartticipantCard key={index} item={item} edit={false} />;
          })}

        {/* list participants end */}

        {/* group members end  */}
      </ScrollView>
    </View>
  );
};

export default GroupSettings;
