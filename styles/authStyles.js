import { StyleSheet } from "react-native";
import { hue } from "../constants";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,

    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    width: "95%",
    fontWeight: "400",

    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",

    marginTop: 20,
  },
  inputTextColor: {
    marginLeft: 12,
    fontSize: 16,
    height: "100%",
    flex: 1,

    fontWeight: "600",
  },
  checkbox: {
    borderRadius: 6,

    borderColor: "#FF9000",
  },
  codeInputContainer: {
    width: "100%",
    // height: 52,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },
  codeInputBox: {
    padding: 10,
    height: 50,
    flex: 1,
    textAlign: "center",
    aspectRatio: "1 / 1",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: hue.primaryLight,
    fontSize: 28,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    height: 54,
    backgroundColor: "#FF9000",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    elevation: 8,
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  brandsIcon: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 42,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    width: 120,
    borderRadius: 50,
    overflow: "hidden",
  },
  bottomText: {
    fontSize: 18,
    fontWeight: "600",
    color: hue.textLight,
  },
});

export default authStyles;
