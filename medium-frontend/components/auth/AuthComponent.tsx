import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AuthComponent({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
