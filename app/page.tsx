import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteButton from "./equipment/DeleteButton";
import AddEquipmentModal from "./equipment/AddEquipmentModal";

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

export default async function Home() {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("no", { ascending: true });
    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 p-8 text-gray-200">
        <h1 className="text-2xl font-bold text-red-400">데이터 조회 오류</h1>
        <p className="mt-4 text-gray-300">{error.message}</p>
      </main>
    );
  }

  const equipmentList = (data ?? []) as Equipment[];

  const serverCount = equipmentList.filter(
    (item) => item.category === "Server"
  ).length;

  const storageCount = equipmentList.filter(
    (item) => item.category === "Storage"
  ).length;

  const l2Count = equipmentList.filter(
    (item) => item.category === "L2"
  ).length;

  const l3Count = equipmentList.filter(
    (item) => item.category === "L3"
  ).length;

const l4Count = equipmentList.filter(
  (item) => item.category === "L4"
).length;

const fwCount = equipmentList.filter(
  (item) => item.category === "FW"
).length;

  return (
    <main className="min-h-screen bg-gray-950 p-6 text-gray-200">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">장비 관리 시스템</h1>
          <p className="mt-2 text-gray-400">
            서버, 스토리지, 네트워크 장비 자산 정보를 통합 관리합니다.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
            <p className="text-sm text-gray-500">전체 장비</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {equipmentList.length}
            </p>
          </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
        <p className="text-sm text-gray-500">Server</p>
        <p className="mt-2 text-2xl font-bold text-white">{serverCount}</p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
        <p className="text-sm text-gray-500">Storage</p>
        <p className="mt-2 text-2xl font-bold text-white">{storageCount}</p>
      </div>

         <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
          <p className="text-sm text-gray-500">L2</p>
          <p className="mt-2 text-2xl font-bold text-white">{l2Count}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
          <p className="text-sm text-gray-500">L3</p>
          <p className="mt-2 text-2xl font-bold text-white">{l3Count}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
          <p className="text-sm text-gray-500">L4</p>
          <p className="mt-2 text-2xl font-bold text-white">{l4Count}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow">
          <p className="text-sm text-gray-500">FW</p>
          <p className="mt-2 text-2xl font-bold text-white">{fwCount}</p>
        </div>
      </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Hostname / IP / S/N 검색"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none md:w-96"
          />

          <div className="flex gap-2">
            <AddEquipmentModal />

            <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              엑셀 다운로드
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
          <table className="min-w-[3600px] border-collapse text-sm">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-3 py-3 text-left">No</th>
                <th className="px-3 py-3 text-left">위치</th>
                <th className="px-3 py-3 text-left">Rack</th>
                <th className="px-3 py-3 text-left">Network 센터</th>
                <th className="px-3 py-3 text-left">운용팀</th>
                <th className="px-3 py-3 text-left">담당M</th>
                <th className="px-3 py-3 text-left">분류</th>
                <th className="px-3 py-3 text-left">종류</th>
                <th className="px-3 py-3 text-left">Vender</th>
                <th className="px-3 py-3 text-left">BP</th>
                <th className="px-3 py-3 text-left">기종</th>
                <th className="px-3 py-3 text-left">S/N</th>
                <th className="px-3 py-3 text-left">Hostname</th>
                <th className="px-3 py-3 text-left">IP Addr</th>
                <th className="px-3 py-3 text-left">Gateway</th>
                <th className="px-3 py-3 text-left">OS Ver.</th>
                <th className="px-3 py-3 text-left">BIOS Ver.</th>
                <th className="px-3 py-3 text-left">CPU Model</th>
                <th className="px-3 py-3 text-left">CPU Socket</th>
                <th className="px-3 py-3 text-left">CPU Core</th>
                <th className="px-3 py-3 text-left">Memory</th>
                <th className="px-3 py-3 text-left">DISK</th>
                <th className="px-3 py-3 text-left">ETC</th>
                <th className="px-3 py-3 text-left">자산번호</th>
                <th className="px-3 py-3 text-left">SSR 자산번호</th>
                <th className="px-3 py-3 text-left">EDR 설치 여부</th>
                <th className="px-3 py-3 text-left">상태</th>
                <th className="px-3 py-3 text-left">HW 관리구분</th>
                <th className="px-3 py-3 text-left">OS 관리구분</th>
                <th className="px-3 py-3 text-left">Wty Out</th>
                <th className="px-3 py-3 text-left">uptime</th>
                <th className="px-3 py-3 text-left">Last Boot</th>
                <th className="px-3 py-3 text-left">H/W EoS</th>
                <th className="px-3 py-3 text-left">불용여부</th>
                <th className="px-3 py-3 text-left">NIC 연결 여부</th>
                <th className="px-3 py-3 text-left">전원</th>
                <th className="px-3 py-3 text-left">비고</th>
                <th className="px-3 py-3 text-left">관리</th>
              </tr>
            </thead>

            <tbody>
              {equipmentList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="px-3 py-3">{item.no}</td>
                  <td className="px-3 py-3">{item.location}</td>
                  <td className="px-3 py-3">{item.rack}</td>
                  <td className="px-3 py-3">{item.network_center}</td>
                  <td className="px-3 py-3">{item.operation_team}</td>
                  <td className="px-3 py-3">{item.manager}</td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">{item.type}</td>
                  <td className="px-3 py-3">{item.vendor}</td>
                  <td className="px-3 py-3">{item.bp}</td>
                  <td className="px-3 py-3">{item.model}</td>
                  <td className="px-3 py-3">{item.serial_number}</td>
                  <td className="px-3 py-3 font-medium text-white">
                    {item.hostname}
                  </td>
                  <td className="px-3 py-3 text-blue-300">
                    {item.ip_address}
                  </td>
                  <td className="px-3 py-3">{item.gateway}</td>
                  <td className="px-3 py-3">{item.os_version}</td>
                  <td className="px-3 py-3">{item.bios_version}</td>
                  <td className="px-3 py-3">{item.cpu_model}</td>
                  <td className="px-3 py-3">{item.cpu_socket}</td>
                  <td className="px-3 py-3">{item.cpu_core}</td>
                  <td className="px-3 py-3">{item.memory}</td>
                  <td className="px-3 py-3">{item.disk}</td>
                  <td className="px-3 py-3">{item.etc}</td>
                  <td className="px-3 py-3">{item.asset_number}</td>
                  <td className="px-3 py-3">{item.ssr_asset_number}</td>
                  <td className="px-3 py-3">{item.edr_installed}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.status === "운영"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "점검"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : item.status === "장애"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">{item.hw_manage_type}</td>
                  <td className="px-3 py-3">{item.os_manage_type}</td>
                  <td className="px-3 py-3">{item.warranty_out}</td>
                  <td className="px-3 py-3">{item.uptime}</td>
                  <td className="px-3 py-3">{item.last_boot}</td>
                  <td className="px-3 py-3">{item.hw_eos}</td>
                  <td className="px-3 py-3">{item.unused}</td>
                  <td className="px-3 py-3">{item.nic_connected}</td>
                  <td className="px-3 py-3">{item.power}</td>
                  <td className="px-3 py-3">{item.note}</td>
                  <td className="px-3 py-3">
                    <DeleteButton
                      id={item.id}
                      name={item.hostname || item.ip_address || "장비"}
                    />
                  </td>
                </tr>
              ))}

              {equipmentList.length === 0 && (
                <tr>
                  <td colSpan={38} className="px-4 py-10 text-center text-gray-500">
                    등록된 장비가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          컬럼이 많아 좌우 스크롤로 전체 항목을 확인할 수 있습니다.
        </p>
      </div>
    </main>
  );
}