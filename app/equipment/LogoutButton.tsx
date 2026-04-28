"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
    >
      로그아웃
    </button>
  );
}