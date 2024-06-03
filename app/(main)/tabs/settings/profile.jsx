import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { hue } from "../../../../constants";
import ScreenHeader from "components/ScreenHeader";

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader pageTitle="Profile" />

      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.cardTop}></View>
          <View style={styles.cardBottom}>
            <View style={styles.profileDetails}>
              <View style={styles.profileAvatar}>
                <Image style={{ flex: 1 }} source={require("/assets/male-headshot-1.png")} />
              </View>
              <Text style={styles.profileName}>Michael Ezechukwu</Text>
              <Text style={styles.profileEmail}>someone@gmail.com</Text>
            </View>
            <View style={styles.logoutWrapper}>
              <Text style={{ marginBottom: 14 }}>
                Status: <Text style={{ color: "green" }}>Logged in</Text>
              </Text>
              <Pressable android_ripple={{ color: "#ffffff30", borderless: false, radius: 400 }} style={styles.button}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: hue.primaryLight,
  },
  main: {
    width: "100%",
    maxWidth: 303,
    borderRadius: 20,
  },
  cardTop: {
    minHeight: 117,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: hue.secondary,
  },
  cardBottom: {
    minHeight: 317,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: hue.bgColor,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
  },
  profileDetails: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "400",
  },
  logoutWrapper: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: hue.bgColorLight,
    paddingVertical: 16,
    paddingHorizontal: 20,
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
  },
});
