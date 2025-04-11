import dynamic from "next/dynamic";

const BookTour = dynamic(() => import("./BookTour"), { ssr: false });

export default function Page() {
  return <BookTour />;
}
