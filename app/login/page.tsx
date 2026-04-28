"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-xl bg-gray-900 p-6"
      >
        <h1 className="mb-4 text-xl text-white">로그인</h1>

        <input
          type="email"
          className="mb-3 w-full rounded bg-gray-800 p-2 text-white"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <input
          type="password"
          className="mb-4 w-full rounded bg-gray-800 p-2 text-white"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          로그인
        </button>
      </form>
    </main>
  );
}