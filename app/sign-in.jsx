import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, PixelRatio, Image, TextInput, Pressable } from "react-native";
import { hue } from "../constants";
import { useStateValue } from "../state-provider";
import { actionTypes } from "../reducer";
import { router } from "expo-router";
import authStyles from "../styles/authStyles";
import axios from "axios";
import showError from "utils/showError";
import ErrorModal from "components/Modal";
import { storeToken, getLoginState, setLoginState, getToken } from "utils/tokenHandler";

const textInputIDs = {
  ID1: "emailInput",
  ID2: "passwordInput",
  ID3: "thirdInput",
};
const baseUrl = "https://campuslife-hd40.onrender.com/api/";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignIn() {
  const [state, dispatch] = useStateValue();
  const [focusedInput, setFocusedInput] = useState(undefined);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to null
  const [token, setToken] = useState();

  const handleValueChange = function (text, property) {
    setFormData(function (prevData) {
      return {
        ...prevData,
        [property]: text,
      };
    });
  };

  const handleContinue = async () => {
    if (!formData.email || formData.email === "" || !emailRegex.test(formData.email)) {
      showError("Please enter a valid Email", setModalVisible, setErrorText, modalVisible);
      return "Email invalid";
    }
    if (!formData.password || formData.password === "" || formData.password.length < 8) {
      showError("Please enter a valid password greater than 8 characters", setModalVisible, setErrorText, modalVisible);
      return "Password invalid";
    }
    setButtonDisabled(true);
    try {
      const response = await axios.post(`${baseUrl}/login`, formData);

      await storeToken(JSON.stringify(response.data.token));
      await setLoginState(JSON.stringify(true));
      await setButtonDisabled(false);
      router.replace("/tabs/home");
    } catch (error) {
      setButtonDisabled(false);
      showError(error.response.data.message, setModalVisible, setErrorText, modalVisible);
      return "Duplicate email";
    }
  };

  return (
    <View style={{ ...authStyles.container, marginTop: StatusBar.currentHeight }}>
      <ErrorModal modalVisible={modalVisible} setModalVisible={setModalVisible} errorText={errorText} />
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ ...authStyles.title, color: hue.primary }}>Welcome Back!</Text>
        <Text style={{ ...authStyles.subtitle, color: hue.textLight }}>Please enter your login details below!</Text>
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
            defaultValue={formData.email}
            onChangeText={(text) => handleValueChange(text, "email")}
          ></TextInput>
        </View>

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
            defaultValue={formData.password}
            onChangeText={(text) => handleValueChange(text, "password")}
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
            onPress={() => router.push("/forgot-password")}
            style={{
              marginLeft: 8,
              color: hue.secondary,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Forgot password?
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
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isButtonDisabled ? "Loading......." : "Login"}</Text>
        </Pressable>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ flex: 1, backgroundColor: hue.bgColorLight, height: 1 }}></View>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 16,
              fontWeight: "600",
              color: hue.primaryLight,
            }}
          >
            Or continue with
          </Text>
          <View style={{ flex: 1, backgroundColor: hue.bgColorLight, height: 1 }}></View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={authStyles.brandsIcon}>
            <Pressable
              android_ripple={{
                color: "#E5E5E540",
                borderless: false,
                radius: 400,
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                height: "100%",
                paddingHorizontal: 8,
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/google.png")} />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 8,
                  color: hue.textLight,
                  fontWeight: "600",
                }}
              >
                Google
              </Text>
            </Pressable>
          </View>
          <View style={{ ...authStyles.brandsIcon, width: 42 }}>
            <Pressable
              android_ripple={{
                color: "#E5E5E540",
                borderless: false,
                radius: 400,
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                height: "100%",
                paddingHorizontal: 8,
                paddingHorizontal: 0,
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/facebook.png")} />
            </Pressable>
          </View>
          <View style={{ ...authStyles.brandsIcon, width: 42 }}>
            <Pressable
              android_ripple={{
                color: "#E5E5E540",
                borderless: false,
                radius: 400,
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                height: "100%",
                paddingHorizontal: 8,
                paddingHorizontal: 0,
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/x.png")} />
            </Pressable>
          </View>
          <View style={{ ...authStyles.brandsIcon, width: 42 }}>
            <Pressable
              android_ripple={{
                color: "#E5E5E540",
                borderless: false,
                radius: 400,
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                height: "100%",
                paddingHorizontal: 8,
                paddingHorizontal: 0,
                justifyContent: "center",
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/apple.png")} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={authStyles.bottomText} onPress={() => router.push("/sign-up")}>
            Don't have account with us?{" "}
            <Text
              style={{
                ...authStyles.bottomText,
                marginLeft: 8,
                color: hue.secondary,
              }}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
