"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ThemeToggler";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-between items-center h-full shadow-md px-10">
      <Link href={"/"} className="text-xl font-bold">
        Medium
      </Link>
      {status === "unauthenticated" ? (
        <div className="flex items-center space-x-4">
          <Link href={"/signin"} className="text-gray-600 dark:text-white">
            Sign in
          </Link>
          <Link
            href={"/signup"}
            className="bg-red-500 text-white px-4 py-1 rounded-md"
          >
            Get started
          </Link>
        </div>
      ) : (
        status === "authenticated" && (
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href={"/write"}>
              <Button>Write</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>{session.user?.email}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/profile"}>
                    <Button variant={"ghost"}>My Profile</Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={() => signOut()} className="w-full">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      )}
    </div>
  );
}
