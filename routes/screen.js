import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Loading from "../screens/Loading";
import AuthScreen from "../screens/AuthScreen";
import GetStarted from "../screens/GetStarted";
import GroupDetails from "../screens/GroupDetails";
import ExpenseDetails from "../screens/ExpenseDetails";
import BottomTab from "./tab";
import {
  useFonts,
  Inter_900Black,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import Groups from "../screens/Groups";
import Expenses from "../screens/Expenses";
import Friends from "../screens/Friends";
import Notifications from "../screens/Notifications";
import Splits from "../screens/Splits";
import { auth } from "../firebase/firebase";
import GroupSettings from "../screens/GroupSettings";
import CreateExpense from "../screens/CreateExpense";
import PaidBy from "../screens/PaidBy";
import SplitProportion from "../screens/SplitProportion";
import LetsSplit from "../screens/LetsSplit";
import Comment from "../screens/Comment";

const Stack = createNativeStackNavigator();

const Screen = () => {
  const [currUser, setCurrUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user && user.uid) {
          setCurrUser(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.log("authError =>", error);
      }
    );

    return () => unsubscribe();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="loading" component={Loading} />
        </Stack.Navigator>
      ) : !currUser && !loading ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="getStarted"
        >
          <Stack.Screen name="getStarted" component={GetStarted} />
          <Stack.Screen name="auth" component={AuthScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="home"
        >
          <Stack.Screen name="bottom" component={BottomTab} />
          <Stack.Screen name="groups" component={Groups} />
          <Stack.Screen name="groupDetails" component={GroupDetails} />
          <Stack.Screen name="expenses" component={Expenses} />
          <Stack.Screen name="expenseDetails" component={ExpenseDetails} />
          <Stack.Screen name="friends" component={Friends} />
          <Stack.Screen name="notifications" component={Notifications} />
          <Stack.Screen name="splits" component={Splits} />
          <Stack.Screen name="groupSettings" component={GroupSettings} />
          <Stack.Screen name="createExpense" component={CreateExpense} />
          <Stack.Screen name="paidBy" component={PaidBy} />
          <Stack.Screen name="splitProportion" component={SplitProportion} />
          <Stack.Screen name="letsSplit" component={LetsSplit} />
          <Stack.Screen name="comment" component={Comment} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Screen;
