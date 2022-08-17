import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SectionList,
  Share,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import Avatar from "../components/Avatar";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RateSystem from "../components/RateSystem";
import { signOut } from "../store/actions/authActions";
import ProfilePicture from "./ProfilePicture";

const Settings = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();
  const [showRateModal, setShowRateModal] = useState(false);
  const dispatch = useDispatch();

  // features data start
  const features = [
    {
      title: "Display",
      data: [
        {
          title: "Theme",
          icon: <Entypo name="palette" size={24} color={themeMode.white} />,
          screen: "theme",
        },
      ],
    },
    {
      title: "Preferences",
      data: [
        {
          title: "Passcode",
          icon: <Entypo name="lock" size={24} color={themeMode.white} />,
          screen: "passcode",
        },
      ],
    },
    {
      title: "Share",
      data: [
        {
          title: "Share",
          icon: <Entypo name="share" size={24} color={themeMode.white} />,
        },
      ],
    },
    {
      title: "Feedback",
      data: [
        {
          title: "Rate",
          icon: (
            <MaterialIcons name="star-rate" size={24} color={themeMode.white} />
          ),
        },
        {
          title: "FAQ",
          icon: (
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              size={24}
              color={themeMode.white}
            />
          ),
          screen: "faq",
        },
        {
          title: "Contact / Support",
          icon: (
            <MaterialIcons
              name="support-agent"
              size={24}
              color={themeMode.white}
            />
          ),
          screen: "contactOrSupport",
        },
      ],
    },
  ];
  // features data end

  // feature component onpress
  const handleFeaturePressed = (title) => {
    navigation.navigate(title);
  };
  // feature component onpress end

  // rate modal
  const handleRateModal = () => {
    setShowRateModal(!showRateModal);
  };
  // rate modal end

  // log out
  const handleLogOut = () => {
    dispatch(signOut());
  };
  // log out end

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Modal
        statusBarTranslucent
        onRequestClose={() => {
          handleRateModal();
        }}
        animationType="slide"
        transparent={true}
        visible={showRateModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : "padding"}
          style={{
            flex: 1,
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
            style={{
              flex: 1,
              // backgroundColor: `rgba(0,0,0,0.5)`,
              justifyContent: "flex-end",
            }}
          >
            <LinearGradient
              colors={[themeMode.pinkLight, themeMode.pinkLighter]}
              style={{
                height: Dimensions.get("screen").height / 2,
                width: "100%",
                // backgroundColor: themeMode.blueLight,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <RateSystem closeModal={handleRateModal} />
            </LinearGradient>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontSize: 20,
            fontFamily: "Inter_900Black",
          }}
        >
          Account
        </Text>
      </View>
      <SectionList
        ListHeaderComponent={RenderHeaderComponent}
        ListFooterComponent={() => (
          <RenderFooterComponent logOut={handleLogOut} />
        )}
        sections={features}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <RenderFeature
            handleRateModal={handleRateModal}
            feature={item}
            onPress={handleFeaturePressed}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle title={title} themeMode={themeMode} />
        )}
      />
    </View>
  );
};

//  Account start
const RenderHeaderComponent = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const navigation = useNavigation();

  const handleEdit = () => {};

  const handleProfile = () => {
    navigation.navigate("profile");
  };

  return (
    <Pressable
      onPress={handleProfile}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: themeMode.blueLight,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: pressed ? themeMode.blueLight : "transparent",
      })}
    >
      <View
        style={{
          flex: 2,
        }}
      >
        <Avatar uri={userData?.photoUrl} height={60} width={60} />
        <View
          style={{
            position: "absolute",
            top: 40,
            right: 10,
          }}
        >
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color={themeMode.white}
          />
        </View>
      </View>
      <View
        style={{
          flex: 6,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            color: themeMode.white,
          }}
        >
          {userData?.displayName}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: themeMode.blueLighter,
          }}
        >
          {userData?.email}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            padding: 5,
          }}
        >
          <FontAwesome5 name="user-edit" size={24} color={themeMode.white} />
        </View>
      </View>
    </Pressable>
  );
};
//  Account end

// Logout start
const RenderFooterComponent = ({ logOut }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  return (
    <TouchableOpacity
      onPress={logOut}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
      }}
    >
      <View
        style={{
          flex: 2,
          alignItems: "center",
        }}
      >
        <Entypo name="log-out" size={24} color={themeMode.pinkLight} />
      </View>
      <View
        style={{
          flex: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            color: themeMode.pinkLight,
            justifyContent: "center",
          }}
        >
          Log out
        </Text>
      </View>
    </TouchableOpacity>
  );
};
// Logout end

// features section title start
const SectionTitle = ({ title, themeMode }) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 5,
      }}
    >
      <Text
        style={{
          color: themeMode.white,
          fontSize: 20,
          fontFamily: "Inter_900Black",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
// features section title end

// features start
const RenderFeature = ({ feature, onPress, handleRateModal }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleSharePressed = async () => {
    try {
      const result = await Share.share({
        message: "Link to share with friends",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (feature.screen) {
          onPress(feature.screen);
        } else if (feature.title === "Share") {
          handleSharePressed();
        } else if (feature.title === "Rate") {
          handleRateModal();
        }
      }}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {feature.icon}
      </View>
      <View
        style={{
          flex: 8,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontSize: 18,
            fontFamily: "Inter_400Regular",
          }}
        >
          {feature.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// features end

export default Settings;
