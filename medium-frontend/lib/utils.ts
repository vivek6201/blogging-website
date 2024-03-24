import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urls = {
  FRONTEND_URL: "http://localhost:3000",
  BACKEND_URL: "http://127.0.0.1:8787",
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const validateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${urls.BACKEND_URL}/api/v1/user/signin`, {
    email,
    password,
  });

  if (res.status != 200) {
    return null;
  }

  return res.data;
};

export const formatedDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(new Date(date));
};
