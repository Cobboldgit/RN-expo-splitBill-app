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

const GroupSettings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const handleSubmit = () => {};

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
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
            <SquareImage />
            <View style={{}}>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.white,
                  fontSize: 16,
                }}
              >
                Codetrain
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: themeMode.blueLighter,
                }}
              >
                Codetrain
              </Text>
            </View>
          </View>
          <MaterialIcons name="edit" color={themeMode.white} size={24} />
        </TouchableOpacity>
        {/* edit group name end  */}

        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 20,
            color: themeMode.white,
            marginTop: 30,
            marginBottom: 20
          }}
        >
          Group members
        </Text>

        <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Ionicons name='person-add' color={themeMode.white} size={24} />
          <Text style={{
            fontFamily: "Inter_400Regular",
            color: themeMode.white,
            fontSize: 16,
            marginLeft: 20
          }}>Add people to group</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GroupSettings;
