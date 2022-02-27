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

  const userFetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status != 409) throw error;

        router.push("/verify-email");
      });
  };

  const { data: user, error, mutate } = useSWR("/profile/me", userFetcher);

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
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

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

  const refreshToken = async () => {
    axios
      .get("/refresh-token")
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        const decoded = jwtDecode(response.data.accessToken);

        setAccessToken(response.data.accessToken);
        setExpired(decoded.exp);
        setEmail(decoded.email);
        setFullName(decoded.full_name);

        mutate();
      })
      .catch((error) => {
        // if (!error) throw error;
        // setErrors(Object.values(error.response.data.message).flat());
      });
  };

  useEffect(() => {
    if (typeof user === "undefined") {
      refreshToken();
    }

    if (middleware == "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware == "auth" && error) {
      logout();
    }
  }, [user, error]);

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
