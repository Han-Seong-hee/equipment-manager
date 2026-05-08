import Link from "next/link";
import EquipmentTable from "./equipment/EquipmentTable";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "./equipment/LogoutButton";

type Equipment = {
  id: string;
  no: number | null;
  location: string | null;
  rack: string | null;
  network_center: string | null;
  operation_team: string | null;
  manager: string | null;
  category: string | null;
  type: string | null;
  vendor: string | null;
  bp: string | null;
  model: string | null;
  serial_number: string | null;
  hostname: string | null;
  ip_address: string | null;
  gateway: string | null;
  os_version: string | null;
  bios_version: string | null;
  cpu_model: string | null;
  cpu_socket: string | null;
  cpu_core: string | null;
  memory: string | null;
  disk: string | null;
  etc: string | null;
  asset_number: string | null;
  ssr_asset_number: string | null;
  edr_installed: string | null;
  status: string | null;
  hw_manage_type: string | null;
  os_manage_type: string | null;
  warranty_out: string | null;
  uptime: string | null;
  last_boot: string | null;
  hw_eos: string | null;
  unused: string | null;
  nic_connected: string | null;
  power: string | null;
  note: string | null;
  created_at: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
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

  let equipmentList = (data ?? []) as Equipment[];

  if (selectedCategory) {
    equipmentList = equipmentList.filter(
      (item) => item.category === selectedCategory
    );
  }

  equipmentList = equipmentList.sort(
    (a, b) => (a.no ?? 999999) - (b.no ?? 999999)
  );

  const menuItems = [
    { label: "전체", value: "" },
    { label: "Server", value: "Server" },
    { label: "Storage", value: "Storage" },
    { label: "L2", value: "L2" },
    { label: "L3", value: "L3" },
    { label: "L4", value: "L4" },
    { label: "FW", value: "FW" },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 md:h-screen md:overflow-hidden">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full shrink-0 border-b border-gray-800 bg-gray-900 p-3 md:sticky md:left-0 md:top-0 md:h-screen md:w-40 md:border-b-0 md:border-r md:p-5">
          <h2 className="mb-4 text-lg font-bold text-white">장비 분류</h2>

          <nav className="flex gap-2 overflow-x-auto md:block md:space-y-2">
            {menuItems.map((menu) => {
              const href = menu.value ? `/?category=${menu.value}` : "/";
              const active =
                (!selectedCategory && menu.value === "") ||
                selectedCategory === menu.value;

              return (
                <Link
                  key={menu.label}
                  href={href}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col p-3 md:h-screen md:p-6">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                장비 관리 시스템
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                {selectedCategory
                  ? `${selectedCategory} 장비 목록`
                  : "전체 장비 목록"}
              </p>
            </div>

            <LogoutButton />
          </div>

          <EquipmentTable equipmentList={equipmentList} />
        </section>
      </div>
    </main>
  );
}
