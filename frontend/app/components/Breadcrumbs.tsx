"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nameMap: Record<string, string> = {
  articles: "Полезные статьи",
  exotic_fruits: "Экзотические фрукты",
  faq: "Часто задаваемые вопросы",
  about: "Информация о нас",
  auth: "Войти в систему",
  excursion: "Экскурсии",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const paths = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let label = nameMap[segment] || segment;

      return { label, href };
    });

    // Получение названия экскурсии по id
    if (pathSegments[0] === "excursion" && pathSegments[1]) {
      fetch("/api/excursions/")
        .then(res => res.json())
        .then(data => {
          const excursion = data.find((ex: any) => ex.id?.toString() === pathSegments[1]);
          if (excursion?.name) {
            const updated = paths.map((p, i) =>
              i === 1 ? { ...p, label: excursion.name } : p
            );
            setBreadcrumbs([{ label: "Главная", href: "/" }, ...updated]);
          } else {
            setBreadcrumbs([{ label: "Главная", href: "/" }, ...paths]);
          }
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
    <nav className="text-sm text-blue-700 h-[30px] flex items-center px-4 overflow-x-auto whitespace-nowrap z-40">
      <div className="max-w-5xl mx-auto w-full">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline">
              {decodeURIComponent(crumb.label)}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
