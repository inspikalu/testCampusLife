import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LocationIcon from "/assets/icons/cl_location.svg";
import HeartIcon from "/assets/icons/cl_heart.svg";
import { useEffect, useState } from "react";
import PlaceholderImage from "react-native-image-placeholder";
import { router } from "expo-router";
import axios from "axios";

const baseUrl = "https://campuslife-hd40.onrender.com/api";

export default function LodgeCard({ photo, name, location, price, id, token, isLiked = false, showLikedBtn = true }) {
  const handleAddToWishList = async function () {
    console.log("Added to wishlist");
    console.log(token);
    try {
      const response = await axios.patch(`${baseUrl}/wishlist/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromWishList = async function () {
    console.log("Removed from wishlist");
    try {
      const response = await axios.delete(`${baseUrl}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLiked(!liked);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => setLiked(isLiked), [isLiked]);
  const handleShowDetails = function () {
    id
      ? router.push({
          pathname: `/tabs/home/${id}`,
          params: id,
        })
      : alert("Error");
  };
  return (
    <View style={lodgeCardStyles.card}>
      <View style={{ position: "relative" }}>
        {showLikedBtn && (
          <TouchableOpacity
            onPress={() => {
              console.log(id);
              liked ? handleRemoveFromWishList() : handleAddToWishList();
            }}
            style={lodgeCardStyles.likeButton}
          >
            <HeartIcon fill={liked ? "red" : "#ffffff30"} style={{}} stroke={liked ? "" : "#222222"} />
          </TouchableOpacity>
        )}
        <Image style={{ ...lodgeCardStyles.cardImage }} source={{ uri: photo }} resizeMode="stretch" />
      </View>
      <View style={lodgeCardStyles.cardBody}>
        <View style={{ gap: 0 }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <LocationIcon stroke={"black"} />
            <Text style={{ fontWeight: "400", fontSize: 16 }}>{location}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>&#x20A6;{price}</Text>
          </View>
        </View>

        <Pressable android_ripple={{ color: "#ffffff30", borderless: false, radius: 400 }} style={lodgeCardStyles.cardButton}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }} onPress={handleShowDetails}>
            Details
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    aspectRatio: "1/1",
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
});

// <PlaceholderImage
//   placeholderSource={require("../assets/images/placeholder.jpg")}
//   source={{ uri: photo }}
//   style={{ width: 40, aspectRatio: "1/1", objectFit: "cover" }}
// />;
