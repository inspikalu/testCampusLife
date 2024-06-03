import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    alert(e);
  }
};

export const storeResetToken = async (value) => {
  try {
    const value = await AsyncStorage.setItem("resetToken", value);
  } catch (error) {
    alert(error);
  }
};
export const getToken = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    // return jsonValue;
  } catch (e) {
    alert(e);
  }
};

export const setLoginState = async function (loggedIn) {
  try {
    await AsyncStorage.setItem("loggedIn", loggedIn);
  } catch (error) {
    alert(e);
  }
};

export const getLoginState = async function () {
  try {
    const jsonValue = await AsyncStorage.getItem("loggedIn");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {}
};
