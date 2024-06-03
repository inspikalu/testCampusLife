import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, PixelRatio, Image, TextInput, Pressable, Modal, Alert } from "react-native";
import { hue } from "../constants";
import Checkbox from "expo-checkbox";
import { useStateValue } from "../state-provider";
import { actionTypes } from "../reducer";
import { router } from "expo-router";
import authStyles from "../styles/authStyles";
import axios from "axios";
import showError from "utils/showError";
import { setLoginState, storeToken, getLoginState } from "utils/tokenHandler";
import ErrorModal from "components/Modal";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const textInputIDs = {
  ID1: "firstInput",
  ID2: "secondInput",
  ID3: "thirdInput",
};
const baseUrl = "https://campuslife-hd40.onrender.com/api/";
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUp() {
  const [state, dispatch] = useStateValue();
  const [isChecked, setChecked] = useState(false);
  const [focusedInput, setFocusedInput] = useState(undefined);
  const [errorText, setErrorText] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await getLoginState();
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleValueChange = function (text, property) {
    setFormData(function (prevData) {
      return {
        ...prevData,
        [property]: text,
      };
    });
  };

  const handleContinue = async () => {
    if (!formData.name || formData.name === "") {
      showError("Please enter a valid username", setModalVisible, setErrorText, modalVisible);
      return "Full Name invalid";
    }
    if (!formData.email || formData.email === "" || !emailRegex.test(formData.email)) {
      showError("Please enter a valid Email", setModalVisible, setErrorText, modalVisible);
      return "Email invalid";
    }
    if (!formData.password || formData.password === "" || formData.password.length < 8) {
      showError("Please enter a valid password greater than 8 characters", setModalVisible, setErrorText, modalVisible);
      return "Password invalid";
    }
    if (!isChecked) {
      showError("Please accept our terms and conditions", setModalVisible, setErrorText, modalVisible);
      return "Terms not agreed to";
    }
    setButtonDisabled(true);
    try {
      const response = await axios.post(`${baseUrl}/signup`, formData);
      storeToken(response.data.token);
      setLoginState(JSON.stringify(true));
      setButtonDisabled(false);
      router.replace("/tabs/home");
    } catch (error) {
      setButtonDisabled(false);
      showError(error.response.data.message, setModalVisible, setErrorText, modalVisible);
      return "Duplicate email";
    }
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  if (!isLoggedIn) {
    return (
      <View style={{ ...authStyles.container, marginTop: StatusBar.currentHeight }}>
        {/* Error Modal */}
        <ErrorModal modalVisible={modalVisible} setModalVisible={setModalVisible} errorText={errorText} />
        {/* Error Modal */}
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{ ...authStyles.title, color: hue.primary }}>Welcome,</Text>
          <Text style={{ ...authStyles.subtitle, color: hue.textLight }}>Please enter your details to create your account</Text>
        </View>

        <View style={{ marginTop: 40, justifyContent: "space-between" }}>
          <View
            style={{
              ...authStyles.inputContainer,
              borderColor: focusedInput === textInputIDs.ID1 ? hue.secondary : hue.primaryLight,
            }}
          >
            <Image
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(8),
                height: PixelRatio.getPixelSizeForLayoutSize(8),
              }}
              source={require("../assets/icons/profile.png")}
            />
            <TextInput
              placeholderTextColor={hue.textLight}
              style={{ ...authStyles.inputTextColor, color: hue.primary }}
              cursorColor={hue.secondary}
              onFocus={() => setFocusedInput(textInputIDs.ID1)}
              placeholder="Full Name"
              selectionColor={hue.secondaryLight}
              defaultValue={formData.name}
              onChangeText={(text) => handleValueChange(text, "name")}
            ></TextInput>
          </View>

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
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Checkbox style={authStyles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? hue.secondary : undefined} />
            <Text
              style={{
                marginLeft: 8,
                color: hue.secondary,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Accept terms & Condition
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
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isButtonDisabled ? "Loading........" : "Continue"}</Text>
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
            <Text style={authStyles.bottomText} onPress={handleSignIn}>
              Already have account with us?{" "}
              <Text
                style={{
                  ...authStyles.bottomText,
                  marginLeft: 8,
                  color: hue.secondary,
                }}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    router.replace("/tabs/home");
  }
}
