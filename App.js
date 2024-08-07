import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "nativewind";
import Main from "./components/main";

export default function App() {
  return (
    <SafeAreaProvider>
      <TailwindProvider>
        <StatusBar hidden={false} />
        <Main />
      </TailwindProvider>
    </SafeAreaProvider>
  );
}
