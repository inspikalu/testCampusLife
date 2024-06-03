import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, StatusBar, PixelRatio, Text, Pressable } from "react-native";
import { router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import authStyles from "styles/authStyles";
import { hue } from "constants";
import ErrorModal from "components/Modal";
import showError from "utils/showError";
import axios from "axios";
import { Link } from "expo-router";
import { storeResetToken } from "utils/tokenHandler";

const baseUrl = "https://campuslife-hd40.onrender.com/api/";

const VerificationCode = function () {
  const [code, setCode] = useState(["", "", "", ""]);
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const inputs = useRef([]);

  const focusNextInput = (index) => {
    if (index < 3 && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleInputChange = (text, index) => {
    if (/^[0-9]$/.test(text) || text === "") {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== "") {
        focusNextInput(index);
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      focusPrevInput(index);
    }
  };

  const submitVerificationCode = async () => {
    if (code[0] === "" || code[1] === "" || code[2] === "" || code[3] === "") {
      showError("Enter a complete code", setModalVisible, setErrorText, modalVisible);
      return "Enter a complete code";
    }
    setButtonDisabled(true);
    try {
      const response = await axios.post(`${baseUrl}/verifyOtp`, {
        otp: code.join(""),
      });
      storeResetToken(response.data.resetToken);
      setButtonDisabled(false);
      // navigation.push("reset-password", {
      //   resetToken: response.data.resetToken,
      // });
      // router.push("/reset-password");
      router.push({
        pathname: "/reset-password",
        params: response.data.resetToken,
      });
    } catch (error) {
      setButtonDisabled(false);
      showError(error?.response?.data?.message, setModalVisible, setErrorText, modalVisible);
    }
  };

  return (
    <View style={{ ...authStyles.container, marginTop: StatusBar.currentHeight }}>
      <ErrorModal errorText={errorText} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ ...authStyles.title, color: hue.primary }}>Check your email</Text>
        <Text style={{ ...authStyles.subtitle, color: hue.textLight }}>We've sent the code to your email</Text>
      </View>

      <View style={{ marginTop: 40, justifyContent: "space-between" }}>
        <View style={authStyles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={{ ...authStyles.codeInputBox }}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <Pressable
          android_ripple={{
            color: "#ffffff30",
            borderless: false,
            radius: 400,
          }}
          style={authStyles.button}
          onPress={submitVerificationCode}
          disabled={isButtonDisabled}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isButtonDisabled ? "Loading...." : "Continue"}</Text>
        </Pressable>

        {/* 
    {timer > 1 && (
      <Pressable
        android_ripple={{
          color: "#ffffff30",
          borderless: false,
          radius: 400,
        }}
        style={authStyles.button}
        onPress={submitVerificationCode}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Continue
        </Text>
      </Pressable>
    )}

    {timer < 1 && (
      <Pressable
        android_ripple={{
          color: "#ffffff30",
          borderless: false,
          radius: 400,
        }}
        style={authStyles.button}
        onPress={resendVerificationCode}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Resend code
        </Text>
      </Pressable>
    )} */}

        <View
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={authStyles.bottomText}>Code expires in</Text>
          <Text
            style={{
              ...authStyles.bottomText,
              marginLeft: 8,
              color: hue.secondary,
            }}
          >
            10 minutes
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <Link href="/forgot-password">
            {" "}
            <Text style={authStyles.bottomText}>Resend Token</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default VerificationCode;
