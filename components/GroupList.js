import { View, Text } from "react-native";
import React from "react";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../store/actions/appActions";

const GroupList = ({}) => {
  const {groupsData} = useSelector(state => state.appReducer)


  return groupsData.map((group, index) => {
    return <Group key={index} group={group} />;
  });
};

export default GroupList;
