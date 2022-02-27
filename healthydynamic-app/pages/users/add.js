import Head from "next/head";
import AppLayout from "../../components/Layouts/AppLayout";
import { useState } from "react";
import Select from "../../components/Select";
import Label from "../../components/Label";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import AuthValidationErrors from "../../components/AuthValidationErrors";
import { useUser } from "../../hooks/useUser";

const AddUser = () => {
  const { storeUser } = useUser();

  const [full_name, setFullName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState([]);

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

  const validateEmail = (mail) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    setErrors([]);

    let errorItems = [];

    if (full_name == "") {
      errorItems.push("Full name is required");
    }

    if (nick_name == "") {
      errorItems.push("Nick name is required");
    }

    if (email == "") {
      errorItems.push("Email is required");
    }

    if (!validateEmail(email)) {
      errorItems.push("Invalid email format");
    }

    if (password == "") {
      errorItems.push("Password is required");
    }

    if (password != password_confirmation) {
      errorItems.push("Password confirmation doesn't match");
    }

    setErrors(errorItems);

    if (errorItems.length == 0) {
      storeUser({
        setErrors,
        full_name,
        nick_name,
        gender,
        address,
        phone,
        email,
        password,
        password_confirmation,
      });
    }
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Add User
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

              <form onSubmit={handleAddUser}>
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
                <div className="my-8">
                  <hr />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    className="block mt-1 w-full"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    className="block mt-1 w-full"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password_confirmation">
                    Password Confirmation
                  </Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={password_confirmation}
                    placeholder="Password Confirmation"
                    className="block mt-1 w-full"
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-start mt-10">
                  <Button>Save User</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddUser;
