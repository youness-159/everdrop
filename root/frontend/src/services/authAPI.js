import { postData } from "./shopAPI.js";
import qs from "qs";

export const signup = async (user) => {
  return await postData("/users/signup", user);
};

export const login = async (credentials) => {
  return await postData("/users/login", credentials);
};

export const logout = async () => {
  return await postData("/users/logout");
};

export function onOauth() {
  const queryParams = qs.stringify({
    client_id:
      "951714449192-u1th51fp68k6baea5pmaga7v3hlstloh.apps.googleusercontent.com",
    redirect_uri:
      "http://localhost:8000/api/v1/sessions/oauth/google/user-data",
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
  });
  window.location.assign(
    `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`,
  );
}
