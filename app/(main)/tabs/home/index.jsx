import { Button, ButtonGroup, Divider } from "@rneui/themed";
import {
  RefreshControl,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { hue } from "../../../../constants";
import LodgeCard from "components/LodgeCard";
import SearchIcon from "/assets/icons/cl_search.svg";
import CancelIcon from "/assets/icons/cl_cancel.svg";
import TickIcon from "/assets/icons/cl_tick.svg";
import { useCallback, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Thumb from "components/slider/Thumb";
import Rail from "components/slider/Rail";
import RailSelected from "components/slider/RailSelected";
import Label from "components/slider/Label";
import Notch from "components/slider/Notch";
import { formatNumber } from "../../../../utils/formatNumber";
import axios from "axios";
import { getToken } from "utils/tokenHandler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const baseUrl = "https://campuslife-hd40.onrender.com/api";

const lodges = [
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-3.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-4.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-5.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-6.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/cl_lodge-photo-2.jpeg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/cl_lodge-photo-1.jpeg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-2.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-3.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-4.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-5.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-6.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-6.jpg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/cl_lodge-photo-2.jpeg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/cl_lodge-photo-1.jpeg") },
  { name: "Christiana Lodge", location: "Eziobodo", price: "120K", photoUrl: require("../../../../assets/images/lodge-2.jpg") },
];

function SearchBar({ setFilterOpen }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15, padding: 20, paddingBottom: 10 }}>
      <View>
        <Image source={require("../../../../assets/logo.png")} />
      </View>
      <TouchableOpacity
        onPress={() => setFilterOpen(true)}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderWidth: 1,
          borderColor: hue.primaryLight,
          borderRadius: 40,
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
      >
        <SearchIcon width={28} />
        <Divider orientation="vertical" width={1} />
        <View style={{ flex: 1 }}>
          <TextInput style={{ fontSize: 16, borderWidth: 0 }} placeholder="What is your spec?" placeholderTextColor={hue.textLight} />
        </View>
        <Image source={require("../../../../assets/filter.png")} />
      </TouchableOpacity>
      <View>
        <Image source={require("../../../../assets/profile.png")} />
      </View>
    </View>
  );
}

function ModalWrapper({ children, isOpen, setIsOpen, ...modalProps }) {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen} onRequestClose={() => setIsOpen(false)} {...modalProps}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#aaaaaa",
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

