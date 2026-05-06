"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getEncryptionKey() {
  const key = process.env.EQUIPMENT_ENCRYPTION_KEY;

  if (!key) {
    throw new Error("EQUIPMENT_ENCRYPTION_KEY가 설정되지 않았습니다.");
  }

  return key;
}

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Server Action에서는 현재 구조상 별도 설정 불필요
        },
      },
    }
  );
}

export async function addEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const encryptionKey = getEncryptionKey();

  const noValue = formData.get("no");

  const { error } = await supabase.rpc(
    "insert_equipment_encrypted",
    {
      p_key: encryptionKey,

      p_no: noValue ? Number(noValue) : null,

      p_location: String(formData.get("location") || ""),
      p_rack: String(formData.get("rack") || ""),
      p_network_center: String(formData.get("network_center") || ""),
      p_operation_team: String(formData.get("operation_team") || ""),
      p_manager: String(formData.get("manager") || ""),

      p_category: String(formData.get("category") || ""),
      p_type: String(formData.get("type") || ""),
      p_vendor: String(formData.get("vendor") || ""),
      p_bp: String(formData.get("bp") || ""),
      p_model: String(formData.get("model") || ""),

      p_serial_number: String(formData.get("serial_number") || ""),

      p_hostname: String(formData.get("hostname") || ""),

      p_ip_address: String(formData.get("ip_address") || ""),

      p_gateway: String(formData.get("gateway") || ""),

      p_os_version: String(formData.get("os_version") || ""),
      p_bios_version: String(formData.get("bios_version") || ""),
      p_cpu_model: String(formData.get("cpu_model") || ""),
      p_cpu_socket: String(formData.get("cpu_socket") || ""),
      p_cpu_core: String(formData.get("cpu_core") || ""),
      p_memory: String(formData.get("memory") || ""),
      p_disk: String(formData.get("disk") || ""),
      p_etc: String(formData.get("etc") || ""),

      p_asset_number: String(formData.get("asset_number") || ""),

      p_ssr_asset_number: String(formData.get("ssr_asset_number") || ""),
      p_edr_installed: String(formData.get("edr_installed") || ""),
      p_status: String(formData.get("status") || ""),
      p_hw_manage_type: String(formData.get("hw_manage_type") || ""),
      p_os_manage_type: String(formData.get("os_manage_type") || ""),
      p_warranty_out: String(formData.get("warranty_out") || ""),
      p_last_boot: String(formData.get("last_boot") || ""),
      p_hw_eos: String(formData.get("hw_eos") || ""),
      p_unused: String(formData.get("unused") || ""),
      p_nic_connected: String(formData.get("nic_connected") || ""),
      p_power: String(formData.get("power") || ""),
      p_note: String(formData.get("note") || ""),
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function deleteEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("삭제할 장비 ID가 없습니다.");
  }

  const { error } = await supabase
    .from("equipment")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function updateEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const encryptionKey = getEncryptionKey();

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("장비 ID가 없습니다.");
  }

  const noValue = formData.get("no");

  const { error } = await supabase.rpc(
    "update_equipment_encrypted",
    {
      p_key: encryptionKey,
      p_id: id,

      p_no: noValue ? Number(noValue) : null,

      p_location: String(formData.get("location") || ""),
      p_rack: String(formData.get("rack") || ""),
      p_network_center: String(formData.get("network_center") || ""),
      p_operation_team: String(formData.get("operation_team") || ""),
      p_manager: String(formData.get("manager") || ""),

      p_category: String(formData.get("category") || ""),
      p_type: String(formData.get("type") || ""),
      p_vendor: String(formData.get("vendor") || ""),
      p_bp: String(formData.get("bp") || ""),
      p_model: String(formData.get("model") || ""),

      p_serial_number: String(formData.get("serial_number") || ""),

      p_hostname: String(formData.get("hostname") || ""),

      p_ip_address: String(formData.get("ip_address") || ""),

      p_gateway: String(formData.get("gateway") || ""),

      p_os_version: String(formData.get("os_version") || ""),
      p_bios_version: String(formData.get("bios_version") || ""),
      p_cpu_model: String(formData.get("cpu_model") || ""),
      p_cpu_socket: String(formData.get("cpu_socket") || ""),
      p_cpu_core: String(formData.get("cpu_core") || ""),
      p_memory: String(formData.get("memory") || ""),
      p_disk: String(formData.get("disk") || ""),
      p_etc: String(formData.get("etc") || ""),

      p_asset_number: String(formData.get("asset_number") || ""),

      p_ssr_asset_number: String(formData.get("ssr_asset_number") || ""),
      p_edr_installed: String(formData.get("edr_installed") || ""),
      p_status: String(formData.get("status") || ""),
      p_hw_manage_type: String(formData.get("hw_manage_type") || ""),
      p_os_manage_type: String(formData.get("os_manage_type") || ""),
      p_warranty_out: String(formData.get("warranty_out") || ""),
      p_last_boot: String(formData.get("last_boot") || ""),
      p_hw_eos: String(formData.get("hw_eos") || ""),
      p_unused: String(formData.get("unused") || ""),
      p_nic_connected: String(formData.get("nic_connected") || ""),
      p_power: String(formData.get("power") || ""),
      p_note: String(formData.get("note") || ""),
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}