import Keycloak from "keycloak-js";
import axios from "axios";
const auth = Keycloak("/keycloak.json");

export const initAuth = () => {
  return auth.init({ onLoad: "login-required", checkLoginIframe: true });
};

export const logout = () => {
  const logoutOptions = { redirectUri: window.location.origin };
  auth.logout(logoutOptions);
};

axios.interceptors.request.use(
  async config => {
    await auth.updateToken(30);
    const token = auth.token;

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
