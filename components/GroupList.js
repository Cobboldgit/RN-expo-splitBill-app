import { View, Text } from "react-native";
import React from "react";
import Group from "./Group";

const GroupList = ({ type }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (type === "groups") {
    return data.map((item, index) => {
      return <Group key={index} />;
    });
  } else {
    return data.splice(0, 2).map((item, index) => {
      return <Group key={index} />;
    });
  }
};

export default GroupList;
