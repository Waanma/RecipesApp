import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="h-12 items-center border-4 rounded-3xl border-newOrange">
        <View className="flex-1 bg-white flex-row items-center rounded-3xl">
          <View className="w-2/12 justify-center items-center">
            <Ionicons name="search-outline" size={30} />
          </View>
          <View className="flex-1">
            <TextInput placeholder="Search recipe..." />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
