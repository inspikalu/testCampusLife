import { hue } from "constants";
import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";


export default function MessageLayout() {
    return (
      <View style={{backgroundColor: hue.bgColor, marginTop: StatusBar.currentHeight, flex:1 }}>
        <Slot/>
      </View>
    )
  }