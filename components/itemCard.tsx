import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { styled } from "nativewind";
import useMealStore from "../store/useMealStore";

const StyledPressable = styled(Pressable);

export function ItemCard({ item, index, handleFavoritesPress }) {
  const { favorites } = useMealStore();
  const isFavorite = favorites.some((fav) => fav.idMeal === item.idMeal);
  return (
    <Link href={`/${item.idMeal}`} asChild>
      <StyledPressable className="active:opacity-70 shadow-md">
        <View className="items-center shadow-sm">
          <Image
            source={{ uri: item.strMealThumb }}
            className="w-full"
            borderRadius={15}
            style={{ height: index % 3 === 0 ? hp(25) : hp(35) }}
          />
          <View className="bg-white shadow-md flex-row w-4/6  justify-around rounded-b-2xl items-center">
            <Text className="font-bold p-1 text-xl">{item.strMeal}</Text>
            <Pressable
              onPress={() => handleFavoritesPress(item)}
              className="active:scale-125 active:opacity-75"
            >
              {}
              <Icon
                name={isFavorite ? "heart" : "heart-outline"}
                size={25}
                color="red"
              />
            </Pressable>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedItem({ item, index, handleFavoritesPress }) {
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
      <ItemCard
        item={item}
        index={index}
        handleFavoritesPress={handleFavoritesPress}
      />
    </Animated.View>
  );
}
