"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const segmentNameMap: Record<string, string> = {
  articles: "Полезные статьи",
  about: "О нас",
  faq: "Часто задаваемые вопросы",
  excursion: "Экскурсии",
  exotic_fruits: "Экзотические фрукты",
  // Добавляй другие сегменты по мере необходимости
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const paths = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = segmentNameMap[segment] || segment;
      return { label, href };
    });

    // Спецобработка экскурсии
    if (pathSegments[0] === "excursion" && pathSegments[1]) {
      fetch(`/api/excursions/${pathSegments[1]}`)
        .then(res => res.json())
        .then(data => {
          const title = data?.name || segmentNameMap[pathSegments[1]] || pathSegments[1];
          const updated = paths.map((p, i) =>
            i === 1 ? { ...p, label: title } : p
          );
          setBreadcrumbs([{ label: "Главная", href: "/" }, ...updated]);
        })
        .catch(() => {
          setBreadcrumbs([{ label: "Главная", href: "/" }, ...paths]);
        });
    } else {
      setBreadcrumbs([{ label: "Главная", href: "/" }, ...paths]);
    }
  }, [pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="text-sm text-gray-700 h-[30px] flex items-center px-4 overflow-x-auto whitespace-nowrap z-40 relative">
      <div className="max-w-5xl mx-auto w-full">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline text-black">
              {decodeURIComponent(crumb.label)}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
