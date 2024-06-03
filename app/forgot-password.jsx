import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, PixelRatio, Image, TextInput, Pressable } from "react-native";
import { hue } from "../constants";
import { router } from "expo-router";
import authStyles from "../styles/authStyles";
import axios from "axios";
import showError from "utils/showError";
import ErrorModal from "components/Modal";

const textInputIDs = {
  ID1: "emailInput",
  ID2: "passwordInput",
  ID3: "thirdInput",
};
const baseUrl = "https://campuslife-hd40.onrender.com/api/";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ForgotPassword() {
  const [focusedInput, setFocusedInput] = useState(undefined);
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleContinue = async () => {
    const data = { email };

    if (!email || email === "" || !emailRegex.test(email)) {
      showError("Please enter a valid Email", setModalVisible, setErrorText, modalVisible);
      return "Email invalid";
    }
    try {
      setButtonDisabled(true);
      const response = await axios.post(`${baseUrl}/forgotPassword`, { email });
      setButtonDisabled(false);

      alert("Verification Has  been sent to your email");
      setTimeout(() => router.push("/verification-code"), 3000);
    } catch (error) {
      setButtonDisabled(false);

      showError(error.response.data.message, setModalVisible, setErrorText, modalVisible);
    }
  };

  return (
    <View style={{ ...authStyles.container, marginTop: StatusBar.currentHeight }}>
      <ErrorModal errorText={errorText} modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ ...authStyles.title, color: hue.primary }}>Password Recovery</Text>
        <Text style={{ ...authStyles.subtitle, color: hue.textLight }}>Please enter the email you registered with to recover password</Text>
      </View>

      <View style={{ marginTop: 40, justifyContent: "space-between" }}>
        <View
          style={{
            ...authStyles.inputContainer,
            borderColor: focusedInput === textInputIDs.ID2 ? hue.secondary : hue.primaryLight,
          }}
        >
          <Image
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(8),
              height: PixelRatio.getPixelSizeForLayoutSize(8),
            }}
            source={require("../assets/icons/email.png")}
          />
          <TextInput
            placeholderTextColor={hue.textLight}
            style={{ ...authStyles.inputTextColor, color: hue.primary }}
            cursorColor={hue.secondary}
            inputMode="email"
            onFocus={() => setFocusedInput(textInputIDs.ID2)}
            placeholder="Email Address"
            selectionColor={hue.secondaryLight}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text
            onPress={() => router.push("/sign-in")}
            style={{
              marginLeft: 8,
              color: hue.secondary,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Go back to login?
          </Text>
        </View>

        <Pressable
          android_ripple={{
            color: "#ffffff30",
            borderless: false,
            radius: 400,
          }}
          style={authStyles.button}
          onPress={handleContinue}
          disabled={isButtonDisabled}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isButtonDisabled ? "Loading....." : "Continue"}</Text>
        </Pressable>

        <View
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={authStyles.bottomText}>Don't have account with us?</Text>
          <Text
            onPress={() => router.push("/sign-up")}
            style={{
              ...authStyles.bottomText,
              marginLeft: 8,
              color: hue.secondary,
            }}
          >
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
}
