import { Suspense } from "react";
import BookTour from "./BookTour";   // импорт из той же папки

export default function Page({ searchParams }: { searchParams:{ id?:string }}) {
  const id = searchParams.id;

  if (!id) return <div>❗ Не передан id тура</div>;

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <BookTour id={id} />
    </Suspense>
  );
}