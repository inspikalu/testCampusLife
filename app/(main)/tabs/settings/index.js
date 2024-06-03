import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import ScreenHeader from "components/ScreenHeader";
import { hue } from "constants";
import ProfileIcon from "/assets/icons/cl_profile.svg";
import SuggestPropertyIcon from "/assets/icons/cl_suggest-property.svg";
import AppUpdateIcon from "/assets/icons/cl_app-update.svg";
import AboutUsIcon from "/assets/icons/cl_about-us.svg";
import ContactUsIcon from "/assets/icons/cl_contact-us.svg";
import PrivacyPolicyIcon from "/assets/icons/cl_privacy-policy.svg";
import TermsIcon from "/assets/icons/cl_terms-and-condition.svg";
import LogoutIcon from "/assets/icons/cl_logout.svg";
import ChevronRightIcon from "/assets/icons/cl_chevron-right.svg";
import { router } from "expo-router";
import { setLoginState } from "utils/tokenHandler";

function SettingItem({ icon = <></>, title = "Setting", action = () => {} }) {
  return (
    <Pressable
      onPress={() => typeof action == "function" && action()}
      android_ripple={{ color: hue.primaryLight, borderless: false, radius: 400 }}
      style={styles.listItem}
    >
      <View style={styles.listContent}>
        <View style={{ width: 32 }}>{icon}</View>
        <Text style={{ color: hue.primary, fontSize: 20 }}>{title}</Text>
      </View>
      <View>
        <ChevronRightIcon />
      </View>
    </Pressable>
  );
}

export default function Settings() {
  const settingsList = [
    { title: "Profile", icon: <ProfileIcon />, action: () => router.push("/tabs/settings/profile") },
    { title: "Suggest a Property", icon: <SuggestPropertyIcon />, action: () => router.push("/tabs/settings/suggest-property") },
    { title: "App Update", icon: <AppUpdateIcon /> },
    { title: "About Us", icon: <AboutUsIcon /> },
    { title: "Contact Us", icon: <ContactUsIcon /> },
    { title: "Privacy Policy", icon: <PrivacyPolicyIcon /> },
    { title: "Terms and Conditions", icon: <TermsIcon /> },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      action: () => {
        setLoginState(JSON.stringify(false));
        router.push("/");
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader pageTitle="Settings" />

      <View style={styles.container}>
        {settingsList.map((item, idx) => (
          <SettingItem title={item.title} icon={item.icon} action={item?.action} key={idx} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  listItem: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: hue.primaryLight,
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
});
