"use server";

import { auth } from "@/lib/auth";
import { RegisterSchema } from "@/schemas/register-schema";
import { updateTag } from "next/cache";
import { headers } from "next/headers";

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
    updateTag("users");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
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
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
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
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
}

export async function getSessionAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log(session, "lllllll");
    return {
      success: true,
      data: session,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
}
