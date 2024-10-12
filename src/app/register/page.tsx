"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSignupMutation } from "@src//redux/features/auth/authApi"; // Assume you have a register mutation
import { Button, Card, Input } from "@nextui-org/react";

// Function to generate 6-digit verification code
const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000);

// Validation schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is too short"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  picture: z.string().optional(), // Optional field
  coverPhoto: z.string().optional(), // Optional field
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  //   const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [signup] = useSignupMutation();

  // Typing the onSubmit function
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Registering...");

    const payload = {
      ...data,
      role: "user", // Default role
      status: "unverified", // Default status
      verifiedCode: generateVerificationCode(), // Auto-generate code
      followers: [],
      following: [],
      isBlocked: false,
      isDeleted: false,
    };

    try {
      const res: any = await signup(payload).unwrap();

      console.log(res);
      if (!res.data) {
        throw new Error("Registration failed: No token received");
      }

      //   const user: any = res.data.user;

      //   dispatch(setUser({ user: user, token: res.token }));

      toast.success("Registration successful", { id: toastId, duration: 2000 });
      // Handle redirection here
      window.location.href = "/login";
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600 p-4">
      <Card className="max-w-sm w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Name"
              type="text"
              {...register("name")}
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
          <div>
            <Input
              placeholder="Phone"
              type="text"
              {...register("phone")}
              className={`w-full ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Address"
              type="text"
              {...register("address")}
              className={`w-full ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Profile Picture URL"
              type="url"
              {...register("picture")}
              className={`w-full ${errors.picture ? "border-red-500" : ""}`}
            />
            {errors.picture && (
              <p className="text-red-500 text-sm mt-1">
                {errors.picture.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Cover Photo URL"
              type="text"
              {...register("coverPhoto")}
              className={`w-full ${errors.coverPhoto ? "border-red-500" : ""}`}
            />
            {errors.coverPhoto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverPhoto.message}
              </p>
            )}
          </div>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            type="submit"
          >
            Register
          </Button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a className="text-blue-500" href="/login">
            Log in
          </a>
        </p>
      </Card>
    </div>
  );
}
