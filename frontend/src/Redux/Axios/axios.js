import axios from "axios";

const navigateToSignIn = () => {
  window.location.href = "/signin";
};

axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized error, indicating user is not authenticated
      // navigateToSignIn();
    }
    return Promise.reject(error);
  }
);

export default axios;
