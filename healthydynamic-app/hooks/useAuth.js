import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState("");
  const [expired, setExpired] = useState("");

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const fetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status != 409) throw error;

        router.push("/verify-email");
      });
  };

  const { data: user, error, mutate } = useSWR("/profile/me", fetcher);

  const register = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/register/member", props)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    setStatus(null);
    setErrors([]);

    axios
      .post("/login", props)
      .then((response) => {
        const decoded = jwtDecode(response.data.accessToken);

        setAccessToken(response.data.accessToken);
        setExpired(decoded.exp);

        setEmail(decoded.email);
        setFullName(decoded.full_name);

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    setStatus(null);
    setErrors([]);

    axios
      .post("/password/email", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    setStatus(null);
    setErrors([]);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios
        .delete("/logout")
        .then(() => {
          setAccessToken("");

          mutate();
        })
        .catch((error) => {
          if (!error) throw error;

          setErrors(Object.values(error.response.data.message).flat());
        });
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    const currentDate = new Date();

    if (accessToken != "") {
      console.log("test 2");
      if (expired * 1000 < currentDate.getTime()) {
        const fetchData = async () => {
          const response = await axios.get("refresh-token");

          const decoded = jwtDecode(response.data.accessToken);

          setAccessToken(response.data.accessToken);
          setExpired(decoded.exp);
          setEmail(decoded.email);
          setFullName(decoded.fullName);
        };

        fetchData().catch((error) => {
          console.log(error);
        });
      }
    }

    if (middleware == "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (middleware == "auth" && error) logout();
  }, [user, error]);

  useEffect(() => {
    if (accessToken != "") {
      axios.interceptors.request.use(
        async (config) => {
          config.headers.Authorization = "Bearer " + accessToken;

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }, [accessToken]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
