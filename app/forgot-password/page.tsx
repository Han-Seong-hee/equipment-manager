"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function ForgotPasswordPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setMessage("");

    if (!email) {
      setMessage("이메일을 입력하세요.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "https://equipment-manager-tawny.vercel.app/change-password",
      }
    );

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "비밀번호 재설정 이메일을 전송했습니다."
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-4 text-gray-200">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold text-white">
          비밀번호 찾기
        </h1>

        <p className="mb-6 text-sm text-gray-400">
          가입된 이메일 주소를 입력하세요.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              이메일
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResetPassword();
                }
              }}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {message && (
            <div className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-300">
              {message}
            </div>
          )}

          <div className="flex gap-2">
            <Link
              href="/login"
              className="flex w-1/2 items-center justify-center rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
            >
              로그인
            </Link>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "전송 중..."
                : "재설정 메일"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}