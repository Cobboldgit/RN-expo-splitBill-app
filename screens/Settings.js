import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SectionList,
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

const Settings = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const features = [
    {
      title: "Preferences",
      data: [
        {
          title: "Passcode",
          icon: <Entypo name="lock" size={24} color={themeMode.white} />,
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
        },
      ],
    },
  ];

  const handleFeaturePressed = (title) => {
    alert(title);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeMode.blueBlack,
        paddingTop: StatusBar.currentHeight,
      }}
    >
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
        ListFooterComponent={RenderFooterComponent}
        sections={features}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <RenderFeature feature={item} onPress={handleFeaturePressed} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle title={title} themeMode={themeMode} />
        )}
      />
    </View>
  );
};

const RenderHeaderComponent = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleEdit = () => {};

  const handleCameraPressed = () => {}

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: themeMode.blueLight,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 20,
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
      onPress={handleCameraPressed}
        style={{
          flex: 2,
        }}
      >
        <Avatar height={60} width={60} />
        <View style={{
          position: 'absolute',
          top: 40,
          right: 10
        }}>
          <MaterialCommunityIcons name="camera" size={24} color={themeMode.white} />
        </View>
      </TouchableOpacity>
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
          Augustine Cobbold
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            color: themeMode.blueLighter,
          }}
        >
          augus@gmail.com
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            padding: 5,
          }}
        >
          <FontAwesome5 name="user-edit" size={24} color={themeMode.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RenderFooterComponent = () => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  return (
    <TouchableOpacity
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

const RenderFeature = ({ feature, onPress }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  return (
    <TouchableOpacity
      onPress={() => onPress(feature.title)}
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

export default Settings;
