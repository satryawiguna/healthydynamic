import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import AppLayout from "../../../components/Layouts/AppLayout";
import axios from "../../../lib/axios";
import Select from "../../../components/Select";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import AuthValidationErrors from "../../../components/AuthValidationErrors";
import { useUser } from "../../../hooks/useUser";

const EditUser = () => {
  const router = useRouter();
  const { updateUser } = useUser();

  const { id } = router.query;

  const [full_name, setFullName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [genders, setGenders] = useState([
    {
      id: 1,
      name: "male",
    },
    {
      id: 2,
      name: "female",
    },
  ]);

  const [errors, setErrors] = useState([]);

  const fetchUser = async () => {
    const user = await axios.get(`/user/${id}`);

    setFullName(user.data.profile ? user.data.profile.full_name : "");
    setNickName(user.data.profile ? user.data.profile.nick_name : "");
    setGender(user.data.profile ? user.data.profile.gender : "");
    setAddress(user.data.profile ? user.data.profile.address : "");
    setPhone(user.data.profile ? user.data.profile.phone : "");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();

    setErrors([]);

    let errorItems = [];

    if (full_name == "") {
      errorItems.push("Full name is required");
    }

    if (nick_name == "") {
      errorItems.push("Nick name is required");
    }

    setErrors(errorItems);

    if (errorItems.length == 0) {
      updateUser({
        setErrors,
        id,
        full_name,
        nick_name,
        gender,
        address,
        phone,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit User
        </h2>
      }
    >
      <Head>
        <title>Healthy Dynamic - Add User</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <AuthValidationErrors
                className="mb-4"
                errors={errors}
                onClick={closeErrorHandler}
              />

              <form onSubmit={handleUpdateUser}>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={full_name}
                    placeholder="Full Name"
                    className="block mt-1 w-full"
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="nick_name">Nick Name</Label>
                  <Input
                    id="nick_name"
                    type="text"
                    value={nick_name}
                    placeholder="Nick Name"
                    className="block mt-1 w-full"
                    onChange={(event) => setNickName(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    valueState={gender}
                    options={genders}
                    onChange={handleGenderChange}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="address">Address</Label>
                  <TextArea
                    id="address"
                    value={address}
                    placeholder="Address"
                    className="block mt-1 w-full"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    placeholder="Phone"
                    className="block mt-1 w-full"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div className="flex items-center justify-start mt-10">
                  <Button
                    className="bg-red-800 mr-2"
                    onClick={() => router.push("/users")}
                  >
                    Cancel
                  </Button>
                  <Button>Update User</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditUser;
