"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function addEquipment(formData: FormData) {
  const noValue = formData.get("no");

  const { error } = await supabase.from("equipment").insert({
    no: noValue ? Number(noValue) : null,
    location: String(formData.get("location") || ""),
    rack: String(formData.get("rack") || ""),
    network_center: String(formData.get("network_center") || ""),
    operation_team: String(formData.get("operation_team") || ""),
    manager: String(formData.get("manager") || ""),
    category: String(formData.get("category") || ""),
    type: String(formData.get("type") || ""),
    vendor: String(formData.get("vendor") || ""),
    bp: String(formData.get("bp") || ""),
    model: String(formData.get("model") || ""),
    serial_number: String(formData.get("serial_number") || ""),
    hostname: String(formData.get("hostname") || ""),
    ip_address: String(formData.get("ip_address") || ""),
    gateway: String(formData.get("gateway") || ""),
    os_version: String(formData.get("os_version") || ""),
    bios_version: String(formData.get("bios_version") || ""),
    cpu_model: String(formData.get("cpu_model") || ""),
    cpu_socket: String(formData.get("cpu_socket") || ""),
    cpu_core: String(formData.get("cpu_core") || ""),
    memory: String(formData.get("memory") || ""),
    disk: String(formData.get("disk") || ""),
    etc: String(formData.get("etc") || ""),
    asset_number: String(formData.get("asset_number") || ""),
    ssr_asset_number: String(formData.get("ssr_asset_number") || ""),
    edr_installed: String(formData.get("edr_installed") || ""),
    status: String(formData.get("status") || ""),
    hw_manage_type: String(formData.get("hw_manage_type") || ""),
    os_manage_type: String(formData.get("os_manage_type") || ""),
    warranty_out: String(formData.get("warranty_out") || ""),
    uptime: String(formData.get("uptime") || ""),
    last_boot: String(formData.get("last_boot") || ""),
    hw_eos: String(formData.get("hw_eos") || ""),
    unused: String(formData.get("unused") || ""),
    nic_connected: String(formData.get("nic_connected") || ""),
    power: String(formData.get("power") || ""),
    note: String(formData.get("note") || ""),
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function deleteEquipment(formData: FormData) {
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