"use client";

import * as XLSX from "xlsx-js-style";

type Equipment = {
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

export default function ExcelDownloadButton({
  equipmentList,
}: {
  equipmentList: Equipment[];
}) {
  const handleDownload = () => {
    const rows = equipmentList.map((item) => ({
      No: item.no ?? "",
      위치: item.location ?? "",
      Hostname: item.hostname ?? "",
      "IP Addr": item.ip_address ?? "",
      분류: item.category ?? "",
      상태: item.status ?? "",
      uptime: calculateUptime(item.last_boot),
      "Last Boot": item.last_boot ?? "",
    }));

    const ws = XLSX.utils.json_to_sheet(rows);

    // 헤더 스타일
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4EA72E" } },
      alignment: { horizontal: "center" },
    };

    const range = XLSX.utils.decode_range(ws["!ref"]!);

    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (cell) cell.s = headerStyle;
    }

    // 자동 컬럼 너비
    ws["!cols"] = Object.keys(rows[0] ?? {}).map((key) => ({
      wch: Math.max(key.length + 4, 15),
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "장비목록");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `장비목록_${today}.xlsx`);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      엑셀 다운로드
    </button>
  );
}