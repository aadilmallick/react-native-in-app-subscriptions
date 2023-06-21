import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DemoScreen"
>;

export default function DemoScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView className="flex-1 pt-6 bg-primary relative">
      <TouchableOpacity
        className="flex flex-row items-center"
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
        <Text className="capitalize  text-white text-lg">Go back</Text>
      </TouchableOpacity>
      <Text className="capitalize  text-white text-xl font-bold text-center">
        Hooray!
      </Text>
      <Text className=" text-white text-xl font-bold text-center">
        You have access to this feature
      </Text>
      <View className="flex flex-row justify-center relative">
        <Ionicons name="build-outline" size={200} color="#fff" />
        <View className="absolute bottom-4 left-0" style={{ left: "35%" }}>
          <Ionicons name="checkmark-circle" size={60} color="#34d484" />
        </View>
      </View>
    </SafeAreaView>
  );
}
