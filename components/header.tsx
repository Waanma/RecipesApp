import { Text, ImageBackground, View } from "react-native";
import { styled } from "nativewind";

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
        <Text
          className="text-white text-5xl tracking-wide"
          style={{ fontFamily: "RobotoSerif" }}
        >
          Learn once,{" "}
          <StyledText className="text-newYellow font-bold">cook</StyledText>{" "}
          everywhere!
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Header;
