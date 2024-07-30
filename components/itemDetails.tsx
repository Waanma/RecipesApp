import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useMealStore from "../store/useMealStore";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { meal, loading, fetchMealById } = useMealStore();

  useEffect(() => {
    const mealId = Array.isArray(id) ? id[0] : id;
    fetchMealById(mealId);
  }, [id, fetchMealById]);

  if (loading) {
    return <ActivityIndicator size="large" />;
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
    <StyledScrollView>
      <StyledImage
        source={{ uri: meal.strMealThumb }}
        style={{ width: "100%", height: 300, resizeMode: "cover" }}
      />
      <StyledView className="p-4">
        <StyledView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StyledText className="text-xl font-bold mb-2">
            {meal.strMeal}
          </StyledText>
          <StyledView className="mb-4 bg-newButton rounded-xl">
            <StyledText className="text-lg p-1">{meal.strArea}</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="items-center">
          <StyledView className="flex-row w-9/12 mb-4 bg-newOrange rounded-lg shadow-md">
            <StyledView className="flex-1 p-2">
              <StyledText className="font-bold mb-2">Ingredients:</StyledText>
              {renderIngredients()}
            </StyledView>
            <StyledView className="flex-1 p-2">
              <StyledText className="font-bold mb-2">Measurements:</StyledText>
              {renderMeasurements()}
            </StyledView>
          </StyledView>
        </StyledView>
        <StyledView className="mb-4 bg-graySoft w-full rounded-xl">
          <StyledText className="font-bold mb-2 m-2">Instructions:</StyledText>
          <StyledText className="bg-white mx-2 p-2 mb-2 rounded-xl">
            {meal.strInstructions}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row items-center justify-center mt-8">
          <Text>Video: {meal.strYoutube}</Text>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
};

export default ItemDetail;
