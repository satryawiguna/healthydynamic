import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import GuestLayout from "../components/Layouts/GuestLayout";
import AuthCard from "../components/AuthCard";
import Link from "next/link";
import Logo from "../components/Logo";
import AuthValidationErrors from "../components/AuthValidationErrors";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [full_name, setFullName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [identity_number, setIdentityNumber] = useState("");
  const [errors, setErrors] = useState([]);

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

  const submitFormHandler = (event) => {
    event.preventDefault();

    setErrors([]);

    let errorItems = [];

    if (full_name == "") {
      errorItems.push("Full name is required");
    }

    if (nick_name == "") {
      errorItems.push("Nick name is required");
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
      register({
        email,
        password,
        password_confirmation,
        full_name,
        nick_name,
        setErrors,
      });
    }
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <Logo className="w-50 h-10 fill-current text-gray-500 login-title" />
            </a>
          </Link>
        }
      >
        <AuthValidationErrors
          className="mb-4"
          errors={errors}
          onClick={closeErrorHandler}
        />

        <form onSubmit={submitFormHandler}>
          <div>
            <Label htmlFor="full_name">Full name</Label>

            <Input
              id="full_name"
              type="text"
              value={full_name}
              className="block mt-1 w-full"
              onChange={(event) => setFullName(event.target.value)}
              autoFocus
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="nick_name">Nick name</Label>

            <Input
              id="nick_name"
              type="text"
              value={nick_name}
              className="block mt-1 w-full"
              onChange={(event) => setNickName(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
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
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password_confirmation">Password Confirmation</Label>

            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="block mt-1 w-full"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Register;
