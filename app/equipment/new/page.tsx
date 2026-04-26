import Link from "next/link";
import { addEquipment } from "../actions";

export default function NewEquipmentPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-8 text-gray-200">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">
            ← 목록으로 돌아가기
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-white">장비 추가</h1>
          <p className="mt-2 text-gray-400">
            서버, 스토리지, 네트워크 장비 정보를 입력합니다.
          </p>
        </div>

        <form action={addEquipment} className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">구분 *</label>
              <select
                name="category"
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="">선택</option>
                <option value="서버">서버</option>
                <option value="스토리지">스토리지</option>
                <option value="네트워크">네트워크</option>
                <option value="방화벽">방화벽</option>
                <option value="L4">L4</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">장비명 *</label>
              <input
                name="name"
                required
                placeholder="예: WEB-SVR-01"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">IP 주소</label>
              <input
                name="ip_address"
                placeholder="예: 192.168.0.10"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">제조사</label>
              <input
                name="vendor"
                placeholder="예: Dell, HP, Juniper"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">모델</label>
              <input
                name="model"
                placeholder="예: PowerEdge R740"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">OS / 펌웨어</label>
              <input
                name="os_version"
                placeholder="예: Rocky Linux 8.10"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">위치</label>
              <input
                name="location"
                placeholder="예: 전산실 Rack 1"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">용도</label>
              <input
                name="purpose"
                placeholder="예: 웹 서버, 방화벽"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">상태</label>
              <select
                name="status"
                defaultValue="운영"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="운영">운영</option>
                <option value="점검">점검</option>
                <option value="장애">장애</option>
                <option value="예비">예비</option>
                <option value="폐기">폐기</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">담당자</label>
              <input
                name="manager"
                placeholder="예: 관리자"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-400">비고</label>
              <textarea
                name="note"
                rows={4}
                placeholder="특이사항 입력"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link
              href="/"
              className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-600"
            >
              취소
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}