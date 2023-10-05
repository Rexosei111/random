import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useTokenRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [token, setToken] = useToken("token", null);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        setIsRefreshing(true);
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/token/refresh",
          {
            refresh_token: token.refresh_token,
          }
        );
        setToken({
          ...data,
          expiresIn: new Date(
            new Date().getTime() + process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN
          ),
        });
      } catch (error) {
        // Handle error (e.g., logout user, show error message)
        console.error("Failed to refresh access token", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const intervalId = setInterval(() => {
      // Refresh the access token 5 minutes before it expires
      const currentTime = new Date();
      const expiresIn = new Date(+token?.expiresIn);
      const timeUntilExpiration = expiresIn?.getTime() - currentTime?.getTime(); // calculate time until expiration of access token
      if (timeUntilExpiration < 5 * 60 * 1000) {
        refreshAccessToken();
      }
    }, +process.env.NEXT_PUBLIC_TOKEN_REFRESH_CHECK); // Check every minute

    return () => clearInterval(intervalId);
  }, [token]);

  return isRefreshing;
};

const useToken = (key, initialValue) => {
  if (typeof window !== "undefined") {
    const router = useRouter();
  }
  const [token, setState] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue
        if (value === null) {
          if (router.pathname !== "/auth/login")
            router.push("/auth/login?callbackUrl=" + router.pathname);
        }
        return value ? JSON.parse(value) : initialValue;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const setToken = (value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      if (typeof window !== "undefined") {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [token, setToken];
};

export default useToken;

export const useTokenValidation = () => {
  const router = useRouter();

  useEffect(() => {
    let token = null;
    const item = localStorage.getItem("app-token");
    if (item !== null) {
      const data = JSON.parse(item);
      token = data ? data : null;
    }
    if (token === null) {
      if (window.location.pathname.startsWith("/admin")) {
        router.push("/admin/login");
      } else {
        router.push("/login");
      }
    }
  }, []);
};
