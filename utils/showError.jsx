import { View, Text } from "react-native";
import React from "react";

const showError = (
  errorMessage,
  setModalVisible,
  setErrorText,
  modalVisible
) => {
  setErrorText(errorMessage);
  setModalVisible(!modalVisible);
  setTimeout(() => setModalVisible(false), 3000);
};

export default showError;
