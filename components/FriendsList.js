import { View, Text } from "react-native";
import React from "react";
import Friends from "./Friends";

const FriendsList = ({ type }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (type === "friends") {
    return data.map((item, index) => {
      return <Friends key={index} type={type} />;
    });
  } else {
    return data.splice(0, 4).map((item, index) => {
      return <Friends key={index} />;
    });
  }
};

export default FriendsList;
