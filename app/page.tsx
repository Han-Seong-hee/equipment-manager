import { supabase } from "@/lib/supabase";

type Equipment = {
  id: string;
  category: string;
  name: string;
  vendor: string | null;
  model: string | null;
  ip_address: string | null;
  os_version: string | null;
  location: string | null;
  status: string | null;
  manager: string | null;
  created_at: string;
};

export default async function Home() {
  const { data } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false });

  const equipmentList = (data ?? []) as Equipment[];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            장비 관리 시스템
          </h1>
          <p className="mt-2 text-gray-400">
            서버 / 스토리지 / 네트워크 장비 통합 관리
          </p>
        </div>

        {/* 상단 버튼 */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between gap-3">
          <input
            placeholder="장비명 또는 IP 검색"
            className="bg-gray-800 border border-gray-700 text-gray-200 px-4 py-2 rounded-lg md:w-80 focus:outline-none focus:border-blue-500"
          />

          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              장비 추가
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
              엑셀 다운로드
            </button>
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto rounded-xl bg-gray-900 shadow-lg border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">구분</th>
                <th className="px-4 py-3 text-left">장비명</th>
                <th className="px-4 py-3 text-left">IP</th>
                <th className="px-4 py-3 text-left">제조사</th>
                <th className="px-4 py-3 text-left">모델</th>
                <th className="px-4 py-3 text-left">OS</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">위치</th>
                <th className="px-4 py-3 text-left">담당자</th>
              </tr>
            </thead>

            <tbody>
              {equipmentList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-gray-400">{item.category}</td>
                  <td className="px-4 py-3 text-white font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-3">{item.ip_address}</td>
                  <td className="px-4 py-3">{item.vendor}</td>
                  <td className="px-4 py-3">{item.model}</td>
                  <td className="px-4 py-3">{item.os_version}</td>

                  {/* 상태 */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        item.status === "운영"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "점검"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">{item.manager}</td>
                </tr>
              ))}

              {equipmentList.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    데이터가 없습니다
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}