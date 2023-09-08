import axios from "axios";
import { logout } from "./shared/utils/auth";

const apiClient = axios.create({
  // baseURL: "http://localhost:5002/api",
    baseURL: "https://c001-202-28-7-5.ngrok-free.app/api",
    headers: {
      // 'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    },
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (data) => {
  try {
    return await apiClient.post("/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post(
      // "/friend-invitation/invite"
      "/invitation/add"
      , data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => { 
  try {
    return await apiClient.post('/friend-invitation/accept',data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    }
  }
}

export const rejectFriendInvitation = async (data) => { 
  try {
    return await apiClient.post('/friend-invitation/reject',data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    }
  }
}

const checkResponseCode = (exception) => {
  console.log(exception.response)
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};

