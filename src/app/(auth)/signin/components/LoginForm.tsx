"use client";

import React, { useState } from "react";
import Input from "../../../../../components/input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {};

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
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70"
      >
        Login
      </div>
    </div>
  );
}
