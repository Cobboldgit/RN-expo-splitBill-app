import { View, Text } from "react-native";
import React from "react";
import Settle from "./Settle";

const SettleUpList = ({ group }) => {
  return group?.expenses.map((data, index) => {
    return <Settle key={index} data={data} />;
  });
};

export default SettleUpList;
