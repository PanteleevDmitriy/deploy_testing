"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      {/* Отступ под фиксированный хедер с крошками (60 + 30 = 90px) */}
      <div className="h-[90px]" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}