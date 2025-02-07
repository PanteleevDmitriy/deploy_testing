import Link from "next/link"

export default function Articles() {
  const articles = [
    { id: 1, title: "Экзотические фрукты Вьетнама", link: "/articles/exotic-fruits" },
    { id: 2, title: "Статья 2", link: "/articles/article_2" },
    { id: 3, title: "Статья 3", link: "/articles/article_3" },
    { id: 4, title: "Статья 4", link: "/articles/article_4" },
    { id: 5, title: "Статья 5", link: "/articles/article_5" },
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

