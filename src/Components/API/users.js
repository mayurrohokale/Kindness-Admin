import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API_KEY || "http://localhost:8000";

export function getAuthToken() {
  return localStorage.getItem("token");
}

function getHeaders() {
  const token = getAuthToken();
  let data = {
    "Content-Type": "application/json",
  };
  if (token) {
    data["Authorization"] = `Bearer ${token}`;
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
    const response = await Axios.post(`${BASE_URL}/admin-login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getUsers = async () => {
  try {
    const headers = getHeaders();
    const response = await Axios.get(`${BASE_URL}/users`, { headers });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export async function getVolunteers() {
  try {
    const response = await Axios.get(`${BASE_URL}/volunteers-admin`);
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

export async function getUsersCount() {
  try {
    const response = await Axios.get(`${BASE_URL}/users-count`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch users count");
    }
  } catch (error) {
    console.error("Error fetching users count:", error);
    return null;
  }
}

export async function getVolunteersCount() {
  try {
    const response = await Axios.get(`${BASE_URL}/volunteers/count`);
    if (response.status === 200) {
      return response.data.count; // Return only the count
    } else {
      throw new Error("Failed to fetch volunteers count");
    }
  } catch (error) {
    console.error("Error fetching volunteers count:", error);
    return null;
  }
}

// delete User 
export const deleteUser = async (userId) => {
  try {
    const headers = getHeaders();
    const response = await Axios.delete(`${BASE_URL}/delete-user/${userId}`, {
      headers,
    });

    if (response.status === 200) {
      return response.data; // Response from the server
    } else {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Re-throw error to handle it in the component or call site
  }
};

export const createDonation = async (donationData) => {
  try {
    const headers = getHeaders();
    const response = await Axios.post(
      `${BASE_URL}/donation-form`,
      donationData,
      { headers }
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create donation");
    }
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error; // Re-throw error to handle it in the component or call site
  }
};

export const getAllBlogs = async () => {
  try {
    const headers = getHeaders();
    const response = await Axios.get(`${BASE_URL}/get-blog`,{headers});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch blog posts");
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error; // Re-throw error to handle it in the component or call site
  }
};

export const approveBlog = async (blogId) => {
  try {
    const headers = getHeaders();
    const response = await Axios.post(`${BASE_URL}/approve-blog/${blogId}`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error("Error approving blog:", error);
    throw error;
  }
};

export const deleteBlog = async (blogId) =>{
  try {
    const headers = getHeaders();
    const response = await Axios.delete(`${BASE_URL}/delete-blog/${blogId}`, { headers });
    return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
      }
}

export const updateUserStatus = async (userId, status) => {
  try {
    const headers = getHeaders();
    const response = await Axios.put(`${BASE_URL}/update-user-status/${userId}`, { status }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export const activeUserscount = async () => {
  try{
    const response = await Axios.get(`${BASE_URL}/active-users-count`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch active-users count");
    }
  } catch (error){
    console.error("Error in Fetching Active Users Count", error);
    throw error;
  }
}

export async function disableUsersCount() {
  try{
    const response = await Axios.get(`${BASE_URL}/disable-users-count`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch disable-users count");
    }
  } catch(error){
    console.error("Error in Fetching Disable Users Count", error);
    return null;
  }
}


