"use client";

import { Suspense } from "react";
import BookTour from "./BookTour";

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BookTour />
    </Suspense>
  );
}
