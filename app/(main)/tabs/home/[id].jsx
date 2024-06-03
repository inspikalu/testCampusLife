import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "utils/tokenHandler";
import LocationIcon from "/assets/icons/cl_location.svg";
import HeartIcon from "/assets/icons/cl_heart.svg";
import AddIcon from "/assets/icons/cl_add.svg";
import { AirbnbRating } from "@rneui/base";
import { Divider } from "@rneui/base";
import { hue } from "constants";
import { useNavigation } from "expo-router";
import ScreenHeader from "components/ScreenHeader";

const baseUrl = "https://campuslife-hd40.onrender.com/api";
const Details = function () {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);
  const [token, setToken] = useState(null);
  const [lodgeData, setLodgeData] = useState(null);
  const [liked, setLiked] = useState(false);

  React.useEffect(function () {
    getToken("token").then((data) => setToken(data));
  }, []);
  const getLodgeById = async function (id) {
    try {
      //   const response = await axios.get(`${baseUrl}lodge/${id}`);
      const response = await axios.get(`${baseUrl}/lodge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          home: "yes",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      alert(error);
    }
  };
  const id = useLocalSearchParams().id;
  console.log(id);

  useEffect(
    function () {
      if (token) {
        getLodgeById(id).then((data) => setLodgeData(data));
      }
    },
    [token]
  );
  console.log(lodgeData, "LodgeData");

  return !lodgeData ? (
    <SafeAreaView>
      <View style={{ height: Dimensions.get("window").height * 0.9, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={`${hue.secondary}`} />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <ScreenHeader pageTitle={"Details"} />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 36, fontWeight: "900", marginTop: 10 }}>Camico</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <LocationIcon stroke={"black"} />
            <Text style={{ fontWeight: "400", fontSize: 20 }}>Eziobodo</Text>
          </View>
          <View>
            <View
              style={{
                position: "relative",
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                marginVertical: 20,
              }}
            >
              <Image source={{ uri: lodgeData.lodge.photo }} style={{ width: "100%", aspectRatio: "1/1", borderRadius: 16 }} resizeMethod="resize" />
              <TouchableOpacity onPress={() => setLiked(!liked)} style={{ ...lodgeCardStyles.likeButton }}>
                <HeartIcon
                  fill={liked ? "red" : "#ffffff30"}
                  style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1, elevation: 3 }}
                  stroke={liked ? "" : "#222222"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  borderColor: "rgba(128, 128, 128, 0.5)",
                  borderWidth: 2,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderRadius: 25,
                }}
              >
                <AddIcon stroke={"black"} height={20} width={20} />
                <Text style={{ fontWeight: "400", fontSize: 20 }}>Update</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  borderColor: "rgba(128, 128, 128, 0.5)",
                  borderWidth: 2,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  borderRadius: 25,
                }}
              >
                <LocationIcon stroke={"black"} />
                <Text style={{ fontWeight: "400", fontSize: 20 }}>Show in maps</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 5,
                marginVertical: 10,
                padding: 10,
                borderColor: "rgba(128, 128, 128, 0.5)",
                borderWidth: 2,
                borderRadius: 5,
                paddingBottom: 40,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: 7,
                  paddingHorizontal: 10,
                  backgroundColor: "rgba(122,122,122,.6)",
                  borderRadius: 7,
                }}
              >
                <Text style={{ fontSize: 25 }}>Availability</Text>
                <Text style={{ fontSize: 20 }}>1 Room</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  backgroundColor: "rgba(122,122,122,.6)",
                  padding: 10,
                  paddingHorizontal: 10,
                  borderRadius: 7,
                }}
              >
                <Text style={{ fontSize: 25 }}>Water</Text>
                <AirbnbRating defaultRating={2} isDisabled={true} size={10} showRating={false} />
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", padding: 10, marginBottom: 20 }}>
              <View>
                {/* <PersonIcon /> */}
                <Image source={require("assets/profile.png")} style={{ width: 30, height: 30 }} />
              </View>
              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Caretakers Number</Text>
                <Text style={{ fontSize: 15 }}>Hello</Text>
              </View>
            </View>
          </View>
          <Divider width={1} />
          <Text style={{ marginVertical: 10, marginBottom: 80 }}>
            <Text style={{ fontSize: 20, fontWeight: "900" }}>Disclaimer:</Text> Campuslife does not take payments for rent on any property listed on this site.
            If you wish to make payment for this lodge or any lodge listed on this website, please contact the caretaker.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const lodgeCardStyles = StyleSheet.create({
  card: {
    width: "100%",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 2 },
  },
  cardImage: {
    borderRadius: 16,
    // width: 40,
    width: "100%",
    // height: "auto",
    aspectRatio: "auto",
    // alignItems: 'center',
  },
  cardBody: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
    padding: 9,
    backgroundColor: "#fff",
    // backgroundColor: "#ffffff30",
    aspectRatio: 1,
    borderRadius: 90,
    justifyContent: "center",
  },
  cardButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#FF9000",
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  shadowContainer: {
    // Shadow for iOS
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    // Elevation for Android (API Level 21+)
    elevation: 3,

    // Other styles for the container (optional)
  },
});

export default Details;

/**
 *  

        <View>
          
         
          <View>
            <View>
              <Text>Availability</Text>
              <Text>1 room</Text>
            </View>
            <View>
              <Text>Water</Text>
              <AirbnbRating count={5} defaultRating={2} isDisabled={true} />
            </View>
          </View>

          <View>
            <PersonIcon stroke={"black"} />
            <View>
              <Text>Care Taker</Text>
              {lodgeData.lodge.careTakerNo && <Text>{lodgeData.lodge.careTakerNo}</Text>}
            </View>
          </View>
        </View>
        <Divider width={1} />
 */
