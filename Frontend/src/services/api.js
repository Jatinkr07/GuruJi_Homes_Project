import axios from "axios";

export const API_URL = "http://localhost:6001";

const api = axios.create({
  baseURL: API_URL,
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
  const { data } = await api.post("/api/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateCategory = async ({ id, formData }) => {
  const { data } = await api.put(`/api/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/api/categories/${id}`);
  return data;
};

//Category End-----

//Builder Api Start -------
export const fetchBuilders = async () => (await api.get("/api/builders")).data;
export const createBuilder = async (formData) =>
  (
    await api.post("/api/builders", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
export const updateBuilder = async ({ id, formData }) =>
  (
    await api.put(`/api/builders/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
export const deleteBuilder = async (id) =>
  (await api.delete(`/api/builders/${id}`)).data;

//Builder Api Ends

//Type Api Start--------

export const fetchTypes = async () => (await api.get("/api/types")).data;
export const createType = async (formData) =>
  (
    await api.post("/api/types", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
export const updateType = async ({ id, formData }) =>
  (
    await api.put(`/api/types/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
export const deleteType = async (id) =>
  (await api.delete(`/api/types/${id}`)).data;

//Type Api End--------

// Status APIs Start----------------
export const fetchStatuses = async () => (await api.get("/api/statuses")).data;
export const createStatus = async (formData) =>
  (await api.post("/api/statuses", formData)).data;
export const updateStatus = async ({ id, formData }) =>
  (await api.put(`/api/statuses/${id}`, formData)).data;
export const deleteStatus = async (id) =>
  (await api.delete(`/api/statuses/${id}`)).data;

// Status APIs Start----------------
