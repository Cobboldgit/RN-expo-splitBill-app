import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import NotificationBell from "../components/NotificationBell";
import RenderFeatures from "../components/RenderFeatures";
import SquareButton from "../components/SquareButton";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import FriendsList from "../components/FriendsList";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useCallback } from "react";
import { getAllGroups, getUserData, wait } from "../store/actions/appActions";
import { useState } from "react";
import HomeGroup from "../components/HomeGroup";
import { auth } from "../firebase/firebase";
import Loader from "../components/Loader";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { darkMode, userData } = useSelector((state) => state.appReducer);

  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(4000).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getAllGroups());
  }, [refreshing]);

  const gotoGroups = () => {
    navigation.navigate("groups");
  };

  const gotoFriends = () => {
    navigation.navigate("friends");
  };

  const handleFeaturePress = (screen) => {
    navigation.navigate(screen);
  };

  const handleBellPress = () => {
    navigation.navigate("notifications");
  };

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 16,
      }}
    >
      {/* <Loader state={false}/> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={themeMode.blueLight}
            colors={[
              themeMode.pinkLight,
              themeMode.pinkLighter,
              themeMode.pinkLightest,
            ]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* header  */}
        <View
          style={{
            // height: 70,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: StatusBar.currentHeight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Avatar uri={userData?.photoURL} />
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 24,
                color: themeMode.pinkLight,
              }}
            >
              Hi {userData?.displayName?.split(" ")[0]}
            </Text>
          </View>
          <NotificationBell onPress={handleBellPress} />
        </View>
        {/* header end  */}

        {/* header 2 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: themeMode.white,
              fontFamily: "Inter_900Black",
              marginRight: 5,
            }}
          >
            Split the
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: themeMode.pinkLight,
              fontFamily: "Inter_900Black",
            }}
          >
            bills
          </Text>
        </View>
        {/* header 2 end */}

        {/* features  */}
        <View
          style={{
            backgroundColor: themeMode.blueLight,
            height: 142,
            borderRadius: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <RenderFeatures themeMode={themeMode} onPress={handleFeaturePress} />
        </View>
        {/* features end */}

        {/* previous split  */}
        <TouchableOpacity
          style={{
            backgroundColor: themeMode.blueLight,
            height: 80,
            borderRadius: 15,
            marginTop: 50,
            alignItems: "center",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquareButton
              colors={[themeMode.blueLight, themeMode.black]}
              icon={
                <MaterialIcons
                  name="attach-money"
                  size={30}
                  color={themeMode.pinkLight}
                />
              }
            />
            <Text
              style={{
                color: themeMode.white,
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                marginLeft: 10,
              }}
            >
              Previous Split
            </Text>
          </View>
          <Text
            style={{
              color: themeMode.white,
              fontFamily: "Inter_900Black",
              fontSize: 16,
            }}
          >
            Ghc 300.00
          </Text>
        </TouchableOpacity>
        {/* previous split end */}

        {/* Groups  */}
        <Header title={"Groups"} onPress={gotoGroups} />
        <GroupList />
        {/* Groups end */}

        {/* friends  */}
        <Header title={"Nearby friends"} onPress={gotoFriends} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <FriendsList />
        </View>
        {/* friends end */}
      </ScrollView>
    </View>
  );
};

export default Home;
