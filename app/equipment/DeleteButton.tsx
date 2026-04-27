"use client";

import { deleteEquipment } from "./actions";

type DeleteButtonProps = {
  id: string;
  name: string;
};

export default function DeleteButton({ id, name }: DeleteButtonProps) {
  return (
    <form
      action={deleteEquipment}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `"${name}" 장비를 정말 삭제하시겠습니까?\n\n삭제 후에는 복구하기 어렵습니다.`
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        삭제
      </button>
    </form>
  );
}