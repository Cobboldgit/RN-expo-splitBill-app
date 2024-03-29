import { View, Text } from "react-native";
import React from "react";
import Settle from "./Settle";

const SettleUpList = ({ group }) => {
  return group?.expenses.slice(0).reverse().map((data, index) => {
    return <Settle key={index} data={data} index={index} />;
  });
};

export default SettleUpList;
