import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Admin Start-----
export const loginUser = async ({ username, password }) => {
  try {
    const response = await api.post("/api/auth/login", { username, password });
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

//Admin End------

//Category Start-----
export const fetchCategories = async () => {
  const { data } = await api.get("/api/categories");
  return data;
};

export const createCategory = async (formData) => {
  const { data } = await api.post("api//categories", formData);
  return data;
};

export const updateCategory = async ({ id, formData }) => {
  const { data } = await api.put(`api//categories/${id}`, formData);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`api//categories/${id}`);
  return data;
};

//Category End-----
