import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { shadow_styles } from "../styles/shadows";
import useRevenueCat from "../hooks/useRevenueCat";

// say which screen we are on
export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

// add typing support for icon name for ionicons
// https://stackoverflow.com/questions/63485664/how-to-add-typing-support-for-icon-name-for-ionicons-in-react-native
interface ActionRowProps {
  title: string;
  color: string;
  //   added support for icon name
  icon: keyof typeof Ionicons.glyphMap;
  screen: string | NavigationProp;
  requiresPro?: boolean;
  vertical?: boolean;
}

export default function ActionRow({
  color,
  icon,
  requiresPro = false,
  screen,
  title,
  vertical = false,
}: ActionRowProps) {
  /* ? Ok, I found out what the problem was. Anytime I use a literal tailwind styling 
    value using the [] bracket notation, I can't do it if it requires referencing a variable. 
    Instead, I have to use the `style` prop. I can only do dynamic logic if what's being returned 
    is an actual classname, not a literal tailwind styling. 
    */
  const styleClass = `justify-center items-center py-4 px-4 rounded-lg relative ${
    vertical ? "flex-col flex-[0.45]" : "flex-row mb-2 space-x-4"
  }`;

  const navigation = useNavigation<NavigationProp>();
  const { isProMember } = useRevenueCat();

  const shouldBeLockedForYouSinceYoureNotAPro = requiresPro && !isProMember;

  const onPress = () => {
    if (shouldBeLockedForYouSinceYoureNotAPro) {
      navigation.navigate("Paywall");
    } else {
      navigation.navigate(screen);
    }
  };

  const LockedIcon = () => {
    return (
      <View
        className="absolute right-4 rotate-12 justify-center items-center"
        style={{ top: "20%" }}
      >
        <Ionicons name="lock-closed" size={30} color="white" />
        <Text className="text-white text-center">Pro Only</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      className={styleClass}
      style={{
        backgroundColor: shouldBeLockedForYouSinceYoureNotAPro ? "gray" : color,
        ...shadow_styles.shadow_2xl,
      }}
      onPress={onPress}
    >
      <Ionicons color="white" name={icon} size={30} />
      <Text className="text-white font-semibold text-center">{title}</Text>
      {shouldBeLockedForYouSinceYoureNotAPro && LockedIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  verticalButton: { flexDirection: "column" },
  horizontalButton: { flexDirection: "row" },
});
