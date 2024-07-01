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

export async function getMe() {
    const headers = getHeaders();
    console.log(headers);
    if (!headers?.Authorization) {
        return null;
    }
    const response = await Axios.get(`${BASE_URL}/me`, { headers });
    return response?.data;
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


  export async function getVolunteers() {
    try {
        const response = await Axios.get(`${BASE_URL}/volunteers`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch volunteers");
        }
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        return null;
    }
}

