"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "admin@hospital.com" && password === "admin123") {
    
    // 1. AWAIT the cookies object (Next.js 15 requirement)
    const cookieStore = await cookies();
    
    // 2. Issue the secure "ticket" (HTTP-Only Cookie)
    cookieStore.set("auth_token", "secure_session_xyz_123", {
      httpOnly: true, // Prevents hackers from stealing it via JavaScript
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // Expires in 1 day
      path: "/",
    });
    
  } else {
    return { error: "Invalid credentials. Try admin@hospital.com / admin123" };
  }

  // 3. Redirect the user into the fortress
  redirect("/dashboard");
}

export async function logoutUser() {
  // AWAIT the cookies object here as well for logging out
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  
  redirect("/login");
}