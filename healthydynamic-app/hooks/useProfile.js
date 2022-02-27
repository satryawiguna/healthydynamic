import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../lib/axios";

export const useProfile = () => {
  const MySwal = withReactContent(Swal);

  const updateProfile = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put("/profile/me", props)
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Updated",
        });
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.message).flat());
      });
  };

  return {
    updateProfile,
  };
};
