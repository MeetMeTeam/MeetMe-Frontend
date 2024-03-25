import axios from "axios";
import { logout } from "./shared/utils/auth";
import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_PAYMENT}/api`,
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
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message !== "Email or password incorrect."
    ) {
      originalRequest._retry = true;

      try {
        const apiClientRefresh = axios.create({
          baseURL: `${process.env.REACT_APP_BASE_API}/api`,
        });
        apiClientRefresh.interceptors.request.use(
          (config) => {
            const userDetails = localStorage.getItem("user");

            if (userDetails) {
              const RefreshToken = JSON.parse(userDetails).refreshToken;
              console.log(RefreshToken);
              config.headers.Authorization = `Bearer ${RefreshToken}`;
            }

            return config;
          },
          (err) => {
            return Promise.reject(err);
          }
        );
        console.log("hello");
        const response = await apiClientRefresh.post(`/refresh`);
        if (response.status === 200) {
          let userDetails = JSON.parse(localStorage.getItem("user"));
          userDetails.token = response.data.accessToken;
          localStorage.setItem("user", JSON.stringify(userDetails));
          connectWithSocketServer(userDetails);
        }

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        logout();
      }
    }

    return Promise.reject(error);
  }
);
// public routes

export const checkOut = async (data) => {
  try {
    return await apiClient.post("/payment/checkout", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getGiftList = async () => {
  try {
    return await apiClient.get("/payment/gift/list");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const sendGift = async (data) => {
  try {
    return await apiClient.post("/payment/gift/add", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getUserGift = async (data) => {
  try {
    return await apiClient.get(`/payment/gift/${data}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
