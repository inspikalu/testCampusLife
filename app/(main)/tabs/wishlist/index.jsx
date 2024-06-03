import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import React from "react";
import ScreenHeader from "components/ScreenHeader";
import LodgeCard from "components/LodgeCard";
import { getToken } from "utils/tokenHandler";
import axios from "axios";
import { hue } from "constants";

const baseUrl = "https://campuslife-hd40.onrender.com/api";
export default function Wishlist() {
  const [token, setToken] = React.useState(null);
  const [lodges, setLodges] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getWishList = async function () {
    try {
      const response = await axios.get(`${baseUrl}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getWishList().then((data) => {
      setRefreshing(false);
      setLodges(data.lodges);
    });
  };

  React.useEffect(async () => {
    await getToken("token").then((data) => setToken(data));
  }, []);

  React.useEffect(
    function () {
      if (token) {
        getWishList().then((data) => {
          console.log(data.lodges, "data");
          setLodges(data.lodges);
        });
      }
    },
    [token]
  );

  console.log(lodges, "lodges");

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader pageTitle={"Wishlist"} />

      {lodges ? (
        <ScrollView scrollEnabled={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.main}>
            {lodges.map((item, index) => (
              <LodgeCard key={index} name={item.name} location={item.town} photo={item.photo} price={item.price} id={item._id} token={token} isLiked />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{ height: Dimensions.get("window").height * 0.8, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={`${hue.secondary}`} />
          Hello
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    gap: 24,
    padding: 24,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {},
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#aaaaaa",
  },
  modalView: {
    width: "100%",
    height: "80%", // You can adjust this value as needed
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
