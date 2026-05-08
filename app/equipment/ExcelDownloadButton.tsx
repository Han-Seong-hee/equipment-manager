"use client";

import ExcelJS from "exceljs";

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
  const handleDownload = async () => {
    if (equipmentList.length === 0) {
      alert("다운로드할 장비 목록이 없습니다.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("장비목록");

    worksheet.columns = [
      { header: "No", key: "no", width: 8 },
      { header: "위치", key: "location", width: 14 },
      { header: "Rack", key: "rack", width: 12 },
      { header: "Network 센터", key: "network_center", width: 18 },
      { header: "운용팀", key: "operation_team", width: 16 },
      { header: "담당M", key: "manager", width: 14 },
      { header: "분류", key: "category", width: 12 },
      { header: "종류", key: "type", width: 12 },
      { header: "Vender", key: "vendor", width: 14 },
      { header: "BP", key: "bp", width: 14 },
      { header: "기종", key: "model", width: 22 },
      { header: "S/N", key: "serial_number", width: 22 },
      { header: "Hostname", key: "hostname", width: 22 },
      { header: "IP Addr", key: "ip_address", width: 18 },
      { header: "Gateway", key: "gateway", width: 18 },
      { header: "OS Ver.", key: "os_version", width: 18 },
      { header: "BIOS Ver.", key: "bios_version", width: 16 },
      { header: "CPU Model", key: "cpu_model", width: 24 },
      { header: "CPU Socket", key: "cpu_socket", width: 12 },
      { header: "CPU Core", key: "cpu_core", width: 12 },
      { header: "Memory", key: "memory", width: 14 },
      { header: "DISK", key: "disk", width: 18 },
      { header: "ETC", key: "etc", width: 18 },
      { header: "자산번호", key: "asset_number", width: 18 },
      { header: "SSR 자산번호", key: "ssr_asset_number", width: 18 },
      { header: "EDR 설치 여부", key: "edr_installed", width: 16 },
      { header: "상태", key: "status", width: 12 },
      { header: "HW 관리구분", key: "hw_manage_type", width: 16 },
      { header: "OS 관리구분", key: "os_manage_type", width: 16 },
      { header: "Wty Out", key: "warranty_out", width: 12 },
      { header: "uptime", key: "uptime", width: 12 },
      { header: "Last Boot", key: "last_boot", width: 14 },
      { header: "H/W EoS", key: "hw_eos", width: 14 },
      { header: "불용여부", key: "unused", width: 12 },
      { header: "NIC 연결 여부", key: "nic_connected", width: 16 },
      { header: "전원", key: "power", width: 10 },
      { header: "비고", key: "note", width: 30 },
    ];

    equipmentList.forEach((item) => {
      worksheet.addRow({
        no: item.no ?? "",
        location: item.location ?? "",
        rack: item.rack ?? "",
        network_center: item.network_center ?? "",
        operation_team: item.operation_team ?? "",
        manager: item.manager ?? "",
        category: item.category ?? "",
        type: item.type ?? "",
        vendor: item.vendor ?? "",
        bp: item.bp ?? "",
        model: item.model ?? "",
        serial_number: item.serial_number ?? "",
        hostname: item.hostname ?? "",
        ip_address: item.ip_address ?? "",
        gateway: item.gateway ?? "",
        os_version: item.os_version ?? "",
        bios_version: item.bios_version ?? "",
        cpu_model: item.cpu_model ?? "",
        cpu_socket: item.cpu_socket ?? "",
        cpu_core: item.cpu_core ?? "",
        memory: item.memory ?? "",
        disk: item.disk ?? "",
        etc: item.etc ?? "",
        asset_number: item.asset_number ?? "",
        ssr_asset_number: item.ssr_asset_number ?? "",
        edr_installed: item.edr_installed ?? "",
        status: item.status ?? "",
        hw_manage_type: item.hw_manage_type ?? "",
        os_manage_type: item.os_manage_type ?? "",
        warranty_out: item.warranty_out ?? "",
        uptime: calculateUptime(item.last_boot),
        last_boot: item.last_boot ?? "",
        hw_eos: item.hw_eos ?? "",
        unused: item.unused ?? "",
        nic_connected: item.nic_connected ?? "",
        power: item.power ?? "",
        note: item.note ?? "",
      });
    });

    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    worksheet.autoFilter = {
      from: "A1",
      to: "AK1",
    };

    worksheet.getRow(1).height = 24;

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "medium" },
          left: { style: "medium" },
          bottom: { style: "medium" },
          right: { style: "medium" },
        };

        cell.alignment = {
          vertical: "middle",
          horizontal: rowNumber === 1 ? "center" : "left",
          wrapText: true,
        };

        if (rowNumber === 1) {
          cell.font = {
            bold: true,
            color: { argb: "FFFFFFFF" },
          };

          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4EA72E" },
          };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const today = new Date().toISOString().slice(0, 10);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `장비목록_${today}.xlsx`;
    a.click();

    window.URL.revokeObjectURL(url);
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