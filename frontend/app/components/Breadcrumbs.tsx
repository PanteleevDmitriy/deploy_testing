"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const paths = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return { label: segment, href };
    });

    // Пример получения названия экскурсии с бэка
    if (pathSegments[0] === "excursion" && pathSegments[1]) {
      fetch(`/api/excursions/${pathSegments[1]}`)
        .then(res => res.json())
        .then(data => {
          const title = data?.name || pathSegments[1];
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
    <nav className="text-sm text-gray-600 py-2 overflow-x-auto whitespace-nowrap max-w-full">
      <div className="max-w-5xl mx-auto">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline text-blue-700">
              {decodeURIComponent(crumb.label)}
            </Link>
            {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}
