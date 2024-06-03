import { View, Text, ScrollView, Image, Button, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "components/ScreenHeader";
import { useEffect, useState } from "react";
import LodgeCard from "components/LodgeCard";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import TickSvg from "assets/icons/tick.svg";
import SearchIcon from "assets/icons/cl_search.svg";
import { hue } from "constants";
import axios from "axios";
import { WebView } from "react-native-webview";

const baseUrl = "https://campuslife-hd40.onrender.com/api";

export default function Result() {
  const [parms, setParams] = useState(useLocalSearchParams());
  const [initializeResponse, setInitializeResponse] = useState();
  const [hasSent, setHasSent] = useState(false);
  const [newFilteredLodges, setNewFilteredLodges] = useState(null);
  const [isGoingBack, setIsGoinBack] = useState(false);
  const handleInitializeTransaction = async function (amount) {
    if (parms.token || parms.id) {
      try {
        const response = await axios.post(`${baseUrl}/initialize`, undefined, {
          params: {
            id: parms.id,
            amount: amount,
          },
          headers: {
            Authorization: `Bearer ${parms.token}`,
          },
        });
        console.log(response.data);
        await setInitializeResponse(response.data);
        setHasSent(true);
        console.log(initializeResponse, "test");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleGoBack = async function () {
    console.log("I have Gone Back");
    try {
      setIsGoinBack(true);
      const response = await axios.get(`${baseUrl}/verify`, {
        headers: {
          Authorization: `Bearer ${parms.token}`,
        },
        params: {
          r: initializeResponse.reference,
        },
      });
      if (response.data.message === "Transaction success") {
        console.log(response.data.search, "response.data.search");
        console.log(response.data.search._id, "response.data.search id");
        const filterResponse = await axios.get(`${baseUrl}/lodges?id=${response.data.search._id}`, {
          headers: {
            Authorization: `Bearer ${parms.token}`,
          },
        });

        console.log(filterResponse.data.lodge, "Filter Response");

        await setNewFilteredLodges(filterResponse.data.lodge);

        setHasSent(false);
      } else {
        setHasSent(false);
        alert("Please Complete payment to view the lodge".toLocaleUpperCase());
      }
      setIsGoinBack(false);
    } catch (error) {
      setIsGoinBack(false);
      alert(error);
    }
  };
  console.log(newFilteredLodges, "New Filtered Lodges");

  if (hasSent) {
    return (
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 15, right: 20, backgroundColor: hue.secondary, padding: 10, zIndex: 3, borderRadius: 7 }}
          onPress={() => handleGoBack()}
        >
          <Text style={{ color: "#fff" }}>{isGoingBack ? "Loading...." : "Go Back"}</Text>
        </TouchableOpacity>
        <WebView source={{ uri: initializeResponse.authorization_url }} style={{ width: "100%", flex: 1, marginVertical: 30 }} />
      </SafeAreaView>
    );
  } else {
    if (parms) {
      return (
        <SafeAreaView>
          <ScreenHeader pageTitle="Campuslife" />
          <ScrollView>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: "900" }}>Filter Result</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "rgba(128, 128, 128, 0.5)",
                  padding: 8,
                  marginVertical: 5,
                  borderRadius: 10,
                }}
              >
                <SearchIcon style={{}} stroke={"black"} width={30} height={30} />
                <Text>Search</Text>
              </View>
              {parms && <Text style={{ marginVertical: 10 }}>{parms.message}</Text>}
              <View style={{ width: "100%", overflow: "hidden" }}>
                {newFilteredLodges ? (
                  <LodgeCard
                    location={newFilteredLodges.town}
                    name={newFilteredLodges.name}
                    photo={newFilteredLodges.photo}
                    price={newFilteredLodges.price}
                    showLikedBtn={false}
                  />
                ) : (
                  <Image source={require("assets/images/blur.png")} style={{ width: "100%" }} resizeMode="contain" />
                )}
              </View>
              {!newFilteredLodges && (
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: 15 }}>
                  <View style={{ position: "relative" }}>
                    <View style={{ borderWidth: 3, borderColor: hue.secondary, padding: 20, margin: 5, borderRadius: 15 }}>
                      <Text>Month</Text>
                      <Text>&#x20A6; 11000</Text>
                    </View>

                    <TickSvg fill={"black"} scale={4} width={15} height={15} style={{ position: "absolute", top: 0, right: 0 }} />
                    <TouchableOpacity style={{ backgroundColor: "#FF9000", padding: 8, borderRadius: 10 }} onPress={() => handleInitializeTransaction(11000)}>
                      <Text style={{ textAlign: "center" }}>Display all</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ position: "relative" }}>
                    <View style={{ borderWidth: 3, borderColor: hue.secondary, padding: 20, margin: 5, borderRadius: 15 }}>
                      <Text>Month</Text>
                      <Text>&#x20A6; 1000</Text>
                    </View>
                    <TickSvg fill={"black"} scale={4} width={15} height={15} style={{ position: "absolute", top: 0, right: 0 }} />

                    <TouchableOpacity
                      style={{ backgroundColor: "#fff", borderColor: "#FF9000", borderWidth: 2, padding: 8, borderRadius: 10 }}
                      onPress={() => handleInitializeTransaction(1000)}
                    >
                      <Text style={{ textAlign: "center" }}>Display one</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <Text style={{ marginTop: 20, marginBottom: 50 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Notice:</Text> All lodges you pay for will be free to view for you for a period of one month.
                You will also get notified on their vacancies and updates
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      router.push("/tabs/home");
    }
  }
}

