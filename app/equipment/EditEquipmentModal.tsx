"use client";

import { useState } from "react";
import { updateEquipment } from "./actions";

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

const inputClass =
  "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-[11.5px] focus:border-blue-500 focus:outline-none";

const labelClass = "mb-1 block text-xs text-gray-400";

function TextInput({
  label,
  name,
  value,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  value?: string | number | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export default function EditEquipmentModal({
  selectedItem,
}: {
  selectedItem: Equipment | null;
}) {
  const [open, setOpen] = useState(false);

    const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const openModal = () => {
    if (!selectedItem) {
      alert("수정할 장비 행을 먼저 선택하세요.");
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
      >
        장비 수정
      </button>

      {open && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">장비 수정</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {selectedItem.hostname || selectedItem.ip_address || "선택한 장비"} 정보를 수정합니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
              >
                닫기
              </button>
            </div>

            <form action={updateEquipment}>
              <input
                type="hidden"
                name="return_url"
                value={currentPath}
              />
              <input type="hidden" name="id" value={selectedItem.id} />
              <input type="hidden" name="system" value={selectedItem.system ?? "NMS"} />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <TextInput label="No" name="no" type="number" value={selectedItem.no} />
                <TextInput label="위치" name="location" value={selectedItem.location} />
                <TextInput label="Rack" name="rack" value={selectedItem.rack} />
                <TextInput label="Network 센터" name="network_center" value={selectedItem.network_center} />
                <TextInput label="운용팀" name="operation_team" value={selectedItem.operation_team} />
                <TextInput label="담당M" name="manager" value={selectedItem.manager} />

                <div>
                  <label className={labelClass}>분류</label>
                  <select name="type" defaultValue={selectedItem.type ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="BB_NMS">BB_NMS</option>
                    <option value="BMS">BMS</option>
                    <option value="IPAS">IPAS</option>
                    <option value="FACT">FACT</option>
                    <option value="Finder">Finder</option>
                    <option value="FlowNMS">FlowNMS</option>
                    <option value="FOMS">FOMS</option>
                    <option value="FOMS_DR">FOMS_DR</option>
                    <option value="PODS">PODS</option>
                    <option value="RMS">RMS</option>
                    <option value="RMS_DR">RMS_DR</option>
                    <option value="SuMS">SuMS</option>
                    <option value="TACT">TACT</option>
                    <option value="TEAMS">TEAMS</option>
                    <option value="가입자단말NTP">가입자단말NTP</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>종류</label>
                  <select name="category" defaultValue={selectedItem.category ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="Server">Server</option>
                    <option value="Storage">Storage</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="L4">L4</option>
                    <option value="FW">FW</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Vender</label>
                  <select name="vendor" defaultValue={selectedItem.vendor ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="Cisco">Cisco</option>
                    <option value="Dell">Dell</option>
                    <option value="Fortinet">Fortinet</option>
                    <option value="Fujitsu">Fujitsu</option>
                    <option value="HP">HP</option>
                    <option value="Juniper">Juniper</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="NetAPP">NetApp</option>
                    <option value="Supermicro">Supermicro</option>
                  </select>
                </div>

                <TextInput label="BP" name="bp" value={selectedItem.bp} />
                <TextInput label="기종" name="model" value={selectedItem.model} />
                <TextInput label="S/N" name="serial_number" value={selectedItem.serial_number} />
                <TextInput label="Hostname" name="hostname" value={selectedItem.hostname} />
                <TextInput label="IP Addr" name="ip_address" value={selectedItem.ip_address} />
                <TextInput label="Gateway" name="gateway" value={selectedItem.gateway} />
                <TextInput label="OS Ver." name="os_version" value={selectedItem.os_version} />
                <TextInput label="BIOS Ver." name="bios_version" value={selectedItem.bios_version} />
                <TextInput label="CPU Model" name="cpu_model" value={selectedItem.cpu_model} />
                <TextInput label="CPU Socket" name="cpu_socket" value={selectedItem.cpu_socket} />
                <TextInput label="CPU Core" name="cpu_core" value={selectedItem.cpu_core} />

                <TextInput
                  label="Memory"
                  name="memory"
                  value={selectedItem.memory}
                  placeholder="예: 32GB(DDR4 4GB * 8ea)"
                />

                <TextInput
                  label="DISK"
                  name="disk"
                  value={selectedItem.disk}
                  placeholder="예: 600GB(SAS 15K 600GB * 2ea, RAID1, OS)"
                />

                <TextInput label="ETC" name="etc" value={selectedItem.etc} />
                <TextInput label="자산번호" name="asset_number" value={selectedItem.asset_number} />
                <TextInput label="SSR 자산번호" name="ssr_asset_number" value={selectedItem.ssr_asset_number} />

                <div>
                  <label className={labelClass}>EDR 설치 여부</label>
                  <select
                    name="edr_installed"
                    defaultValue={selectedItem.edr_installed ?? ""}
                    className={inputClass}
                  >
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>상태</label>
                  <select name="status" defaultValue={selectedItem.status ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="불용대상">불용대상</option>
                    <option value="비운용">비운용</option>
                    <option value="예비">예비</option>
                    <option value="운용">운용</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>HW 관리구분</label>
                  <select
                    name="hw_manage_type"
                    defaultValue={selectedItem.hw_manage_type ?? ""}
                    className={inputClass}
                  >
                    <option value="">선택</option>
                    <option value="NOT">NOT</option>
                    <option value="MA">MA</option>
                    <option value="Wth">Wty</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>OS 관리구분</label>
                  <select
                    name="os_manage_type"
                    defaultValue={selectedItem.os_manage_type ?? ""}
                    className={inputClass}
                  >
                    <option value="">선택</option>
                    <option value="NOT">NOT</option>
                    <option value="MA">MA</option>
                    <option value="Wth">Wty</option>
                  </select>
                </div>

                <TextInput
                  label="Wty Out"
                  name="warranty_out"
                  value={selectedItem.warranty_out}
                  placeholder="예: 2026-01-01"
                />

                <div>
                  <label className={labelClass}>uptime</label>
                  <input
                    disabled
                    className={inputClass}
                    placeholder="Last Boot 입력 시 자동 계산"
                  />
                </div>

                <TextInput
                  label="Last Boot"
                  name="last_boot"
                  value={selectedItem.last_boot}
                  placeholder="예: 2026-01-01"
                />

                <TextInput label="H/W EoS" name="hw_eos" value={selectedItem.hw_eos} />

                <div>
                  <label className={labelClass}>불용여부</label>
                  <select name="unused" defaultValue={selectedItem.unused ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>NIC 연결 여부</label>
                  <select
                    name="nic_connected"
                    defaultValue={selectedItem.nic_connected ?? ""}
                    className={inputClass}
                  >
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>전원</label>
                  <select name="power" defaultValue={selectedItem.power ?? ""} className={inputClass}>
                    <option value="">선택</option>
                    <option value="ON">On</option>
                    <option value="OFF">Off</option>
                  </select>
                </div>

                <div className="md:col-span-3 lg:col-span-4">
                  <label className={labelClass}>비고</label>
                  <textarea
                    name="note"
                    rows={4}
                    defaultValue={selectedItem.note ?? ""}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-600"
                >
                  취소
                </button>

                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-yellow-600 px-5 py-2 text-white hover:bg-yellow-700"
                >
                  수정 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}