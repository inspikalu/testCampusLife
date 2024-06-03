import { View, Text, TouchableOpacity, PixelRatio, Image } from "react-native";
import { hue } from "../constants";
import { useStateValue } from "../state-provider";
import { useEffect } from "react";

export default function BottomTabBar({ state, descriptors, navigation }) {
  const { _state, _ } = useStateValue();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: hue.bgColorLight,
        paddingTop: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.6}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 38,
                width: 38,
                backgroundColor: isFocused ? hue.secondaryLight : hue.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              {label === "home" && (
                <View style={{ width: 24, height: 24 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 1 : 0,
                      position: "absolute",
                    }}
                    source={require("../assets/icons/homeActive.png")}
                  />
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 0 : 1,
                    }}
                    source={require("../assets/icons/homeInactive.png")}
                  />
                </View>
              )}

              {label === "wishlist" && (
                <View style={{ width: 24, height: 24 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 1 : 0,
                      position: "absolute",
                    }}
                    source={require("../assets/icons/wishlistactive.png")}
                  />
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 0 : 1,
                    }}
                    source={require("../assets/icons/wishlistInactive.png")}
                  />
                </View>
              )}

              {label === "notification" && (
                <View style={{ width: 24, height: 24 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 1 : 0,
                      position: "absolute",
                    }}
                    source={require("../assets/icons/notificationactive.png")}
                  />
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 0 : 1,
                    }}
                    source={require("../assets/icons/notificationInactive.png")}
                  />
                </View>
              )}

              {label === "settings" && (
                <View style={{ width: 24, height: 24 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 1 : 0,
                      position: "absolute",
                    }}
                    source={require("../assets/icons/settingsActive.png")}
                  />
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 0 : 1,
                    }}
                    source={require("../assets/icons/settingsInactive.png")}
                  />
                </View>
              )}

              {label === "message" && (
                <View style={{ width: 24, height: 24 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 1 : 0,
                      position: "absolute",
                    }}
                    source={require("../assets/icons/messageActive.png")}
                  />
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: isFocused ? 0 : 1,
                    }}
                    source={require("../assets/icons/messageInactive.png")}
                  />
                </View>
              )}
            </View>

            <Text
              style={{
                color: isFocused ? hue.primary : hue.textLight,
                fontSize: 10,
                marginTop: 2,
                fontWeight: "600",
              }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
