import { View, Text } from "react-native";
import React from "react";
import Settle from "./Settle";

const SettleUpList = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return data.map((item, index) => {
    return <Settle key={index} />;
  });
};

export default SettleUpList;
