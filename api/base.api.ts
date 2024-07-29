import axios from "axios";

const mealApi = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
});

export default mealApi;
