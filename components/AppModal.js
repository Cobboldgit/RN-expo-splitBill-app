import { Modal } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../store/actions/appActions";

const AppModal = ({ children, animationType }) => {
  const dispatch = useDispatch();
  const { modalVisible } = useSelector((state) => state.appReducer);

  const handleCloseButtonPress = () => {
    dispatch(setShowModal(false));
  };

  return (
    <Modal
      onRequestClose={handleCloseButtonPress}
      animationType={animationType || 'slide'}
      transparent={true}
      visible={modalVisible}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
