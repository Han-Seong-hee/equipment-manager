export default function Home() {
  const equipmentList = [
    {
      category: "서버",
      name: "WEB-SVR-01",
      ip: "192.168.0.10",
      vendor: "Dell",
      model: "PowerEdge R740",
      status: "운영",
      location: "전산실 Rack 1",
    },
    {
      category: "스토리지",
      name: "STORAGE-01",
      ip: "192.168.0.20",
      vendor: "NetApp",
      model: "FAS Series",
      status: "운영",
      location: "전산실 Rack 2",
    },
    {
      category: "네트워크",
      name: "FW-01",
      ip: "192.168.0.1",
      vendor: "Juniper",
      model: "SSG 550M",
      status: "점검",
      location: "전산실 Rack 3",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            장비 관리 시스템
          </h1>
          <p className="mt-2 text-gray-600">
            서버, 스토리지, 네트워크 장비를 통합 관리합니다.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">전체 장비</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">3</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">서버</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">1</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">스토리지</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">1</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">네트워크</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="장비명 또는 IP 검색"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-80"
          />

          <div className="flex gap-2">
            <button className="rounded-lg bg-gray-800 px-4 py-2 text-white">
              장비 추가
            </button>
            <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
              엑셀 다운로드
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">구분</th>
                <th className="px-4 py-3 text-left">장비명</th>
                <th className="px-4 py-3 text-left">IP 주소</th>
                <th className="px-4 py-3 text-left">제조사</th>
                <th className="px-4 py-3 text-left">모델</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">위치</th>
                <th className="px-4 py-3 text-left">관리</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((item) => (
                <tr key={item.name} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.ip}</td>
                  <td className="px-4 py-3">{item.vendor}</td>
                  <td className="px-4 py-3">{item.model}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-yellow-500 px-3 py-1 text-sm text-white">
                        수정
                      </button>
                      <button className="rounded bg-red-600 px-3 py-1 text-sm text-white">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}