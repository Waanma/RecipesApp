import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="w-full pt-3">
      <Pressable
        className="active:opacity-20"
        testID="darkModeButton"
        onPress={() => toggleColorScheme()}
      >
        <View className="ml-6 w-12 h-12 items-center justify-center rounded-full bg-newSkyBlue">
          <Ionicons
            name="moon"
            size={35}
            color={colorScheme === "dark" ? "#F6F1D5" : "#01001c"}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default DarkModeButton;
