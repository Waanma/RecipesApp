import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useMealStore from "../store/useMealStore";
import { styled, useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import VideoPlayer from "../contexts/useVideoPlayer";
import DarkModeButton from "./darkModeButton";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { meal, loading, fetchMealById } = useMealStore();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const mealId = Array.isArray(id) ? id[0] : id;
    fetchMealById(mealId);
  }, [id, fetchMealById]);

  if (loading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${colorScheme === "dark" ? "bg-newBlack" : "bg-orangeSoft"}`}
      >
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }

  if (!meal) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText>No details available</StyledText>
      </StyledView>
    );
  }

  const renderIngredients = () => {
    return Array.from({ length: 20 }, (_, i) => {
      const ingredient = meal[`strIngredient${i + 1}`];
      if (ingredient && ingredient.trim()) {
        return (
          <StyledText key={`ingredient-${i + 1}`}>{ingredient}</StyledText>
        );
      }
      return null;
    }).filter((element) => element !== null);
  };

  const renderMeasurements = () => {
    return Array.from({ length: 20 }, (_, i) => {
      const measurement = meal[`strMeasure${i + 1}`];
      if (measurement && measurement.trim()) {
        return <StyledText key={`measure-${i + 1}`}>{measurement}</StyledText>;
      }
      return null;
    }).filter((element) => element !== null);
  };

  return (
    <StyledScrollView
      className={`${colorScheme === "dark" ? "bg-newBlack" : "bg-orangeSoft"}`}
    >
      <View style={{ position: "relative" }}>
        <StyledImage
          source={{ uri: meal.strMealThumb }}
          style={{ width: "100%", height: 370, resizeMode: "cover" }}
        />
        <LinearGradient
          colors={[
            "transparent",
            `${colorScheme === "dark" ? "#0f0f0f" : "#F18F01"}`,
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 100,
          }}
        />
      </View>
      <StyledView className="mx-5 bg-white -top-20 rounded-xl shadow-xl">
        <StyledView className="p-4">
          <StyledView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 15,
              marginBottom: 20,
            }}
          >
            <StyledView className="bg-white p-1 items-center justify-center rounded-xl shadow-xl">
              <StyledText className="text-xl font-bold">
                {meal.strMeal}
              </StyledText>
            </StyledView>
            <StyledView className="rounded-xl shadow-xl bg-white">
              <StyledText className="text-lg p-1">{meal.strArea}</StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="items-center">
            <StyledView className="flex-row w-10/12 mb-4 bg-white shadow-xl rounded-lg">
              <StyledView className="flex-1 p-2 px-2">
                <StyledText className="font-bold mb-2">Ingredients:</StyledText>
                {renderIngredients()}
              </StyledView>
              <StyledView className="flex-1 p-2">
                <StyledText className="font-bold mb-2">
                  Measurements:
                </StyledText>
                {renderMeasurements()}
              </StyledView>
            </StyledView>
          </StyledView>
          <StyledView className="mb-4 bg-graySoft w-full rounded-xl">
            <StyledText className="font-bold mb-2 m-2">
              Instructions:
            </StyledText>
            <StyledText className="bg-white mx-2 p-2 mb-2 rounded-xl">
              {meal.strInstructions}
            </StyledText>
          </StyledView>
          <VideoPlayer videoUrl={meal.strYoutube} />
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
};

export default ItemDetail;
