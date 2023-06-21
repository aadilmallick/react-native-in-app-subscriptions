import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import ActionRow from "../components/ActionRow";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
      className="relative"
    >
      {/* Pro/upgrade button */}
      <TouchableOpacity
        className="absolute z-10 right-4 items-center"
        style={{
          top: Constants.statusBarHeight,
        }}
      >
        <Ionicons name="person-circle" size={30} color="#E5962D" />
        <Text className="text-black uppercase">Pro/Upgrade</Text>
      </TouchableOpacity>
      {/* image */}
      <Image
        source={{ uri: "https://i.imgur.com/e14NE49.png" }}
        className="w-full h-64 object-cover"
      />
      {/* action rows */}
      <View className="flex flex-row space-x-8 justify-between px-4">
        <ActionRow
          color="#E5962D"
          icon="fitness"
          title="Track Workout"
          vertical
          screen="DemoScreen"
        />
        <ActionRow
          color="#55d0d7"
          icon="library"
          title="Browse Workouts"
          vertical
          screen="DemoScreen"
        />
      </View>
      <View className="px-4 mt-2">
        <ActionRow
          color="#d649c3"
          icon="share-social-outline"
          title="Share with friends"
          screen="DemoScreen"
        />
        <ActionRow
          color="#77c558"
          icon="add-circle-outline"
          title="Add an exercise"
          screen="DemoScreen"
          requiresPro
        />
        <ActionRow
          color="#ce5050"
          icon="time-outline"
          title="Create an outline"
          screen="DemoScreen"
          requiresPro
        />
        <ActionRow
          color="#589eca"
          icon="trophy-outline"
          title="Join Challenges"
          screen="DemoScreen"
          requiresPro
        />
      </View>
    </SafeAreaView>
  );
}
