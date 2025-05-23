import Link from "next/link"

export default function Article3() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Статья 3</h1>
      <p className="mb-8">Содержание статьи 3...</p>
      <div className="text-center mt-16">
        <Link
          href="/articles"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Назад к списку статей
        </Link>
      </div>
    </div>
  )
}

