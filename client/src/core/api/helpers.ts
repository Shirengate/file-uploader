import { API_BASE_URL } from "../config/api.config";
import { API_ENDPOINTS } from "../consts/endpoints";

export const fetchData = async () => {
  const response = await fetch(API_BASE_URL + API_ENDPOINTS.FILES);
  const data = await response.json();

  return data;
};
