import Link from "next/link";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "./equipment/LogoutButton";

type Equipment = {
  id: string;
  system: string | null;
  category: string | null;
};

const systems = [
  { label: "CATV DHCP", value: "CATV_DHCP" },
  { label: "IPTV DHCP", value: "IPTV_DHCP" },
  { label: "DPG", value: "DPG" },
  { label: "NMS", value: "NMS" },
];

const categories = [
  { label: "전체", value: "" },
  { label: "Server", value: "Server" },
  { label: "Storage", value: "Storage" },
  { label: "L2", value: "L2" },
  { label: "L3", value: "L3" },
  { label: "L4", value: "L4" },
  { label: "FW", value: "FW" },
];

export default async function MainPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Server Component에서는 쿠키 설정 불필요
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const encryptionKey = process.env.EQUIPMENT_ENCRYPTION_KEY;

  if (!encryptionKey) {
    throw new Error("EQUIPMENT_ENCRYPTION_KEY가 설정되지 않았습니다.");
  }

  const { data, error } = await supabase.rpc("get_equipment_decrypted", {
    p_key: encryptionKey,
  });

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-gray-200">
        <h1 className="text-2xl font-bold text-red-400">데이터 조회 오류</h1>
        <p className="mt-4 text-gray-300">{error.message}</p>
      </main>
    );
  }

  const equipmentList = (data ?? []) as Equipment[];

  const getCount = (system: string, category?: string) => {
    return equipmentList.filter((item) => {
      if (item.system !== system) return false;
      if (!category) return true;
      return item.category === category;
    }).length;
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="flex min-h-screen">
        <aside className="sticky left-0 top-0 h-screen w-48 shrink-0 border-r border-gray-800 bg-gray-900 p-5">
          <h2 className="mb-6 text-lg font-bold text-white">장비 관리</h2>

          <nav className="space-y-2">
            <Link
              href="/"
              className="block rounded-lg bg-blue-600 px-4 py-3 text-sm text-white"
            >
              Main Page
            </Link>

            {systems.map((system) => (
              <Link
                key={system.value}
                href={`/equipment/${system.value}`}
                className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                {system.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                장비 관리 시스템 Main Page
              </h1>
              <p className="mt-2 text-gray-400">
                시스템별 장비 현황을 확인합니다.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/change-password"
                className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
              >
                비밀번호 변경
              </Link>

              <LogoutButton />
            </div>
          </div>

          <div className="space-y-8">
            {systems.map((system) => (
              <section
                key={system.value}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-3"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Link
                    href={`/equipment/${system.value}`}
                    className="text-xl font-bold text-white hover:text-blue-400"
                  >
                    {system.label}
                  </Link>

                  <Link
                    href={`/equipment/${system.value}`}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    전체 보기
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
                  {categories.map((category) => {
                    const count = getCount(system.value, category.value);

                    const href = category.value
                      ? `/equipment/${system.value}/${category.value}`
                      : `/equipment/${system.value}`;

                    return (
                      <Link
                        key={`${system.value}-${category.label}`}
                        href={href}
                        className="rounded-xl border border-gray-800 bg-gray-950 p-2 shadow hover:border-blue-500 hover:bg-gray-800"
                      >
                        <p className="text-sm text-gray-500">
                          {category.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-white">
                          {count}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}