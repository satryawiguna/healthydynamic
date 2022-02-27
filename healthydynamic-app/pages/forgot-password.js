import AuthCard from "../components/AuthCard";
import GuestLayout from "../components/Layouts/GuestLayout";
import Link from "next/link";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Logo from "../components/Logo";
import AuthSessionStatus from "../components/AuthSessionStatus";
import AuthValidationErrors from "../components/AuthValidationErrors";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const submitForm = (event) => {
    event.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
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
        <div className="mb-4 text-sm text-gray-600">
          <div
            class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert"
          >
            <p class="font-bold">Info</p>
            <p>
              Forgot your password? Just let us know your email address and we
              will email you a password reset link that will allow you to choose
              a new one.
            </p>
          </div>
        </div>

        <AuthSessionStatus className="mb-4" status={status} />

        <AuthValidationErrors
          className="mb-4"
          errors={errors}
          onClick={closeErrorHandler}
        />

        <form onSubmit={submitForm}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Email Password Reset Link</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default ForgotPassword;
