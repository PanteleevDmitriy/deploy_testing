import { Suspense } from "react";
import BookTour from "./BookTour";

export default function Page({ searchParams }: any) {
  const id = searchParams?.id;

  if (!id) return <div>❗ Не передан id тура</div>;

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <BookTour id={id} />
    </Suspense>
  );
}