import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export function ItemCard({ item, index }) {
  return (
    <Link href={`/${item.idMeal}`} asChild>
      <StyledPressable className="active:opacity-70">
        <View className="items-center shadow-sm">
          <Image
            source={{ uri: item.strMealThumb }}
            className="w-full"
            borderRadius={15}
            style={{ height: index % 3 === 0 ? hp(25) : hp(35) }}
          />
          <View className="bg-white flex-row w-4/6 justify-around rounded-b-2xl items-center">
            <Text className="font-bold p-1">{item.strMeal}</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? "rgb(210, 230, 255)"
                    : "transparent",
                  padding: 5,
                },
              ]}
            >
              <Icon name="heart-outline" size={20} color="red" />
            </Pressable>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedItem({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <ItemCard item={item} index={index} />
    </Animated.View>
  );
}
