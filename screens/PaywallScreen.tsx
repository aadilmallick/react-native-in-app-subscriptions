import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Paywall"
>;

export default function PaywallScreen() {
  const { currentOffering } = useRevenueCat();

  const handleMonthlyPurchase = async () => {
    if (!currentOffering?.monthly) return;
    try {
      const purchaseInfo = await Purchases.purchasePackage(
        currentOffering.monthly
      );
      console.log("MONTLY SUB PURCHASED");
    } catch (e) {
      console.log(e);
      console.log("MONTLY SUB DECLINED");
    }
  };
  return (
    <ScrollView className=" bg-gray-800 flex-1 pt-12 px-4">
      <Text className="uppercase text-2xl text-white text-center">Upgrade</Text>
      <Text className="text-center text-sm text-white">
        Upgrade to get more PRO features
      </Text>
      <View className="flex flex-row justify-center">
        <Ionicons name="trophy" color="#E5962D" size={150} />
      </View>
      {/* info row container */}
      <View className="space-y-4 my-4">
        {/* infoRow */}
        <View className="flex flex-row items-center px-4 space-x-4">
          <View>
            <Ionicons name="build" color="#E5962D" size={30} />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Access to PRO features
            </Text>
            <Text className="text-white font-light leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus deserunt blanditiis possimus veritatis.
            </Text>
          </View>
        </View>
        {/* info row */}
        <View className="flex flex-row items-center px-4 space-x-4">
          <View>
            <Ionicons name="build" color="#E5962D" size={30} />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Access to PRO features
            </Text>
            <Text className="text-white font-light leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus deserunt blanditiis possimus veritatis.
            </Text>
          </View>
        </View>
        {/* info row */}
        <View className="flex flex-row items-center px-4 space-x-4">
          <View>
            <Ionicons name="build" color="#E5962D" size={30} />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Access to PRO features
            </Text>
            <Text className="text-white font-light leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus deserunt blanditiis possimus veritatis.
            </Text>
          </View>
        </View>
      </View>
      {/* buttons */}
      <TouchableOpacity
        className="border-primary border-2 rounded-full flex flex-row justify-between items-center px-10 py-5"
        onPress={handleMonthlyPurchase}
      >
        <Text className="text-white font-semibold text-base">
          Pay me monthly
        </Text>
        <Text className="text-white text-lg">
          {currentOffering?.monthly?.product.priceString}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
