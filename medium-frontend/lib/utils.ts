import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    "https://medium-backend.gvicky45678.workers.dev/api/v1/user/signin",
    {
      email,
      password,
    }
  );

  if (res.status != 200) {
    return null;
  }

  return res.data;
};
