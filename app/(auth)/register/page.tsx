"use client";

import React, { useState, FormEvent } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";

interface Errors {
  [key: string]: string[];
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: (errors: Errors) => void;
}

const Page: React.FC = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerData: RegisterData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    };

    register(registerData);
  };

  return (
    <form onSubmit={submitForm}>
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          type="text"
          value={name}
          className="block mt-1 w-full"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          required
          autoFocus
        />

        <InputError messages={errors.name} className="mt-2" />
      </div>

      {/* Email Address */}
      <div className="mt-4">
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
          autoComplete="new-password"
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

        <InputError messages={errors.password_confirmation} className="mt-2" />
      </div>

      <div className="flex items-center justify-end mt-4">
        <Link
          href="/login"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already registered?
        </Link>

        <Button className="ml-4">Register</Button>
      </div>
    </form>
  );
};

export default Page;
