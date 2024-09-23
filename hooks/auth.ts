import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface AuthProps {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

interface ErrorResponse {
  response: {
    status: number;
    data: {
      errors: Record<string, string[]>;
    };
  };
}

type SetErrors = (errors: Record<string, string[]>) => void;
type SetStatus = (status: string | null) => void;

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error: ErrorResponse) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({
    setErrors,
    ...props
  }: { setErrors: SetErrors } & Record<string, any>) => {
    await csrf();

    setErrors({});

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error: ErrorResponse) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({
    setErrors,
    setStatus,
    ...props
  }: { setErrors: SetErrors; setStatus: SetStatus } & Record<string, any>) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error: ErrorResponse) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: {
    setErrors: SetErrors;
    setStatus: SetStatus;
    email: string;
  }) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error: ErrorResponse) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: { setErrors: SetErrors; setStatus: SetStatus } & Record<string, any>) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error: ErrorResponse) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }: { setStatus: SetStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated!);
    if (middleware === "auth" && error) logout();
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
