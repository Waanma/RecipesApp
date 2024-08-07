import { Pressable, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";

const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="w-full pt-3">
      <Pressable
        className="active:opacity-20"
        onPress={() => toggleColorScheme()}
      >
        <View className="ml-6 w-12 h-12 items-center justify-center rounded-full bg-newSkyBlue">
          <Icon
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
