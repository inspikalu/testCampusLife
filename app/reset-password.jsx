import { View, Text, TextInput, StatusBar, PixelRatio, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import authStyles from "styles/authStyles";
import { hue } from "constants";
import showError from "utils/showError";
import ErrorModal from "components/Modal";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { storeToken } from "utils/tokenHandler";
const textInputIDs = {
  ID1: "emailInput",
  ID2: "passwordInput",
  ID3: "thirdInput",
};
const baseUrl = "https://campuslife-hd40.onrender.com/api";

const ResetPassword = function () {
  const result = useLocalSearchParams();
  const resetToken = result && Object.values(result).join("");

  const [focusedInput, setFocusedInput] = useState(undefined);
  const [password, setPassword] = useState("");
  const [tests, setTests] = useState({
    eightChars: false,
    containsNumber: false,
    containsSpecialCharacter: false,
  });
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleValueChange = function (text) {
    if (text.length > 7) {
      setTests({ ...tests, eightChars: true });
    }
    if (/\d/.test(text)) {
      setTests({ ...tests, containsNumber: true });
    }
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~]/;
    if (specialCharsRegex.test(text)) {
      setTests({ ...tests, containsSpecialCharacter: true });
    }
    setPassword(text);
  };

  const handleSubmit = async function () {
    if (!password.length > 7) {
      return showError("Make sure the password matches the criterias listed", setModalVisible, setErrorText, modalVisible);
    }
    setButtonDisabled(true);
    try {
      const response = await axios.post(`${baseUrl}/resetPassword`, {
        new_password: password,
        resetToken,
      });
      await storeToken(response.data.token);
      setButtonDisabled(false);
      alert("Password reset successful");
      setTimeout(() => router.replace("/tabs/home"), 3000);
    } catch (error) {
      setButtonDisabled(false);
      alert(error);
    }
  };
  return (
    <View
      style={{
        ...authStyles.container,
        marginTop: StatusBar.currentHeight * 6,
        justifyContent: "flex-start",
      }}
    >
      <ErrorModal errorText={errorText} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ ...authStyles.title, color: hue.primary }}>Reset Your Password,</Text>
        <Text style={{ ...authStyles.subtitle, color: hue.textLight }}>Please enter a new password</Text>

        <View
          style={{
            ...authStyles.inputContainer,
            borderColor: focusedInput === textInputIDs.ID3 ? hue.secondary : hue.primaryLight,
          }}
        >
          <Image
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(8),
              height: PixelRatio.getPixelSizeForLayoutSize(8),
            }}
            source={require("../assets/icons/lock.png")}
          />
          <TextInput
            secureTextEntry={true}
            placeholderTextColor={hue.textLight}
            style={{ ...authStyles.inputTextColor, color: hue.primary }}
            cursorColor={hue.secondary}
            onFocus={() => setFocusedInput(textInputIDs.ID3)}
            placeholder="Password"
            selectionColor={hue.secondaryLight}
            defaultValue={password}
            onChangeText={(text) => handleValueChange(text)}
          ></TextInput>
        </View>

        <View
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ backgroundColor: hue.textLight }}>
              <Image
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(10),
                  height: PixelRatio.getPixelSizeForLayoutSize(10),
                  zIndex: 30,
                }}
                source={require("../assets/icons/cl_tick.svg")}
              />
            </View>
            <Text style={tests.eightChars ? doneStyle.ticked : {}}>At least 8 characters</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ backgroundColor: hue.textLight }}>
              <Image
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(10),
                  height: PixelRatio.getPixelSizeForLayoutSize(10),
                  zIndex: 30,
                }}
                source={require("../assets/icons/cl_tick.svg")}
              />
            </View>
            <Text style={tests.containsNumber ? doneStyle.ticked : {}}>Contains a number</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ backgroundColor: hue.textLight }}>
              <Image
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(10),
                  height: PixelRatio.getPixelSizeForLayoutSize(10),
                  zIndex: 30,
                }}
                source={require("../assets/icons/cl_tick.svg")}
              />
            </View>
            <Text style={tests.containsSpecialCharacter ? doneStyle.ticked : {}}>Contains a special character</Text>
          </View>
        </View>

        <Pressable
          android_ripple={{
            color: "#ffffff30",
            borderless: false,
            radius: 400,
          }}
          style={authStyles.button}
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isButtonDisabled ? "Loading....." : "Continue"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ResetPassword;

const doneStyle = StyleSheet.create({
  ticked: {
    textDecorationLine: "line-through",
    color: hue.primaryLight,
  },
});
/**
 *  <View
          style={{
            ...authStyles.inputContainer,
            borderColor:
              focusedInput === textInputIDs.ID3
                ? hue.secondary
                : hue.primaryLight,
          }}
        >
          <Image
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(8),
              height: PixelRatio.getPixelSizeForLayoutSize(8),
            }}
            source={require("../assets/icons/lock.png")}
          />
          <TextInput
            secureTextEntry={true}
            placeholderTextColor={hue.textLight}
            style={{ ...authStyles.inputTextColor, color: hue.primary }}
            cursorColor={hue.secondary}
            onFocus={() => setFocusedInput(textInputIDs.ID3)}
            placeholder="Password"
            selectionColor={hue.secondaryLight}
            defaultValue={password}
            onChangeText={(text) => handleValueChange(text, "password")}
          ></TextInput>
        </View>
 */
