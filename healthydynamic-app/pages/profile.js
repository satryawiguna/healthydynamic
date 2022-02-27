import Head from "next/head";
import AppLayout from "../components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Select from "../components/Select";
import Label from "../components/Label";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { useProfile } from "../hooks/useProfile";
import AuthValidationErrors from "../components/AuthValidationErrors";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
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

  const { updateProfile } = useProfile();

  const fetchProfile = async () => {
    const profile = await axios.get("/profile/me");

    setFullName(profile.data[0].full_name);
    setNickName(profile.data[0].nick_name);
    setGender(profile.data[0].gender);
    setAddress(profile.data[0].address);
    setPhone(profile.data[0].phone);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    setErrors([]);

    let errorItems = [];

    if (fullName == "") {
      errorItems.push("Full name is required");
    }

    if (nickName == "") {
      errorItems.push("Nick name is required");
    }

    setErrors(errorItems);

    if (errorItems.length == 0) {
      updateProfile({
        fullName,
        nickName,
        gender,
        address,
        phone,
        setErrors,
      });
    }
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      <Head>
        <title>Healthy Dynamic - Profile</title>
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

              <form onSubmit={handleUpdateProfile}>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={fullName}
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
                    value={nickName}
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
                  <Button>Update Profile</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
