"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const nameMap: Record<string, string> = {
  articles: "Полезные статьи",
  exotic_fruits: "Экзотические фрукты",
  faq: "Часто задаваемые вопросы",
  about: "Информация о нас",
  auth: "Войти в систему",
  excursion: "Экскурсии",
  food: "Вьетнамская кухня",
  seafood: "Морепродукты",
  "book-tour": "Забронировать тур"
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; href: string }[]>([]);
  const [scale, setScale] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    const paths = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      let label = nameMap[segment] || segment;
      return { label, href };
    });

    const baseCrumbs = [{ label: "Главная", href: "/" }];
    let additionalCrumbs: { label: string; href: string }[] = [];  // Указан тип

    // Проверка на маршрут экскурсии и наличие id
    if (pathSegments[0] === "excursion" && pathSegments[1]) {
      fetch("/api/excursions")
        .then(res => res.json())
        .then(data => {
          const excursion = data.find(
            (ex: any) => ex.id?.toString() === pathSegments[1]
          );
          if (excursion) {
            additionalCrumbs = [
              { label: excursion.name, href: `/excursion/${excursion.id}` }
            ];
          }
          // Собираем хлебные крошки, без ссылки на раздел "Экскурсии", если его нет
          setBreadcrumbs([...baseCrumbs, ...additionalCrumbs]);
        })
        .catch(() => {
          setBreadcrumbs([...baseCrumbs, ...paths]);
        });
    } else {
      // Если это не страница экскурсии, строим крошки обычным образом
      setBreadcrumbs([...baseCrumbs, ...paths]);
    }
  }, [pathname]);

  useEffect(() => {
    if (contentRef.current) {
      const parentWidth = contentRef.current.parentElement?.offsetWidth || 0;
      const contentWidth = contentRef.current.offsetWidth;
      if (contentWidth > parentWidth) {
        setScale(parentWidth / contentWidth); // Масштабирование текста
      } else {
        setScale(1);
      }
    }
  }, [breadcrumbs]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="text-sm text-blue-700 h-[30px] flex items-center px-4 overflow-x-auto whitespace-nowrap z-40">
      <div className="max-w-5xl mx-auto w-full">
        <div
          ref={contentRef}
          className="whitespace-nowrap inline-flex items-center h-full transform origin-left transition-transform duration-200"
          style={{ transform: `scale(${scale})`, border: "none", margin: 0 }}
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href}>
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
