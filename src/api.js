import axios from "axios";
import { logout } from "./shared/utils/auth";
import { connectWithSocketServer } from "./realtimeCommunication/socketConnection";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API}/api`,
});

const apiChangePw = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API}/api/users/reset-password`,
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

export const verifyEmail = async (data) => {
  try {
    return await apiClient.post("/verify-mail", { email: data });
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const sendMailToResetPw = async (data) => {
  try {
    return await apiClient.put("/users/forgot-password", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const changePassword = async (data) => {
  try {
    apiChangePw.interceptors.request.use(
      (config) => {
        if (data) {
          config.headers.Authorization = `Bearer ${data.token}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return await apiChangePw.put("", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes

export const getFriends = async () => {
  try {
    return await apiClient.get("/friends");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const sendFriendInvitation = async (data) => {
  try {
    const content = { targetMailAddress: data };
    return await apiClient.post("/invitations", content);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getInviteList = async () => {
  try {
    return await apiClient.get("/invitations");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.put(`/invitations/${data}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitationAll = async () => {
  try {
    return await apiClient.put(`/invitations`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.delete(`/invitations/${data}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitationAll = async () => {
  try {
    return await apiClient.delete(`/invitations`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getCoin = async () => {
  try {
    return await apiClient.get(`/users/coins`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
export const getInventory = async (type) => {
  try {
    return await apiClient.get(`/inventories?item_type=${type}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getAvatar = async (id) => {
  try {
    return await apiClient.get(`/users/avatars/${id}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const changeAvatar = async (id) => {
  try {
    return await apiClient.put(`/users/avatars/${id}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getAvatarShop = async (id) => {
  try {
    return await apiClient.get(`/avatars`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
export const buyAvatar = async (data) => {
  try {
    return await apiClient.post(
      `/inventories?item_id=${data.item_id}&item_type=${data.item_type}`
    );
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const addAvatarShop = async (data) => {
  try {
    return await apiClient.post(`/avatars`, data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getAvatarDefault = async (type) => {
  try {
    return await apiClient.get(`/avatars?type=${type}`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getThemeShop = async (type) => {
  try {
    return await apiClient.get(`/themes`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const editUser = async (data) => {
  console.log(data);
  try {
    return await apiClient.put(`/users`, data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getCateCard = async (type) => {
  try {
    return await apiClient.get(`/questions/categories`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getQuestions = async (type) => {
  try {
    return await apiClient.get(`/questions`);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
