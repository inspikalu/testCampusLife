import { View, Text, StyleSheet, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { hue } from "../../../../constants";
import ScreenHeader from "components/ScreenHeader";
import { useController, useForm } from "react-hook-form";
import { AirbnbRating } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { getToken } from "utils/tokenHandler";
import * as FileSystem from "expo-file-system";

const baseUrl = "https://campuslife-hd40.onrender.com/api";

function Label({ children }) {
  return (
    <View>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

function CancelPhoto({ onClick = () => {} }) {
  return (
    <TouchableOpacity onPress={() => onClick()} style={styles.cancelbtn}>
      <Text style={styles.cancelBtnText}>X</Text>
    </TouchableOpacity>
  );
}

export default function SuggestProperty() {
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    lodgeName: "",
    lodgePrice: "",
    location: "",
    caretakerNo: "",
    availability: "",
    waterRating: 0,
    messageToUs: "",
    photo: null,
  });
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [token, setToken] = useState(null);
  React.useEffect(function () {
    getToken("token").then((data) => setToken(data));
  }, []);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setPhotos([...photos, ...result.assets.map((asset) => asset.uri)]);
      // setPhotos(result.assets[0]);
      handleValueChange(result.assets[0], "photo");
      console.log(formData.photo);
    }
  };

  const removeImage = () => {
    handleValueChange(null, "photo");
  };

  const validateForm = function () {
    let errors = [];
    if (!formData.lodgeName) {
      errors.push("Lodge Name is required");
    }
    if (!formData.lodgePrice) {
      errors.push("Lodge Price is required");
    }
    if (!formData.location) {
      errors.push("Location is required");
    }
    if (!formData.caretakerNo) {
      errors.push("Care Taker Number is required");
    }
    if (!formData.availability) {
      errors.push("Care Taker Number is required");
    }
    if (!formData.messageToUs) {
      errors.push("Message is required");
    }
    if (!formData.availability) {
      errors.push("Please Fill out availability field");
    }
    console.log(formData.waterRating, "Water rating");
    if (formData.waterRating === "") {
      errors.push("Please Give the water rating");
    }
    if (!photos) {
      errors.push("Please Upload a photo");
    }
    setHasErrors(errors.length > 0);
    setErrorMessage(errors);
    return errors.length === 0;
  };

  const handleSendForm = async function () {
    if (validateForm()) {
      const fileObject = {
        uri: formData.photo.uri, // The local URI from expo-image-picker
        type: "image/jpg",
        name: "lodgeName.jpg", // Optional: Set a filename for the server
      };
      console.log("Photo", formData.photo);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.lodgeName);
      formDataToSend.append("town", formData.location);
      formDataToSend.append("price", formData.lodgePrice);
      formDataToSend.append("note", formData.messageToUs);
      formDataToSend.append("photo", fileObject);
      formDataToSend.append("water_rating", formData.waterRating);
      formDataToSend.append("availability", formData.availability);
      formDataToSend.append("caretakerNo", formData.caretakerNo);

      console.log(formDataToSend, "Form Data to send");
      try {
        setIsDisabled(true);
        const response = await axios.post(`${baseUrl}/lodges`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        console.log("API response:", response.data);
        alert(response.data.message);
        setIsDisabled(false);
      } catch (error) {
        setIsDisabled(false);
        alert(error.response.data.message);
      }
    }
  };

  const handleValueChange = function (value, property) {
    setFormData((prevData) => {
      let newFormData = {
        ...prevData,
        [property]: value,
      };
      return newFormData;
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScreenHeader pageTitle="Suggest A Property" />

      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Hello,</Text>
        </View>

        <View>
          <Text style={styles.paragraph}>
            You can suggest a property not currently listed on Campuslife. Please, ensure that the data you provide are accurate.
          </Text>
        </View>

        <View>
          <Label>Lodge Name</Label>
          <TextInput style={styles.textInput} value={formData.lodgeName} onChangeText={(text) => handleValueChange(text, "lodgeName")}></TextInput>
        </View>

        <View>
          <Label>Lodge Price</Label>
          <TextInput style={styles.textInput} value={formData.lodgePrice} onChangeText={(text) => handleValueChange(text, "lodgePrice")}></TextInput>
        </View>

        <View>
          <Label>Location</Label>
          <TextInput style={styles.textInput} value={formData.location} onChangeText={(text) => handleValueChange(text, "location")}></TextInput>
        </View>

        <View>
          <Label>Caretaker's number</Label>
          <TextInput
            style={styles.textInput}
            value={formData.caretakerNo}
            onChangeText={(text) => handleValueChange(text, "caretakerNo")}
            inputMode="numeric"
          ></TextInput>
        </View>

        <View>
          <Label>Availability</Label>
          <Picker
            style={styles.textInput}
            selectedValue={formData.availability}
            onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue, "availability")}
          >
            <Picker.Item label="-----" value="" />
            <Picker.Item label="Available" value="available" />
            <Picker.Item label="Unavailable" value="unavailable" />
            <Picker.Item label="Not sure" value="not sure" />
          </Picker>
        </View>

        <View>
          <Label>Water Rating</Label>
          <AirbnbRating
            count={5}
            reviews={["Less than 2 days a week", "More than 2, less than 4 days/w", "At least 4 days a week", "More than 4 but not everyday", "Everyday"]}
            defaultRating={formData.waterRating}
            size={20}
            ratingContainerStyle={{
              alignItems: "flex-start",
            }}
            selectedColor={hue.secondary}
            reviewColor={hue.secondary}
            reviewSize={15}
            onFinishRating={(value) => handleValueChange(value, "waterRating")}
          />
        </View>

        <View>
          <Label>Write to us</Label>
          <TextInput
            style={styles.textInput}
            value={formData.messageToUs}
            multiline={true}
            numberOfLines={6}
            onChangeText={(text) => handleValueChange(text, "messageToUs")}
          ></TextInput>
        </View>

        <View style={{ marginBottom: 40 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Label>Upload lodge photo({formData.photo ? "1" : "0"})</Label>
            <Pressable onPress={pickImage} style={styles.uploadButton}>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "400" }}>Upload photos</Text>
            </Pressable>
          </View>
          {formData.photo && (
            <View style={styles.photosbox}>
              <View style={styles.photo}>
                <CancelPhoto onClick={() => removeImage()} />
                <Image source={{ uri: formData.photo.uri }} style={{ flex: 1 }} />
              </View>
            </View>
          )}
        </View>

        <Pressable android_ripple={{ color: "#ffffff30", borderless: false, radius: 400 }} style={styles.button} onPress={handleSendForm} disabled={isDisabled}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>{isDisabled ? "Loading...." : "Continue"}</Text>
        </Pressable>
        {hasErrors && <Text style={{ color: "red", marginBottom: 40 }}>{errorMessage.join("\n")}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 24,
    paddingHorizontal: 12,
    paddingBottom: 92,
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: hue.primary,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "300",
    color: hue.textLight,
  },
  label: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
    fontWeight: "400",
    color: hue.primary,
  },
  textInput: {
    fontSize: 18,
    lineHeight: 24,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: "#eeeeee",
  },
  messagebox: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#eeeeee",
    textAlignVertical: "top",
  },
  photosbox: {
    borderRadius: 16,
    padding: 10,
    // minHeight: 200,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  photo: {
    width: 100,
    aspectRatio: 1,
    margin: "1.66%",
    position: "relative",
  },
  cancelbtn: {
    width: 20,
    aspectRatio: 1,
    zIndex: 10,
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: hue.primary,
  },
  cancelBtnText: {
    color: hue.bgColor,
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    height: 54,
    backgroundColor: "#FF9000",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  uploadButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FF9000",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#222222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
});
