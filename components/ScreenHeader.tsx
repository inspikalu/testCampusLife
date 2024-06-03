import { StyleSheet, Text, View } from "react-native";
import { hue } from "../constants";
import { StatusBar } from "expo-status-bar";

export default function ScreenHeader({ pageTitle = "", statusBarBg = hue.bgColor }) {
  return (
    <View style={{ ...headerStyles.container }}>
      <StatusBar backgroundColor={statusBarBg} />
      <Text accessibilityRole="header" style={{ ...headerStyles.pageTitle }}>
        {pageTitle}
      </Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: hue.bgColor,
    paddingVertical: 10,
    borderBottomColor: hue.primaryLight,
    borderBottomWidth: 1,
  },
  pageTitle: {
    color: hue.secondary,
    fontSize: 24,
    fontWeight: "500",
  },
});
