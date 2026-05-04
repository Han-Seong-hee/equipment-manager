"use client";

import { useState } from "react";
import DeleteSelectedButton from "./DeleteSelectedButton";
import AddEquipmentModal from "./AddEquipmentModal";
import EditEquipmentModal from "./EditEquipmentModal";
import ExcelDownloadButton from "./ExcelDownloadButton";

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
};

function calculateUptime(lastBoot: string | null) {
  if (!lastBoot) return "-";

  const bootDate = new Date(lastBoot);
  const today = new Date();

  if (Number.isNaN(bootDate.getTime())) return "-";

  const diffMs = today.getTime() - bootDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 0) return "미래";

  return `${days}일`;
}

export default function EquipmentTable({
  equipmentList,
}: {
  equipmentList: Equipment[];
}) {
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [searchText, setSearchText] = useState("");

  const filteredList = equipmentList.filter((item) => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) return true;

    return (
      (item.no?.toString() ?? "").includes(keyword) ||
      (item.location ?? "").toLowerCase().includes(keyword) ||
      (item.rack ?? "").toLowerCase().includes(keyword) ||
      (item.network_center ?? "").toLowerCase().includes(keyword) ||
      (item.operation_team ?? "").toLowerCase().includes(keyword) ||
      (item.manager ?? "").toLowerCase().includes(keyword) ||
      (item.category ?? "").toLowerCase().includes(keyword) ||
      (item.type ?? "").toLowerCase().includes(keyword) ||
      (item.vendor ?? "").toLowerCase().includes(keyword) ||
      (item.bp ?? "").toLowerCase().includes(keyword) ||
      (item.model ?? "").toLowerCase().includes(keyword) ||
      (item.serial_number ?? "").toLowerCase().includes(keyword) ||
      (item.hostname ?? "").toLowerCase().includes(keyword) ||
      (item.ip_address ?? "").toLowerCase().includes(keyword) ||
      (item.gateway ?? "").toLowerCase().includes(keyword) ||
      (item.os_version ?? "").toLowerCase().includes(keyword) ||
      (item.status ?? "").toLowerCase().includes(keyword) ||
      (item.asset_number ?? "").toLowerCase().includes(keyword) ||
      (item.ssr_asset_number ?? "").toLowerCase().includes(keyword) ||
      (item.note ?? "").toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Hostname / IP / S/N / 기종 / 분류 / 상태 검색"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none md:w-96"
        />

        <div className="flex gap-2">
          <AddEquipmentModal />

          <EditEquipmentModal selectedItem={selectedItem} />

          <DeleteSelectedButton
            selectedId={selectedId}
            selectedName={selectedName}
          />

          <ExcelDownloadButton equipmentList={filteredList} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
        <table className="min-w-[3600px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-gray-800 text-gray-300">
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
            </tr>
          </thead>

          <tbody>
            {filteredList.map((item) => {
              const name = item.hostname || item.ip_address || "장비";
              const selected = selectedId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setSelectedName(name);
                    setSelectedItem(item);
                  }}
                  className={`cursor-pointer border-b border-gray-800 ${
                    selected ? "bg-blue-900/40" : "hover:bg-gray-800"
                  }`}
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
                  <td className="px-3 py-3">
                    {calculateUptime(item.last_boot)}
                  </td>
                  <td className="px-3 py-3">{item.last_boot}</td>
                  <td className="px-3 py-3">{item.hw_eos}</td>
                  <td className="px-3 py-3">{item.unused}</td>
                  <td className="px-3 py-3">{item.nic_connected}</td>
                  <td className="px-3 py-3">{item.power}</td>
                  <td className="px-3 py-3">{item.note}</td>
                </tr>
              );
            })}

            {filteredList.length === 0 && (
              <tr>
                <td colSpan={37} className="px-4 py-10 text-center text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}