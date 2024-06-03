import { StateProvider } from "../state-provider";
import reducer, { initialState } from "../reducer";
import { Slot } from "expo-router";
import { View } from "react-native";
import { hue } from "../constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.hideAsync();
// SplashScreen.preventAutoHideAsync();

export default function Root() {
  // const [fontsLoaded] = useFonts({
  //   Inter: {}, // No path needed, expo-google-fonts handles loading
  // });
  // console.log("Fonts loaded:", fontsLoaded);
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <View style={{ backgroundColor: hue.bgColor, flex: 1 }}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Slot />
      </StateProvider>
    </View>
  );
}

// import { StateProvider } from "../state-provider";
// import reducer, { initialState } from "../reducer";
// import { Slot } from "expo-router";
// import { View } from "react-native";
// import { hue } from "../constants";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { useCallback } from "react";

// SplashScreen.preventAutoHideAsync();
// export default function Root() {
//   const [fontsLoaded] = useFonts({
//     Inter: require("../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <View style={{ backgroundColor: hue.bgColor, flex: 1 }} onLayout={onLayoutRootView}>
//       <StateProvider initialState={initialState} reducer={reducer}>
//         <Slot />
//       </StateProvider>
//     </View>
//   );
// }
