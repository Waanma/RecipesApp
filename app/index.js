import { View } from "react-native";
import Main from "../components/main";
import { StatusBar } from "expo-status-bar";

export default function Index({ searchText, setSearchText }) {
  return (
    <View className="flex-1">
      <StatusBar hidden={true} backgroundColor="red" />
      <Main searchText={searchText} setSearchText={setSearchText} />
    </View>
  );
}
