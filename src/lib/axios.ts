import { env } from "@/env";

import axios from "axios";

export const API = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

if (env.VITE_API_DELAY) {
  API.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    );

    return config;
  });
}
