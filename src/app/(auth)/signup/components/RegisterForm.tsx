"use client";

import React, { useState } from "react";
import Input from "../../../../../components/input";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("/api/register", {
        email,
        password,
      });

      //   signIn("credentials", {
      //     email,
      //     password,
      //     redirect: false,
      //   });

      toast.success("Registered Successfully");

      router.push("/signin");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
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
        onClick={handleRegister}
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70"
      >
        Register
      </div>
    </div>
  );
}
