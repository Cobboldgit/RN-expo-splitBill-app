import { View, Text, Dimensions, Modal } from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { icons } from "../constants";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Loader = ({state}) => {
  return (
    <Modal animationType='fade' statusBarTranslucent transparent visible={state}>
      <View
        style={{
          backgroundColor: "#00000062",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AnimatedLottieView source={icons.loader} autoPlay speed={1} loop autoSize={true}/>
      </View>
    </Modal>
  );
};

export default Loader;
