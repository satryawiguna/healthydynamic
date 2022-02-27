import useSWR from "swr";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export const useUser = () => {
  const MySwal = withReactContent(Swal);

  const router = useRouter();

  const usersFetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const { data: users, error, mutate } = useSWR("/users", usersFetcher);

  const storeUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/user", props)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "User Added",
        });

        router.push("/users");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const updateUser = async ({ setErrors, id, ...props }) => {
    setErrors([]);

    axios
      .put(`/user/${id}`, props)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "User Added",
        });

        router.push("/users");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  const deleteUser = async ({ setErrors, id }) => {
    setErrors([]);

    axios
      .delete(`/user/${id}`)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "User Deleted",
        });

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  return {
    users,
    storeUser,
    updateUser,
    deleteUser,
  };
};
