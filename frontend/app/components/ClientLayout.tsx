"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />

      {/* Заглушка под фиксированный хедер */}
      <div className="h-[60px]" />

      {/* Хлебные крошки сразу под хедером */}
      <Breadcrumbs />

      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
