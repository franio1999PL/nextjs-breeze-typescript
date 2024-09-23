"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useAuth } from "@/hooks/auth";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";

interface Errors {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

interface ResetPasswordParams {
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
}

const PasswordReset: React.FC = () => {
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params: ResetPasswordParams = {
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    };

    resetPassword(params);
  };

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  return (
    <>
      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            required
            autoFocus
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            required
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirmation(event.target.value)
            }
            required
          />

          <InputError
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button>Reset Password</Button>
        </div>
      </form>
    </>
  );
};

export default PasswordReset;
