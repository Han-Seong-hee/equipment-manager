import Sidebar from "@/app/components/Sidebar";
import EquipmentTable from "../../EquipmentTable";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "../../LogoutButton";

import Link from "next/link";

type Equipment = {
  id: string;
  system: string | null;
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

function getSystemLabel(system: string) {
  return system.replace("_", " ");
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    system: string;
    category: string;
  }>;
}) {
  const { system, category } = await params;

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

  const { data, error } = await supabase.rpc(
  "get_equipment_decrypted",
  {
    p_key: encryptionKey,
    p_system: system,
    p_category: category,
  }
);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-gray-200">
        <h1 className="text-2xl font-bold text-red-400">데이터 조회 오류</h1>
        <p className="mt-4 text-gray-300">{error.message}</p>
      </main>
    );
  }

  let equipmentList = (data ?? []) as Equipment[];



  equipmentList = equipmentList.sort(
    (a, b) => (a.no ?? 999999) - (b.no ?? 999999)
  );

  return (
    <main className="h-screen overflow-hidden bg-gray-950 text-gray-200">
      <div className="flex min-h-screen">
        <Sidebar activeSystem={system} activeCategory={category} />

        <section className="flex h-screen min-w-0 flex-1 flex-col p-6">
          <div className="flex min-h-0 w-full max-w-none flex-1 flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {getSystemLabel(system)} - {category}
                </h1>

                <p className="mt-2 text-gray-400">
                  {getSystemLabel(system)} {category} 장비 목록을 표시합니다.
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

            <EquipmentTable equipmentList={equipmentList} system={system} />

            <p className="mt-4 text-sm text-gray-100">
              행 클릭 시 장비 수정/삭제 가능합니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}