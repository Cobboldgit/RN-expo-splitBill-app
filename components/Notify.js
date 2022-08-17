import { View, Text, Platform, Button } from "react-native";
import * as Notification from "expo-notifications";
import * as Device from "expo-device";

import React, { useRef, useState, useEffect } from "react";

const Notify = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notification.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current =
      Notification.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
      Notification.removeNotificationSubscription(responseListener.current);
    };
  }, []);

//   async function schedulePushNotification() {
//     await Notification.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: "Here is the notification body",
//         data: { data: "goes here" },
//       },
//       trigger: { seconds: 2 },
//     });
//   }

  return null;
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notification.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notification.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notification.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notification");
  }

  if (Platform.OS === "android") {
    Notification.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notification.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default Notify;
