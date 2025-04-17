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
      
      {/* Хлебные крошки в отдельной полоске под хедером */}
      <div className="h-[60px]" /> {/* Заглушка под фиксированный хедер */}
      <div className="bg-gray-100 border-b border-gray-300 py-2 px-4">
        <Breadcrumbs />
      </div>

      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
