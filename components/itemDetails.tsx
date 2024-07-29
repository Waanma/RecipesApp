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
      <View className="p-4">
        <StyledText className="text-xl font-bold mb-2">
          {meal.strMeal}
        </StyledText>
        <StyledText className="text-lg mb-4">{meal.strArea}</StyledText>
        <StyledView className="flex-row mb-4">
          <StyledView className="flex-1 p-2">
            <StyledText className="font-bold mb-2">Ingredients:</StyledText>
            {renderIngredients()}
          </StyledView>
          <StyledView className="flex-1 p-2">
            <StyledText className="font-bold mb-2">Measurements:</StyledText>
            {renderMeasurements()}
          </StyledView>
        </StyledView>
        <StyledView className="mb-4">
          <StyledText className="font-bold mb-2">Instructions:</StyledText>
          <StyledText>{meal.strInstructions}</StyledText>
        </StyledView>
      </View>
    </StyledScrollView>
  );
};

export default ItemDetail;
