import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ username, password }) => {
  try {
    console.log(
      "SENDING TO BACKEND --->",
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const response = await api.post("/api/auth/login", { username, password });
    console.log("Login response:", response.data);
    if (response.data.message === "Login successful") {
      return true;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/api/auth/logout");
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
