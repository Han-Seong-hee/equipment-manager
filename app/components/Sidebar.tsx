import Link from "next/link";

const systems = [
  { label: "CATV DHCP", value: "CATV_DHCP" },
  { label: "IPTV DHCP", value: "IPTV_DHCP" },
  { label: "DPG", value: "DPG" },
  { label: "NMS", value: "NMS" },
];

const categories = [
  { label: "전체", value: "" },
  { label: "Server", value: "Server" },
  { label: "Storage", value: "Storage" },
  { label: "L2", value: "L2" },
  { label: "L3", value: "L3" },
  { label: "L4", value: "L4" },
  { label: "FW", value: "FW" },
];

export default function Sidebar({
  activeSystem,
  activeCategory,
}: {
  activeSystem?: string;
  activeCategory?: string;
}) {
  return (
    <aside className="sticky left-0 top-0 h-screen w-48 shrink-0 border-r border-gray-800 bg-gray-900 p-5">
      <Link
        href="/"
        className="mb-4 block rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-gray-800"
      >
        Main Page
      </Link>

      <nav className="space-y-3">
        {systems.map((system) => {
          const opened = activeSystem === system.value;

          return (
            <div key={system.value}>
              <Link
                href={`/equipment/${system.value}`}
                className={`block rounded-lg px-4 py-3 text-sm ${
                  opened
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {system.label}
              </Link>

              {opened && (
                <div className="mt-2 space-y-1 pl-3">
                  {categories.map((category) => {
                    const href = category.value
                      ? `/equipment/${system.value}/${category.value}`
                      : `/equipment/${system.value}`;

                    const active =
                      (!activeCategory && category.value === "") ||
                      activeCategory === category.value;

                    return (
                      <Link
                        key={category.label}
                        href={href}
                        className={`block rounded-md px-3 py-2 text-xs ${
                          active
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {category.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}