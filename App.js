import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/main";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={false} />
      <Main />
    </SafeAreaProvider>
  );
}
