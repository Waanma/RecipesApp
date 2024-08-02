import { Text, ImageBackground, View } from "react-native";
import { styled } from "nativewind";
import SearchBar from "./searchBar";

const StyledText = styled(Text);

const Header = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
      }}
      resizeMode="cover"
    >
      <View style={{ width: 410, height: 200 }}>
        <Text className="text-white text-5xl tracking-wide py-1 ml-2">
          Learn once,{" "}
          <StyledText className="text-newYellow font-bold">cook</StyledText>{" "}
          everywhere!
        </Text>
        <View className="px-10">
          <SearchBar />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Header;
