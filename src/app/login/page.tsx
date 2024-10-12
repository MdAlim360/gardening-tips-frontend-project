"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAppDispatch } from "@src//redux/hooks";
import { useLoginMutation } from "@src//redux/features/auth/authApi";
import { setUser } from "@src//redux/features/auth/authSlice";
import { Button, Card, Input } from "@nextui-org/react";
import { verifyToken } from "@src//utils/verifyToken";
import RecoveryPasswordModal from "@src//components/modules/editPasswordModal/RecoveryPasswordModal";
import ChangePasswordModal from "@src//components/modules/editPasswordModal/ChangePasswordModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Head from "next/head";

// Validation schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [login] = useLoginMutation();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  // Typing the onSubmit function
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Logging in");

    try {
      const res = await login(data).unwrap();

      if (!res.data || !res.token) {
        throw new Error("Login failed: No token received");
      }

      // Verify the token
      const user: any = verifyToken(res.token);

      if (!user) {
        throw new Error("Invalid user information");
      }

      // Set the access token in cookies
      Cookies.set("accessToken", res.token, { expires: 3 }); // Expires in 1 day

      // Dispatch user to the store
      dispatch(setUser({ user: user, token: res.token }));

      // Success message
      toast.success("Logged in", { id: toastId, duration: 2000 });

      // Redirect based on user role or to a specific URL
      window.location.href = redirect || "/";
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Login | Your App Name</title>
      </Head>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <Card className="max-w-sm w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                placeholder="Email"
                type="email"
                {...register("email")}
                className={`w-full ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                className={`w-full ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex justify-between mt-4 space-x-4">
            <RecoveryPasswordModal />
            <ChangePasswordModal />
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link className="text-blue-500" href="/register">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
}
