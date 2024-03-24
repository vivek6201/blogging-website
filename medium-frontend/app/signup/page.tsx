import AuthComponent from "@/components/auth/AuthComponent";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <AuthComponent
        title="Signup"
        description={
          <p>
            Already have an account?{" "}
            <Link href={"/signin"} className="text-blue-500">
              Signin
            </Link>
          </p>
        }
      >
        <SignupForm />
      </AuthComponent>
    </div>
  );
}
