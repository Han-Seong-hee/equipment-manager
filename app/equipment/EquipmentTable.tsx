"use client";

import { useState } from "react";
import DeleteSelectedButton from "./DeleteSelectedButton";
import AddEquipmentModal from "./AddEquipmentModal";
import EditEquipmentModal from "./EditEquipmentModal";
import ExcelDownloadButton from "./ExcelDownloadButton";

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
};

function calculateUptime(lastBoot: string | null) {
  if (!lastBoot) return "";

  const bootDate = new Date(lastBoot);
  const today = new Date();

  if (Number.isNaN(bootDate.getTime())) return "";

  const diffMs = today.getTime() - bootDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return days < 0 ? "미래 날짜" : `${days}일`;
}

export default function EquipmentTable({
  equipmentList,
  system = "NMS",
}: {
  equipmentList: Equipment[];
  system?: string;
}) {
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [searchText, setSearchText] = useState("");

  const filteredList = equipmentList.filter((item) => {
    const keyword = searchText.toLowerCase();

    return (
      (item.hostname ?? "").toLowerCase().includes(keyword) ||
      (item.ip_address ?? "").toLowerCase().includes(keyword) ||
      (item.serial_number ?? "").toLowerCase().includes(keyword) ||
      (item.model ?? "").toLowerCase().includes(keyword) ||
      (item.category ?? "").toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      {/* 검색 + 버튼 */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Hostname / IP / S/N / 기종 검색"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none md:w-96"
        />

        <div className="flex flex-wrap gap-2">
          <AddEquipmentModal system={system} />

          <EditEquipmentModal selectedItem={selectedItem} />

          <DeleteSelectedButton
            selectedId={selectedId}
            selectedName={selectedName}
          />

          <ExcelDownloadButton equipmentList={filteredList} />
        </div>
      </div>

      {/* 테이블 */}
      <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
        <table className="min-w-[3600px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-gray-800 text-gray-300">
            <tr>
              <th className="px-3 py-3 text-left">No</th>
              <th className="px-3 py-3 text-left">위치</th>
              <th className="px-3 py-3 text-left">Rack</th>
              <th className="px-3 py-3 text-left">Network 센터</th>
              <th className="px-3 py-3 text-left">운용팀</th>
              <th className="w-[120px] px-2 py-3 text-left"> 담당자</th>
              <th className="px-3 py-3 text-left">분류</th>
              <th className="px-3 py-3 text-left">종류</th>
              <th className="px-3 py-3 text-left">Vendor</th>
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
              <th className="px-3 py-3 text-left">Disk</th>
              <th className="px-3 py-3 text-left">ETC</th>
              <th className="px-3 py-3 text-left">자산번호</th>
              <th className="px-3 py-3 text-left">SSR 자산번호</th>
              <th className="px-3 py-3 text-left">EDR</th>
              <th className="px-3 py-3 text-left">상태</th>
              <th className="px-3 py-3 text-left">HW 관리</th>
              <th className="px-3 py-3 text-left">OS 관리</th>
              <th className="px-3 py-3 text-left">Warranty</th>
              <th className="px-3 py-3 text-left">Uptime</th>
              <th className="px-3 py-3 text-left">Last Boot</th>
              <th className="px-3 py-3 text-left">HW EOS</th>
              <th className="px-3 py-3 text-left">불용</th>
              <th className="px-3 py-3 text-left">NIC</th>
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
                  <td className="px-3 py-3">{item.hostname}</td>
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
                  <td className="px-3 py-3">{item.status}</td>
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
                <td
                  colSpan={37}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  등록된 장비가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}