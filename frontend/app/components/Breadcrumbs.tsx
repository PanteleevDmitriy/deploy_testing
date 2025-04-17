"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const paths = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let label = nameMap[segment] || segment;
      return { label, href };
    });

    const baseCrumbs = [{ label: "Главная", href: "/" }];

    if (pathSegments[0] === "excursion" && pathSegments[1]) {
      fetch("/api/excursions")
        .then(res => res.json())
        .then(data => {
          const excursion = data.find(
            (ex: any) => ex.id?.toString() === pathSegments[1]
          );
          if (excursion) {
            const updated = [
              { label: nameMap["excursion"], href: "/excursion" },
              { label: excursion.name, href: `/excursion/${excursion.id}` },
            ];
            setBreadcrumbs([...baseCrumbs, ...updated]);
          } else {
            setBreadcrumbs([...baseCrumbs, ...paths]);
          }
        })
        .catch(() => {
          setBreadcrumbs([...baseCrumbs, ...paths]);
        });
    } else {
      setBreadcrumbs([...baseCrumbs, ...paths]);
    }
  }, [pathname]);

  // Автомасштабирование
  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      const containerWidth = container.offsetWidth;
      const contentWidth = content.scrollWidth;

      const newScale = Math.min(1, containerWidth / contentWidth);
      setScale(newScale < 0.5 ? 0.5 : newScale); // минимальный масштаб 0.5
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [breadcrumbs]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="px-4 h-[30px] z-40">
      <div ref={containerRef} className="max-w-5xl mx-auto w-full overflow-hidden">
        <div
          ref={contentRef}
          className="whitespace-nowrap inline-block transform origin-left transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="text-blue-700 text-sm">
              <Link href={crumb.href} className="hover:underline">
                {decodeURIComponent(crumb.label)}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
