import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../../libs/AuthOptions";
import { redirect } from "next/navigation";

interface NextAuthSessionProviderProps {
  children: React.ReactNode;
}
export default async function ProtectedRootLayout({
  children,
}: NextAuthSessionProviderProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }
  return <main>{children}</main>;
}
