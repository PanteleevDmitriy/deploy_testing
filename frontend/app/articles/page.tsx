import Link from "next/link"

export default function Articles() {
  const articles = [
    { id: 1, title: "Экзотические фрукты", link: "/articles/exotic_fruits" },
    { id: 2, title: "Морепродукты", link: "/articles/seafood" },
    { id: 3, title: "Вьетнамская кухня", link: "/articles/food" },
  ]

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Статьи</h1>
      <p className="text-center mb-8">
        Ознакомтесь с информацией для туристов, мы собрали для вас самое интересное и полезное!
      </p>
      <h2 className="text-2xl font-semibold mb-4">Список статей:</h2>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={article.link} className="text-blue-600 hover:underline">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

