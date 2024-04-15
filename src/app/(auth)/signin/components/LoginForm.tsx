"use client";

import React, { useEffect, useState } from "react";
import Input from "../../../../../components/Input";
import toast from "react-hot-toast";
import { signIn, signOut } from "next-auth/react";

export default function LoginForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok){
      toast.success("Correct login");
      window.location.assign("/");
    } else if (login?.error) {
      toast.error(login?.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-5">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        type="password"
      />
      <div
        onClick={handleLogin}
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
