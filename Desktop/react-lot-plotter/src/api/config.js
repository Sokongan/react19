import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
      'lra-api-key': process.env.REACT_APP_API_KEY
  }
});


export const getRequest = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}