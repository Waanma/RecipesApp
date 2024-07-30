import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/main";
import { SearchProvider } from "./contexts/searchContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <SearchProvider>
        <StatusBar style="light" backgroundColor="red" />
        <Main />
      </SearchProvider>
    </SafeAreaProvider>
  );
}
