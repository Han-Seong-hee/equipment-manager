"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function addEquipment(formData: FormData) {
  const category = String(formData.get("category") || "");
  const name = String(formData.get("name") || "");
  const ip_address = String(formData.get("ip_address") || "");
  const vendor = String(formData.get("vendor") || "");
  const model = String(formData.get("model") || "");
  const os_version = String(formData.get("os_version") || "");
  const location = String(formData.get("location") || "");
  const purpose = String(formData.get("purpose") || "");
  const status = String(formData.get("status") || "운영");
  const manager = String(formData.get("manager") || "");
  const note = String(formData.get("note") || "");

  if (!category || !name) {
    throw new Error("구분과 장비명은 필수입니다.");
  }

  const { error } = await supabase.from("equipment").insert({
    category,
    name,
    ip_address,
    vendor,
    model,
    os_version,
    location,
    purpose,
    status,
    manager,
    note,
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