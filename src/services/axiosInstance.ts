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

const getStoredToken = (name: "token" | "refreshToken"): string | null => {
  const cookieName = name === "token" ? "token" : "refreshToken";
  const localStorageName = name === "token" ? "accessToken" : "refreshToken";
  return getCookie({ name: cookieName }) ?? localStorage.getItem(localStorageName);
};

const persistTokens = (
  accessToken: string,
  refreshToken?: string | null,
): void => {
  setCookie({ name: "token", value: accessToken, days: 1 });
  localStorage.setItem("accessToken", accessToken);

  if (refreshToken) {
    setCookie({ name: "refreshToken", value: refreshToken, days: 7 });
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const clearStoredTokens = (): void => {
  deleteCookie({ name: "token" });
  deleteCookie({ name: "refreshToken" });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

/** After revoke-token / logout: clear storage and drop any default Authorization on the client. */
export const clearAuthAfterRevoke = (): void => {
  clearStoredTokens();
  delete axiosInstance.defaults.headers.common["Authorization"];
  delete axiosInstance.defaults.headers["Authorization"];
};

export const getStoredRefreshToken = (): string | null =>
  getStoredToken("refreshToken");

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getStoredToken("refreshToken")?.trim();
  if (!refreshToken) throw new Error("No refresh token");

  let res;
  try {
    res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Authentication/refresh-token`,
      { refreshToken },
    );
  } catch (err) {
    if (
      axios.isAxiosError(err) &&
      err.response?.status === 400
    ) {
      res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Authentication/refresh-token`,
        { token: refreshToken },
      );
    } else {
      throw err;
    }
  }

  const {
    isSuccess,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  } = getTokensFromRefreshResponse(res.data);

  if (!isSuccess || !newAccessToken) {
    throw new Error("Invalid refresh response");
  }

  persistTokens(newAccessToken, newRefreshToken);
  return newAccessToken;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers.delete("Authorization");
    }

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
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        clearAuthAfterRevoke();

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
