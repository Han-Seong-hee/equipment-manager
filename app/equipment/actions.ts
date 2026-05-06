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

function getString(formData: FormData, name: string) {
  return String(formData.get(name) || "");
}

function getNumberOrNull(formData: FormData, name: string) {
  const value = formData.get(name);

  if (!value) {
    return null;
  }

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

export async function addEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const encryptionKey = getEncryptionKey();

  const { error } = await supabase.rpc("insert_equipment_encrypted", {
    p_key: encryptionKey,

    // No 자동 증가는 Supabase SQL 함수에서 처리합니다.
    // Add 화면에서 no를 입력하지 않으면 null 전달 → SQL 함수에서 nextval 처리
    p_no: getNumberOrNull(formData, "no"),

    p_location: getString(formData, "location"),
    p_rack: getString(formData, "rack"),
    p_network_center: getString(formData, "network_center"),
    p_operation_team: getString(formData, "operation_team"),
    p_manager: getString(formData, "manager"),

    p_category: getString(formData, "category"),
    p_type: getString(formData, "type"),
    p_vendor: getString(formData, "vendor"),
    p_bp: getString(formData, "bp"),
    p_model: getString(formData, "model"),

    p_serial_number: getString(formData, "serial_number"),
    p_hostname: getString(formData, "hostname"),
    p_ip_address: getString(formData, "ip_address"),
    p_gateway: getString(formData, "gateway"),

    p_os_version: getString(formData, "os_version"),
    p_bios_version: getString(formData, "bios_version"),
    p_cpu_model: getString(formData, "cpu_model"),
    p_cpu_socket: getString(formData, "cpu_socket"),
    p_cpu_core: getString(formData, "cpu_core"),
    p_memory: getString(formData, "memory"),
    p_disk: getString(formData, "disk"),
    p_etc: getString(formData, "etc"),

    p_asset_number: getString(formData, "asset_number"),
    p_ssr_asset_number: getString(formData, "ssr_asset_number"),

    p_edr_installed: getString(formData, "edr_installed"),
    p_status: getString(formData, "status"),
    p_hw_manage_type: getString(formData, "hw_manage_type"),
    p_os_manage_type: getString(formData, "os_manage_type"),
    p_warranty_out: getString(formData, "warranty_out"),
    p_last_boot: getString(formData, "last_boot"),
    p_hw_eos: getString(formData, "hw_eos"),
    p_unused: getString(formData, "unused"),
    p_nic_connected: getString(formData, "nic_connected"),
    p_power: getString(formData, "power"),
    p_note: getString(formData, "note"),
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function deleteEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const id = getString(formData, "id");

  if (!id) {
    throw new Error("삭제할 장비 ID가 없습니다.");
  }

  const { error } = await supabase.from("equipment").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function updateEquipment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const encryptionKey = getEncryptionKey();

  const id = getString(formData, "id");

  if (!id) {
    throw new Error("장비 ID가 없습니다.");
  }

  const { error } = await supabase.rpc("update_equipment_encrypted", {
    p_key: encryptionKey,
    p_id: id,

    // 수정 화면에서는 기존 No를 유지하거나 사용자가 변경한 값을 저장합니다.
    p_no: getNumberOrNull(formData, "no"),

    p_location: getString(formData, "location"),
    p_rack: getString(formData, "rack"),
    p_network_center: getString(formData, "network_center"),
    p_operation_team: getString(formData, "operation_team"),
    p_manager: getString(formData, "manager"),

    p_category: getString(formData, "category"),
    p_type: getString(formData, "type"),
    p_vendor: getString(formData, "vendor"),
    p_bp: getString(formData, "bp"),
    p_model: getString(formData, "model"),

    p_serial_number: getString(formData, "serial_number"),
    p_hostname: getString(formData, "hostname"),
    p_ip_address: getString(formData, "ip_address"),
    p_gateway: getString(formData, "gateway"),

    p_os_version: getString(formData, "os_version"),
    p_bios_version: getString(formData, "bios_version"),
    p_cpu_model: getString(formData, "cpu_model"),
    p_cpu_socket: getString(formData, "cpu_socket"),
    p_cpu_core: getString(formData, "cpu_core"),
    p_memory: getString(formData, "memory"),
    p_disk: getString(formData, "disk"),
    p_etc: getString(formData, "etc"),

    p_asset_number: getString(formData, "asset_number"),
    p_ssr_asset_number: getString(formData, "ssr_asset_number"),

    p_edr_installed: getString(formData, "edr_installed"),
    p_status: getString(formData, "status"),
    p_hw_manage_type: getString(formData, "hw_manage_type"),
    p_os_manage_type: getString(formData, "os_manage_type"),
    p_warranty_out: getString(formData, "warranty_out"),
    p_last_boot: getString(formData, "last_boot"),
    p_hw_eos: getString(formData, "hw_eos"),
    p_unused: getString(formData, "unused"),
    p_nic_connected: getString(formData, "nic_connected"),
    p_power: getString(formData, "power"),
    p_note: getString(formData, "note"),
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}