"use client";
import axios from "axios";
import { getToken, isAuthenticated, removeTokens } from "@/lib/auth";
import { env } from "next-runtime-env";

const api = axios.create({
  baseURL: env('NEXT_PUBLIC_API_URL'),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getToken("access");
  if (isAuthenticated() && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeTokens();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;

export const signup = async (email, password1, password2) => {
  const response = await api.post("/auth/register/", {
    email,
    password1,
    password2,
  });
  return response;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login/", { email, password });
  return response;
};

export const logout = async () => {
  removeTokens();
  return await api.post("/auth/logout/");
};

export const resetPassword = async (email) => {
  const response = await api.post("/auth/password/reset/", { email });
  return response;
};

export const confirmResetPassword = async (
  uid,
  token,
  new_password1,
  new_password2
) => {
  const response = await api.post("/auth/password/reset/confirm/", {
    uid,
    token,
    new_password1,
    new_password2,
  });
  return response;
};

export const generateEvaluationReport = async (project, notes) => {
  const response = await api.post("/generate-evaluation-report/", {
    project,
    notes,
  });
  return response;
};