// export default function Result() {
//   const [responseState, setResponseState] = useState(null);
//   setResponseState(useLocalSearchParams());

//   const [token, setToken] = useState(null);

//   const handleInitializeTransaction = async function () {
//     console.log(responseState);
//     // console.log(responseState.id);
//     // if (token || responseState.id) {
//     //   try {
//     //     const response = await axios.post(`${baseUrl}/initialize`, undefined, {
//     //       params: {
//     //         id: responseState.id,
//     //         amount: 1000,
//     //       },
//     //       headers: {
//     //         Authorization: `Bearer ${token}`,
//     //       },
//     //     });
//     //     console.log(response);
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     // }
//   };

//   // useEffect(function () {
//   //   getToken("token").then((data) => setToken(data));
//   // }, []);

//   // if (responseState) {
//   return (
//     <SafeAreaView>
//       <ScreenHeader pageTitle="Campuslife" />
//       <ScrollView>
//         <View style={{ padding: 20 }}>
//           <Text style={{ fontSize: 25, fontWeight: "900" }}>Filter Result</Text>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: 5,
//               backgroundColor: "rgba(128, 128, 128, 0.5)",
//               padding: 8,
//               marginVertical: 5,
//               borderRadius: 10,
//             }}
//           >
//             <SearchIcon style={{}} stroke={"black"} width={30} height={30} />
//             <Text>Search</Text>
//           </View>
//           {/* {responseState && <Text>{responseState.message}</Text>} */}
//           <View style={{ width: "100%", overflow: "hidden" }}>
//             <Image source={require("assets/images/blur.png")} style={{ width: "100%" }} resizeMode="contain" />
//           </View>
//           <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: 15 }}>
//             <View style={{ position: "relative" }}>
//               <View style={{ borderWidth: 3, borderColor: hue.secondary, padding: 20, margin: 5, borderRadius: 15 }}>
//                 <Text>Month</Text>
//                 <Text>&#x20A6; 11000</Text>
//               </View>

//               <TickSvg fill={"black"} scale={4} width={15} height={15} style={{ position: "absolute", top: 0, right: 0 }} />
//               <TouchableOpacity style={{ backgroundColor: "#FF9000", padding: 8, borderRadius: 10 }}>
//                 <Text style={{ textAlign: "center" }}>Display all</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{ position: "relative" }}>
//               <View style={{ borderWidth: 3, borderColor: hue.secondary, padding: 20, margin: 5, borderRadius: 15 }}>
//                 <Text>Month</Text>
//                 <Text>&#x20A6; 11000</Text>
//               </View>
//               <TickSvg fill={"black"} scale={4} width={15} height={15} style={{ position: "absolute", top: 0, right: 0 }} />

//               <TouchableOpacity
//                 style={{ backgroundColor: "#fff", borderColor: "#FF9000", borderWidth: 2, padding: 8, borderRadius: 10 }}
//                 onPress={handleInitializeTransaction}
//               >
//                 <Text style={{ textAlign: "center" }}>Display one</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Text style={{ marginTop: 20, marginBottom: 50 }}>
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>Notice:</Text> All lodges you pay for will be free to view for you for a period of one month. You
//             will also get notified on their vacancies and updates
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
//   // } else {
//   //   router.push("/tabs/home");
//   // }
// }
