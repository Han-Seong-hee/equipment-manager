"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("새 비밀번호와 확인 비밀번호를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("비밀번호가 변경되었습니다. 다시 로그인해 주세요.");

    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-4 text-gray-200">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold text-white">비밀번호 변경</h1>

        <p className="mb-6 text-sm text-gray-400">
          새 비밀번호를 입력하면 변경 후 자동 로그아웃됩니다.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              새 비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChangePassword();
              }}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChangePassword();
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
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-1/2 cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={loading}
              className="w-1/2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "변경 중..." : "변경"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}