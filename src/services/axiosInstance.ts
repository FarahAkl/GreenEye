import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "../utils/TS-Cookie";

type RefreshResponseData = {
  isSuccess?: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  data?: {
    accessToken?: string | null;
    refreshToken?: string | null;
  } | null;
};

const getTokensFromRefreshResponse = (payload: unknown): {
  isSuccess: boolean;
  accessToken: string | null;
  refreshToken: string | null;
} => {
  if (!payload || typeof payload !== "object") {
    return { isSuccess: false, accessToken: null, refreshToken: null };
  }

  const direct = payload as RefreshResponseData;
  const nested = direct.data ?? undefined;

  return {
    isSuccess: direct.isSuccess ?? true,
    accessToken: nested?.accessToken ?? direct.accessToken ?? null,
    refreshToken: nested?.refreshToken ?? direct.refreshToken ?? null,
  };
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie({ name: "token" });

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie({ name: "refreshToken" });

        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/Authentication/refresh-token`,
          { refreshToken },
        );

        const {
          isSuccess,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } =
          getTokensFromRefreshResponse(res.data);

        if (!isSuccess || !newAccessToken)
          throw new Error("Invalid refresh response");

        setCookie({
          name: "token",
          value: newAccessToken,
          days: 1,
        });

        // Backends may rotate refresh tokens; keep the latest one.
        if (newRefreshToken) {
          setCookie({
            name: "refreshToken",
            value: newRefreshToken,
            days: 7,
          });
        }

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        deleteCookie({ name: "token" });
        deleteCookie({ name: "refreshToken" });

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
