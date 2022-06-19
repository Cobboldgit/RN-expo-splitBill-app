import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import { useSelector } from "react-redux";
import { theme, icons } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { flushSync } from "react-dom";
import AddExpense from "../screens/AddExpense";

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        height: 70,
      }}
    >
      <BottomTabBar {...props} />
    </View>
  );
};

const BottomTab = () => {
  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: themeMode.blueLight,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? themeMode.blueLighter : themeMode.blueLight}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => {
            return (
              <Image source={icons.tabBarAdd} style={{
                marginBottom: 15
              }}/>
            );
          },
          tabBarLabelStyle: {
            color: 'transparent'
          }
        }}
        name="addExpense"
        component={AddExpense}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-sharp"}
                size={24}
                color={focused ? themeMode.blueLighter : themeMode.blueLight}
              />
            );
          },
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
