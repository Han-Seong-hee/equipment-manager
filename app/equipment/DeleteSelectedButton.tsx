"use client";

import { deleteEquipment } from "./actions";

export default function DeleteSelectedButton({
  selectedId,
  selectedName,
}: {
  selectedId: string;
  selectedName: string;
}) {
  return (
    <form
      action={deleteEquipment}
      onSubmit={(event) => {
        if (!selectedId) {
          event.preventDefault();
          alert("삭제할 장비 행을 먼저 선택하세요.");
          return;
        }

        const confirmed = window.confirm(
          `"${selectedName}" 장비를 정말 삭제하시겠습니까?\n\n삭제 후에는 복구하기 어렵습니다.`
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={selectedId} />

      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        장비 삭제
      </button>
    </form>
  );
}