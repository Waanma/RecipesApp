import { create } from "zustand";
import mealApi from "../api/base.api";

type Meal = {
  strInstructions: string;
  strArea: string;
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealState = {
  meals: Meal[];
  meal: Meal | null;
  categories: Category[];
  loading: boolean;
  fetchMeals: () => Promise<void>;
  fetchMealById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
const useMealStore = create<MealState>((set) => ({
  meals: [],
  meal: null,
  categories: [],
  loading: false,
  fetchMeals: async () => {
    set({ loading: true });
    try {
      const response = await mealApi.get("search.php?s=");
      set({ meals: response.data.meals || [], loading: false });
    } catch (err) {
      console.error("Error fetching meals: ", err);
    }
  },
  fetchMealById: async (id) => {
    set({ loading: true });
    try {
      const response = await mealApi.get(`lookup.php?i=${id}`);
      set({ meal: response.data.meals[0] || null, loading: false });
    } catch (err) {
      console.error("Error fetching meal: ", err);
    }
  },
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await mealApi.get("categories.php");
      set({ categories: response.data.categories || [], loading: false });
    } catch (err) {
      console.error("Error fetching meals by category: ", err);
    }
  },
}));

export default useMealStore;
