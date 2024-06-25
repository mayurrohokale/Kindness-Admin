import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API_KEY || "http://localhost:8000";

function getAuthToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    const token = getAuthToken();
    let data = {
        "Content-Type": "application/json",
    }
    if (token) {
        data['Authorization'] = `Bearer ${token}`;
    }
    return data;
}

export const adminLogin = async (email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/admin-login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};


export const getUsers = async () => {
    try {
      const response = await Axios.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
