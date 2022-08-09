import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { theme } from "../constants";

const { width } = Dimensions.get("window");
const lockWidth = width * 0.75;
const lockHeight = 60;
const smallgap = 4;
const finalPosition = lockWidth - lockHeight;

export default function SlideToUnlock() {

  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;


  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const translateBtn = pan.x.interpolate({
    inputRange: [0, finalPosition],
    outputRange: [0, finalPosition],
    extrapolate: "clamp",
  });
  const textOpacity = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateText = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [0, lockWidth / 4],
    extrapolate: "clamp",
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (g.vx > 2 || g.dx > lockWidth / 2) {
          unlock();
        } else {
          reset();
        }
      },
      onPanResponderTerminate: () => reset(),
    })
  ).current;
  const reset = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  const unlock = () => {
    Animated.spring(pan, {
      toValue: { x: finalPosition, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    setTimeout(() => {
      Alert.alert(
        "Bill Splited",
        "You have successfully splited the bill. Members will recieve the request",
        [{ text: "Ok", onPress: () => reset() }]
      );
    }, 300);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.lockContainer, {backgroundColor: themeMode.blueLight}]}>
        <Animated.Text
          style={[
            styles.txt,
            {
              opacity: textOpacity,
              transform: [{ translateX: translateText }],
              color: themeMode.white,
              fontFamily: "Inter_400Regular",
            },
          ]}
        >
          {"Slide to split ->"}
        </Animated.Text>
        <Animated.View
          style={[styles.bar, { transform: [{ translateX: translateBtn }], backgroundColor: themeMode.pinkLight }]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  lockContainer: {
    height: lockHeight,
    width: lockWidth,
    borderRadius: lockHeight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  txt: {
    letterSpacing: 2,
  },
  bar: {
    position: "absolute",
    height: lockHeight - smallgap * 2,
    width: lockHeight - smallgap * 2,
    borderRadius: lockHeight,
    left: smallgap,
    elevation: 1,
  },
});
