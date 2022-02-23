import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const fetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status != 409) throw error;

        router.push("/verify-email");
      });
  };

  const { data: user, error, mutate } = useSWR("/auth/me", fetcher);

  const register = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/register/member", props)
      .then(() => {
        mutate();
      })
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    setStatus(null);
    setErrors([]);

    axios
      .post("/auth/login", props)
      .then((response) => {
        localStorage.setItem("token", response.data.meta.token);
        mutate();
      })
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    setStatus(null);
    setErrors([]);

    axios
      .post("/password/email", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status != 422 && error.response.status != 500)
          throw error;

        setErrors(Object.values(error.response.data.errors).flat());
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
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
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
        .post("/auth/logout", { email: user.email })
        .then(() => {
          localStorage.removeItem("token");
          mutate();
        })
        .catch((error) => {
          if (error.response.status != 422) throw error;

          setErrors(Object.values(error.response.data.errors).flat());
        });
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    console.log(user);
    if (middleware == "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware == "auth" && error) logout();
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
