"use server";

import { auth } from "@/lib/auth";
import { RegisterSchema } from "@/schemas/register-schema";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as Record<string, unknown>).message);
  }
  return "An unexpected error occurred";
}

export async function signupAction(formData: RegisterSchema) {
  const name = formData.name as string;
  const email = formData.email as string;
  const password = formData.password as string;
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });
    revalidateTag("users", "max");
    return {
      success: true,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error) || "Signup failed",
    };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
    return {
      success: true,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error) || "Login failed",
    };
  }
}

export async function logoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    return {
      success: true,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error) || "Logout failed",
    };
  }
}

export async function getSessionAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return {
      success: true,
      data: session,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error) || "Failed to get session",
    };
  }
}
