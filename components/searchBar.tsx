import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useSearchStore from "../store/useSearchStore";

const SearchBar = () => {
  const { searchText, setSearchText } = useSearchStore();
  const handleCleartext = () => {
    setSearchText("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="h-12 items-center border-4 rounded-3xl">
        <View className="flex-1 bg-white flex-row items-center rounded-3xl">
          <View className="w-2/12 justify-center items-center">
            {searchText === "" ? (
              <Ionicons name="search-outline" size={30} />
            ) : (
              <Pressable
                className="active:opacity-20 active:scale-90"
                onPress={handleCleartext}
              >
                <Ionicons name="close-outline" size={30} />
              </Pressable>
            )}
          </View>
          <View className="flex-1">
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search recipe..."
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
