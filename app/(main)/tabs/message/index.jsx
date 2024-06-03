import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { hue } from "../../../../constants";
import ScreenHeader from "../../../../components/ScreenHeader";
import axios from "axios";
import { getToken } from "utils/tokenHandler";

const baseUrl = "https://campuslife-hd40.onrender.com/api/";
let cooldownTime = 2 * 60 * 1000;
export default function Message() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [isDisabled, setButtonDisabled] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  React.useEffect(function () {
    getToken("token").then((data) => setToken(data));
  }, []);

  const handleContinue = async () => {
    if (!message || message === "" || message.trim() === "") {
      alert("Enter a valid suggestion");
      return "Please enter a valid suggestion";
    }
    if (!sentMessage) {
      setButtonDisabled(true);
      try {
        setSentMessage(true);
        const data = { note: message };
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(`${baseUrl}/write`, data, { headers });
        alert(response.data.message);
        setButtonDisabled(false);
        setTimeout(() => {
          setSentMessage(false);
        }, cooldownTime);
      } catch (error) {
        setButtonDisabled(false);
        alert(error);
      }
    } else {
      alert("Wait another 2 minutes to send a message");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader pageTitle={"Message"} />

      <ScrollView style={styles.container}>
        <View style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24, padding: 12 }}>
          <Text style={styles.header}>Campuslife,</Text>
          <Text style={styles.paragraph}>
            We are committed to making life on campus easier for students. How can we make the app or any of our services better? You are welcome to make a
            contribution to this course.
          </Text>
          <View>
            <Text style={{ fontWeight: "normal", fontSize: 20, marginBottom: 18 }}>Write to us:</Text>
            <TextInput style={styles.messagebox} multiline={true} numberOfLines={6} value={message} onChangeText={(text) => setMessage(text)} />
          </View>
          <Pressable
            disabled={isDisabled}
            android_ripple={{ color: "#ffffff30", borderless: false, radius: 400 }}
            style={styles.button}
            onPress={handleContinue}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isDisabled ? "Loading...." : "Continue"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: hue.primary,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: hue.textLight,
  },
  messagebox: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#eeeeee",
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    height: 54,
    backgroundColor: "#FF9000",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    marginBottom: 30,
  },
});
