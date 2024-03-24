"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidations, signinValidations } from "@vivek6201/common";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: SigninValidations) => {
    const { email, password } = values;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
      toast("User Logged in", {
        action: {
          label: "Close",
          onClick: () => console.log("Closed Toast"),
        },
      });
    } else {
      toast("Error Signing in", {
        action: {
          label: "Close",
          onClick: () => console.log("Closed Toast"),
        },
      });
    }
  };

  const form = useForm<SigninValidations>({
    resolver: zodResolver(signinValidations),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircle /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
