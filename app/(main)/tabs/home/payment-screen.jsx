import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen = () => {
  const data = useLocalSearchParams();
  //   const [params, setParams] = React.useState(data);
  console.log(data, "params");
  return (
    // <WebView
    //   source={{ uri: params.authorization_url }} // Use the authorization_url from the response
    //   style={{ flex: 1 }}
    // />
    <SafeAreaView>
      <View>
        <Text>Payment screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
