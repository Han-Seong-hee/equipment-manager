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

  const diffMs = today.getTime() - bootDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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
    const keyword = searchText.toLowerCase();

    return (
      (item.hostname ?? "").toLowerCase().includes(keyword) ||
      (item.ip_address ?? "").toLowerCase().includes(keyword) ||
      (item.category ?? "").toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="검색"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 md:w-96"
        />

        <div className="flex flex-wrap gap-2">
          <AddEquipmentModal />
          <EditEquipmentModal selectedItem={selectedItem} />
          <DeleteSelectedButton
            selectedId={selectedId}
            selectedName={selectedName}
          />
          <ExcelDownloadButton equipmentList={filteredList} />
        </div>
      </div>

      <div className="hidden min-h-0 flex-1 overflow-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg md:block">
        <table className="min-w-[1600px] border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-800 text-gray-300">
            <tr>
              <th className="px-3 py-3 text-left">No</th>
              <th className="px-3 py-3 text-left">Hostname</th>
              <th className="px-3 py-3 text-left">IP</th>
              <th className="px-3 py-3 text-left">분류</th>
              <th className="px-3 py-3 text-left">Vendor</th>
              <th className="px-3 py-3 text-left">Model</th>
              <th className="px-3 py-3 text-left">상태</th>
              <th className="px-3 py-3 text-left">Uptime</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map((item) => {
              const selected = selectedId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setSelectedName(item.hostname ?? "");
                    setSelectedItem(item);
                  }}
                  className={`cursor-pointer border-b border-gray-800 ${
                    selected ? "bg-blue-900/40" : "hover:bg-gray-800"
                  }`}
                >
                  <td className="px-3 py-3">{item.no}</td>
                  <td className="px-3 py-3">{item.hostname}</td>
                  <td className="px-3 py-3">{item.ip_address}</td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">{item.vendor}</td>
                  <td className="px-3 py-3">{item.model}</td>
                  <td className="px-3 py-3">{item.status}</td>
                  <td className="px-3 py-3">
                    {calculateUptime(item.last_boot)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {filteredList.map((item) => {
          const selected = selectedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                setSelectedName(item.hostname ?? "");
                setSelectedItem(item);
              }}
              className={`rounded-xl border p-4 ${
                selected
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-800 bg-gray-900"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-bold text-white">
                    {item.hostname}
                  </p>

                  <p className="mt-1 text-sm text-blue-300">
                    {item.ip_address}
                  </p>
                </div>

                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                  {item.category}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-400">
                <p>위치: {item.location || "-"}</p>
                <p>상태: {item.status || "-"}</p>
                <p>모델: {item.model || "-"}</p>
                <p>Vendor: {item.vendor || "-"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