function FilterModal({ filterOpen, setFilterOpen, scrollEnabled, setScrollEnabled, token, setLodgeData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [town, setTown] = useState("");
  const [waterRating, setwaterRating] = useState("");
  const [availability, setAvailability] = useState("");
  const [sliderValues, setSliderValues] = useState([75000, 450000]);

  const handleQuerySend = async function () {
    const params = {};
    sliderValues[0] !== undefined ? (params.minPrice = sliderValues[0]) : params;
    sliderValues[1] !== undefined ? (params.maxPrice = sliderValues[1]) : params;
    town !== "" ? (params.town = town) : params;
    availability !== "" ? (params.availability = availability) : params;
    waterRating !== "" ? (params.water_rating = Number(waterRating)) : params;
    try {
      const response = await axios.get(`${baseUrl}/lodges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      console.log(response.data);
      const pushingParams = {
        id: response.data.id,
        message: response.data.message,
        token: token,
      };
      router.push({
        pathname: "/tabs/home/filter-result",
        params: pushingParams,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleValueChange = function (value) {
    setSliderValues(value);
    console.log(value);
  };

  return (
    <ModalWrapper isOpen={filterOpen} setIsOpen={setFilterOpen}>
      <View style={filterModalStyles.modalView}>
        <View style={{ position: "relative", alignItems: "center", padding: 25 }}>
          <TouchableOpacity onPress={() => setFilterOpen(false)} style={{ position: "absolute", top: 25, left: 25, padding: 5 }}>
            <CancelIcon width={16} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center" }}>Filters</Text>
        </View>
        <Divider style={{ width: "100%" }} />

        <ScrollView scrollEnabled={scrollEnabled} style={{ flex: 1 }}>
          <View style={{ padding: 25, gap: 10 }}>
            <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>Lodge Type</Text>

            <ButtonGroup
              buttons={["Self con", "1 Bedroom", "2 Bedroom"]}
              selectedIndex={selectedIndex}
              onPress={(value) => {
                setSelectedIndex(value);
              }}
              textStyle={{ fontWeight: "700" }}
              containerStyle={{ width: "100%", marginHorizontal: 0, borderRadius: 20 }}
            />
          </View>
          <Divider style={{ width: "100%" }} />

          <View style={{ padding: 25, gap: 10, alignItems: "center" }}>
            <MultiSlider
              values={sliderValues}
              sliderLength={300}
              onValuesChange={handleValueChange}
              min={0}
              max={500000}
              step={1}
              allowOverlap={false}
              snapped
              trackStyle={{ backgroundColor: hue.primaryLight }}
              selectedStyle={{ backgroundColor: hue.primary }}
              customMarker={() => <Thumb name="high" />}
            />
            <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ minWidth: 122, padding: 8, gap: 3, borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 15 }}>
                <Text style={{ textAlign: "left", fontSize: 14, fontWeight: "400" }}>Minimum</Text>
                <Text style={{ textAlign: "left", fontSize: 16, fontWeight: "700" }}>₦ {formatNumber(sliderValues[0])}</Text>
              </View>
              <View style={{ minWidth: 122, padding: 8, gap: 3, borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 15 }}>
                <Text style={{ display: "flex", textAlign: "left", fontSize: 14, fontWeight: "400" }}>Maximum</Text>
                <Text style={{ display: "flex", textAlign: "left", fontSize: 16, fontWeight: "700" }}>₦ {formatNumber(sliderValues[1])}</Text>
              </View>
            </View>
          </View>
          <Divider style={{ width: "100%" }} />

          <View style={{ paddingHorizontal: 25, paddingVertical: 30, gap: 10 }}>
            <View style={{ padding: 15, gap: 10, borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 15 }}>
              <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>Town</Text>

              <View style={{ borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 20 }}>
                <Picker selectedValue={town} onValueChange={(itemValue, itemIndex) => setTown(itemValue)}>
                  <Picker.Item label="Any" value="" />
                  <Picker.Item label="Eziobodo" value="Eziobodo" />
                  <Picker.Item label="Umuchima" value="Umuchima" />
                  <Picker.Item label="Ihiagwa" value="Ihiagwa" />
                </Picker>
              </View>
            </View>

            <View style={{ padding: 15, gap: 10, borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 15 }}>
              <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>Water Rating</Text>

              <View style={{ borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 20 }}>
                <Picker selectedValue={waterRating} onValueChange={(itemValue, itemIndex) => setwaterRating(itemValue)}>
                  <Picker.Item label="Any" value="" />
                  <Picker.Item label="Less than 2 days a week" value="1" />
                  <Picker.Item label="More than 2, less than 4 days/w" value="2" />
                  <Picker.Item label="At least 4 days a week" value="3" />
                  <Picker.Item label="More than 4 but not everyday" value="4" />
                  <Picker.Item label="Everyday" value="5" />
                </Picker>
              </View>
            </View>

            <View style={{ padding: 15, gap: 10, borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 15 }}>
              <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "600" }}>Availability</Text>

              <View style={{ borderWidth: 1, borderColor: hue.primaryLight, borderRadius: 20 }}>
                <Picker selectedValue={availability} onValueChange={(itemValue, itemIndex) => setAvailability(itemValue)}>
                  <Picker.Item label="Any" value="" />
                  <Picker.Item label="Available" value="available" />
                  <Picker.Item label="Unavailable" value="unavailable" />
                  <Picker.Item label="Not sure" value="not sure" />
                </Picker>
              </View>
            </View>
          </View>
          <Divider width={1} style={{ width: "100%" }} />

          <View style={{ alignItems: "flex-end", padding: 25, gap: 10 }}>
            <Button buttonStyle={{ backgroundColor: hue.secondary, borderRadius: 10 }} onPress={handleQuerySend}>
              <TickIcon style={{ marginRight: 8 }} /> OK
            </Button>
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
}

const filterModalStyles = StyleSheet.create({
  modalView: {
    width: "100%",
    height: "97%", // You can adjust this value as needed
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "flex-start",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const Item = ({ name }) => (
  <Value>
    <Text>{name}</Text>
  </Value>
);

export default function Home() {
  const [token, setToken] = useState(null);
  const [lodgeData, setLodgeData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(function () {
    getToken("token").then((data) => setToken(data));
  }, []);

  const getAllLodges = async function () {
    try {
      const response = await axios.get(`${baseUrl}/lodges`, {
        headers: {
          Authorization: `Bearer ${token}`,
          home: "yes",
        },
      });
      return response.data;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(
    function () {
      if (token) {
        const body = getAllLodges().then((data) => setLodgeData(data));
      }
    },
    [token]
  );

  const onRefresh = () => {
    setRefreshing(true);
    getAllLodges().then((data) => {
      setRefreshing(false);
      setLodgeData(data);
    });
  };

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView scrollEnabled={scrollEnabled} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <SearchBar setFilterOpen={setModalVisible} />
        <Divider width={1} />

        <View style={styles.main}>
          {/* {lodges.map((item, index) => (
            <LodgeCard key={index} name={item.name} location={item.location} photo={item.photoUrl} price={item.price} />
          ))} */}
          {lodgeData ? (
            <View style={{ width: "100%" }}>
              <FlatList
                data={lodgeData.lodges}
                renderItem={({ item }) => <LodgeCard name={item.name} location={"Futo"} photo={item.photo} price={item.price} id={item._id} token={token} />}
                keyExtractor={(item) => item._id}
                style={{ width: "100%" }}
              />
            </View>
          ) : (
            <View style={{ height: Dimensions.get("window").height * 0.8, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={`${hue.secondary}`} />
            </View>
          )}
        </View>
      </ScrollView>
      <FilterModal
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
        filterOpen={modalVisible}
        setFilterOpen={setModalVisible}
        token={token}
        setLodgeData={setLodgeData}
      />
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
