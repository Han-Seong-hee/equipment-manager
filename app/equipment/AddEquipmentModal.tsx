"use client";

import { useState } from "react";
import { addEquipment } from "./actions";

const inputClass =
  "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none";

const labelClass = "mb-1 block text-xs text-gray-400";

export default function AddEquipmentModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        장비 추가
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">장비 추가</h2>
                <p className="mt-1 text-sm text-gray-400">
                  장비 관리 항목 전체를 입력합니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
              >
                닫기
              </button>
            </div>

            <form action={addEquipment}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <label className={labelClass}>No</label>
                  <input name="no" type="number" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>위치</label>
                  <input name="location" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Rack</label>
                  <input name="rack" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Network 센터</label>
                  <input name="network_center" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>운용팀</label>
                  <input name="operation_team" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>담당M</label>
                  <input name="manager" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>분류</label>
                  <select name="category" className={inputClass}>
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
                  <select name="category" className={inputClass}>
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
                  <select name="vendor" className={inputClass}>
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

                <div>
                  <label className={labelClass}>BP</label>
                  <input name="bp" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>기종</label>
                  <input name="model" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>S/N</label>
                  <input name="serial_number" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Hostname</label>
                  <input name="hostname" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>IP Addr</label>
                  <input name="ip_address" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Gateway</label>
                  <input name="gateway" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>OS Ver.</label>
                  <input name="os_version" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>BIOS Ver.</label>
                  <input name="bios_version" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>CPU Model</label>
                  <input name="cpu_model" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>CPU Socket</label>
                  <input name="cpu_socket" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>CPU Core</label>
                  <input name="cpu_core" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Memory</label>
                  <input name="memory" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>DISK</label>
                  <input name="disk" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>ETC</label>
                  <input name="etc" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>자산번호</label>
                  <input name="asset_number" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>SSR 자산번호</label>
                  <input name="ssr_asset_number" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>EDR 설치 여부</label>
                  <select name="edr_installed" className={inputClass}>
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>상태</label>
                  <select name="status" className={inputClass}>
                    <option value="">선택</option>
                    <option value="불용대상">불용대상</option>
                    <option value="비운용">비운용</option>
                    <option value="예비">예비</option>
                    <option value="운용">운용</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>HW 관리구분</label>
                  <select name="hw_manage_type" className={inputClass}>
                    <option value="">선택</option>
                    <option value="NOT">NOT</option>
                    <option value="MA">MA</option>
                    <option value="Wth">Wty</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>OS 관리구분</label>
                  <select name="os_manage_type" className={inputClass}>
                    <option value="">선택</option>
                    <option value="NOT">NOT</option>
                    <option value="MA">MA</option>
                    <option value="Wth">Wty</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Wty Out</label>
                  <input
                    name="warranty_out"
                    className={inputClass}
                    placeholder="예: 2026-01-01"
                  />
                </div>

                <div>
                  <label className={labelClass}>uptime</label>
                  <input
                    disabled
                    className={inputClass}
                    placeholder="Last Boot 입렷 시 자동 계산"
                  />
                </div>

                <div>
                  <label className={labelClass}>Last Boot</label>
                  <input
                    name="last_boot"
                    className={inputClass}
                    placeholder="예: 2026-01-01"
                  />
                </div>

                <div>
                  <label className={labelClass}>H/W EoS</label>
                  <input name="hw_eos" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>불용여부</label>
                  <select name="unused" className={inputClass}>
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>NIC 연결 여부</label>
                  <select name="nic_connected" className={inputClass}>
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>전원</label>
                  <select name="power" className={inputClass}>
                    <option value="">선택</option>
                    <option value="ON">ON</option>
                    <option value="OFF">OFF</option>
                  </select>
                </div>

                <div className="md:col-span-3 lg:col-span-4">
                  <label className={labelClass}>비고</label>
                  <textarea name="note" rows={4} className={inputClass} />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-600"
                >
                  취소
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}