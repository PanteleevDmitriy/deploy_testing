import { Suspense } from "react";
import BookTour from "./BookTour";   // импорт из той же папки

interface Props {
  searchParams: { [key: string]: string | undefined }
}

export default function Page({ searchParams }: Props) {
  const id = searchParams?.id;
  if (!id) return <div>❗ Не передан id тура</div>;
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <BookTour id={id} />
    </Suspense>
  );
}