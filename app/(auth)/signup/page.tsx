"use client";

import { signupAction } from "@/actions/auth-actions";
import { registerSchema, RegisterSchema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: RegisterSchema) => {
    const res = await signupAction(data);
    if (res.success) {
      router.push("/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded space-y-4 w-[400px]"
    >
      <h1 className="text-3xl font-bold">Signup</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          {...register("name")}
        />
        {errors.name && <p className="text-red-100">{errors.name.message}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          {...register("email")}
        />
        {errors.email && <p className="text-red-100">{errors.email.message}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-100">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="confirmPassword"
          className="border p-2 w-full"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-100">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? `Loading....` : `Create Account`}
      </button>

      <p>
        Already have account?
        <Link href="/login" className="ml-2 underline">
          Login
        </Link>
      </p>
    </form>
  );
}
