import Link from "next/link";
import AddEquipmentModal from "./equipment/AddEquipmentModal";
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

  let query = supabase
    .from("equipment")
    .select("*")
    .order("no", { ascending: true });

  if (selectedCategory) {
    query = query.eq("category", selectedCategory);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-gray-200">
        <h1 className="text-2xl font-bold text-red-400">데이터 조회 오류</h1>
        <p className="mt-4 text-gray-300">{error.message}</p>
      </main>
    );
  }

  const equipmentList = (data ?? []) as Equipment[];

  const serverCount = equipmentList.filter((item) => item.category === "Server").length;
  const storageCount = equipmentList.filter((item) => item.category === "Storage").length;
  const l2Count = equipmentList.filter((item) => item.category === "L2").length;
  const l3Count = equipmentList.filter((item) => item.category === "L3").length;
  const l4Count = equipmentList.filter((item) => item.category === "L4").length;
  const fwCount = equipmentList.filter((item) => item.category === "FW").length;

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
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="flex min-h-screen">
        <aside className="sticky left-0 top-0 h-screen w-40 shrink-0 border-r border-gray-800 bg-gray-900 p-5">
          <h2 className="mb-6 text-lg font-bold text-white">장비 분류</h2>

          <nav className="space-y-2">
            {menuItems.map((menu) => {
              const href = menu.value ? `/?category=${menu.value}` : "/";
              const active =
                (!selectedCategory && menu.value === "") ||
                selectedCategory === menu.value;

              return (
                <Link
                  key={menu.label}
                  href={href}
                  className={`block cursor-pointer rounded-lg px-4 py-3 text-sm ${
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

        <section className="min-w-0 flex-1 p-6">
          <div className="mx-auto max-w-[1800px]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">장비 관리 시스템</h1>
                <p className="mt-2 text-gray-400">
                  {selectedCategory
                    ? `${selectedCategory} 장비 목록을 표시합니다.`
                    : "전체 장비 목록을 표시합니다."}
                </p>
              </div>

              <LogoutButton />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-7">
              <Card title="현재 목록" value={equipmentList.length} />
              <Card title="Server" value={serverCount} />
              <Card title="Storage" value={storageCount} />
              <Card title="L2" value={l2Count} />
              <Card title="L3" value={l3Count} />
              <Card title="L4" value={l4Count} />
              <Card title="FW" value={fwCount} />
            </div>

            <EquipmentTable equipmentList={equipmentList} />

            <p className="mt-4 text-sm text-gray-500">
              행을 클릭하면 선택됩니다. 선택 후 장비 삭제 버튼으로 삭제할 수 있습니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}