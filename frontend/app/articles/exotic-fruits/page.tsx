import Image from "next/image"
import Link from "next/link"

export default function ExoticFruitsArticle() {
  const fruits = [
    {
      name: "Манго (Mango – Xoài)",
      description:
        "Манго – один из самых популярных тропических фруктов, широко распространенный во Вьетнаме. Плод имеет сочную мякоть, богатую витаминами и антиоксидантами.",
      benefits: "Богато витамином C, укрепляет иммунитет, улучшает пищеварение.",
      taste: "Сладкий, с лёгкой кислинкой, иногда с медовыми нотками.",
      location: "Юг Вьетнама, провинции Донгнай, Тьензянг, Кханьхоа.",
      season: "Март – июнь (пик сезона), доступны круглый год.",
      price: "В сезон – 25,000-30,000 VND/кг, вне сезона – до 50,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Маракуйя (Passion Fruit – Chanh dây)",
      description:
        "Небольшие круглые плоды с желтой или фиолетовой кожурой и ароматной кисло-сладкой мякотью с семенами.",
      benefits: "Богата антиоксидантами, улучшает сон, снижает уровень стресса.",
      taste: "Освежающий, кисло-сладкий с сильным ароматом.",
      location: "Центральный Вьетнам, горные районы Ламдонга и Даклака.",
      season: "Май – сентябрь.",
      price: "В сезон – 20,000-35,000 VND/кг, вне сезона – до 50,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Питахайя (Dragon Fruit – Thanh long)",
      description: "Яркий фрукт с розовой или желтой кожурой и белой либо красной мякотью с мелкими черными семенами.",
      benefits: "Богат клетчаткой, способствует улучшению пищеварения.",
      taste: "Сладковатый, напоминает смесь киви и груши.",
      location: "Центральный Вьетнам, провинции Биньтхуан, Нячанг.",
      season: "Май – октябрь.",
      price: "В сезон – 20,000-40,000 VND/кг, вне сезона – 50,000+ VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Дуриан (Durian – Sầu riêng)",
      description: "Известен своим резким запахом и нежной, сливочной мякотью. В Азии считается «королем фруктов».",
      benefits: "Энергетически ценный, содержит много витаминов и полезных жиров.",
      taste: "Кремовый, сладкий, с нотами ванили, орехов и сыра.",
      location: "Южный Вьетнам, провинции Лонган, Бенче, Тьензянг.",
      season: "Май – август.",
      price: "В сезон – 85,000-90,000 VND/кг, вне сезона – 120,000+ VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Мангостин (Mangosteen – Măng cụt)",
      description: "Фиолетовый плод с толстой кожурой и сладкой белой мякотью, состоящей из долек.",
      benefits: "Богат антиоксидантами, помогает при воспалениях.",
      taste: "Очень сладкий, с нотами персика и ананаса.",
      location: "Южный Вьетнам, провинции Бенче, Донгнай.",
      season: "Июль – сентябрь.",
      price: "В сезон – 20,000-80,000 VND/кг, вне сезона – дороже 100,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Кумкват (Kumquat – Quất)",
      description: "Маленький цитрусовый фрукт с ярко-оранжевой кожурой, который можно есть целиком.",
      benefits: "Богат витамином C, улучшает обмен веществ.",
      taste: "Кисло-сладкий, с освежающим ароматом.",
      location: "Северный и Центральный Вьетнам.",
      season: "Декабрь – март.",
      price: "40,000-70,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Кокос (Coconut – Dừa)",
      description: "Крупный орех с твердой оболочкой, внутри которого содержится сладкая жидкость и белая мякоть.",
      benefits: "Улучшает гидратацию, содержит полезные жиры.",
      taste: "Сладкий, ореховый.",
      location: "Южный Вьетнам, провинции Бенче, Чавинь.",
      season: "Круглый год.",
      price: "20,000-50,000 VND/шт.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Джекфрут (Jackfruit – Mít)",
      description: "Крупный фрукт с толстой зеленой кожурой и сладкой жёлтой мякотью, состоящей из отдельных долек.",
      benefits: "Содержит много клетчатки, витаминов A и C, укрепляет иммунитет.",
      taste: "Сладкий, с ароматом ананаса и ванили.",
      location: "Южный Вьетнам, провинции Лонган, Бенче, Тьензянг.",
      season: "Апрель – сентябрь.",
      price: "В сезон – 30,000-50,000 VND/кг, вне сезона – 60,000+ VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Лонган (Longan – Nhãn)",
      description: "Маленькие круглые плоды с тонкой коричневой кожурой и сочной сладкой мякотью.",
      benefits: "Улучшает кровообращение, содержит антиоксиданты.",
      taste: "Сладкий, с легким медовым оттенком.",
      location: "Северный Вьетнам, провинции Ханой, Хайзыонг.",
      season: "Июнь – август.",
      price: "В сезон – 30,000-50,000 VND/кг, вне сезона – 70,000+ VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Личи (Lychee – Vải)",
      description: "Красные плоды с шершавой кожурой и нежной белой мякотью внутри.",
      benefits: "Богат витамином C, поддерживает здоровье кожи.",
      taste: "Сладкий, с цветочными нотами.",
      location: "Северный Вьетнам, провинция Бакзянг.",
      season: "Май – июль.",
      price: "В сезон – 30,000-60,000 VND/кг, вне сезона – 80,000+ VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Гуава (Guava – Ổi)",
      description: "Зеленый или желтый фрукт с белой или розовой хрустящей мякотью.",
      benefits: "Улучшает пищеварение, богата клетчаткой.",
      taste: "От сладкого до слегка кислого.",
      location: "Северный и Южный Вьетнам.",
      season: "Круглый год.",
      price: "15,000-40,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Саподила (Sapodilla – Hồng xiêm)",
      description: "Коричневый фрукт с мягкой карамельной мякотью.",
      benefits: "Богата железом, улучшает работу сердца.",
      taste: "Очень сладкий, напоминает карамель.",
      location: "Южный Вьетнам, провинции Донгнай, Бенче.",
      season: "Декабрь – апрель.",
      price: "30,000-50,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Папайя (Papaya – Đu đủ)",
      description: "Оранжевый фрукт с мягкой сладкой мякотью.",
      benefits: "Богата витамином A, улучшает зрение.",
      taste: "Сладкий, нежный, сочный.",
      location: "Южный Вьетнам, провинции Лонган, Тьензянг.",
      season: "Круглый год.",
      price: "20,000-40,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Карамбола (Starfruit – Khế)",
      description: "Жёлто-зелёный плод с пятиугольной формой, напоминающий звезду в разрезе.",
      benefits: "Богата витамином C, помогает при простудах.",
      taste: "Кисло-сладкий, освежающий.",
      location: "Центральный и Южный Вьетнам.",
      season: "Май – октябрь.",
      price: "30,000-50,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Звёздное яблоко (Star Apple – Vú sữa)",
      description: "Круглый плод с толстой кожурой и нежной молочной мякотью.",
      benefits: "Улучшает работу желудка, богато антиоксидантами.",
      taste: "Сладкий, кремовый.",
      location: "Южный Вьетнам, провинции Тьензянг, Виньлонг.",
      season: "Январь – март.",
      price: "40,000-80,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Нойна (Custard Apple – Na)",
      description: "Круглый фрукт с зелёной бугристой кожурой и сладкой кремовой мякотью.",
      benefits: "Богата витамином B6, полезна для мозга.",
      taste: "Очень сладкий, с лёгкими ванильными нотами.",
      location: "Северный Вьетнам.",
      season: "Июль – сентябрь.",
      price: "50,000-100,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Салак (Snake Fruit – Mận gai)",
      description: "Красно-коричневый фрукт с чешуйчатой кожурой и хрустящей мякотью.",
      benefits: "Укрепляет кости, богата калием.",
      taste: "Кисло-сладкий, с ореховым оттенком.",
      location: "Южный Вьетнам.",
      season: "Май – сентябрь.",
      price: "40,000-80,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
    {
      name: "Тамаринд (Tamarind – Me)",
      description: "Коричневый стручковый фрукт с кислой мякотью ��нутри.",
      benefits: "Улучшает пищеварение, снижает уровень холестерина.",
      taste: "Кисло-сладкий, с карамельными нотами.",
      location: "Южный Вьетнам.",
      season: "Январь – апрель.",
      price: "30,000-70,000 VND/кг.",
      images: [
        "https://biznes-lanch.com/wa-data/public/photos/36/06/636/636.970.jpeg",
        "https://biznes-lanch.com/wa-data/public/shop/products/42/68/16842/images/18621/18621.970.jpg",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Экзотические фрукты Вьетнама</h1>

      <div className="mb-8">
        <p>
          В этой статье представлена информация об экзотических фруктах Вьетнама, которые вы сможете попробовать во
          время вашего путешествия. Вьетнам славится своим разнообразием тропических фруктов, многие из которых могут
          показаться необычными для туристов из других стран. Здесь вы найдете описание вкуса, пользы для здоровья,
          сезонности и примерных цен на эти удивительные плоды. Погрузитесь в мир ярких вкусов и ароматов вместе с нами!
        </p>
      </div>

      <div className="space-y-12">
        {fruits.map((fruit, index) => (
          <section key={index} className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {index + 1}. {fruit.name}
            </h2>
            <div className="flex justify-center gap-4 mb-4">
              {fruit.images.map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={image || "/placeholder.svg"}
                  alt={`${fruit.name} ${imgIndex + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ))}
            </div>
            <div className="text-left">
              <p>
                <strong>Описание:</strong> {fruit.description}
              </p>
              <p>
                <strong>Польза:</strong> {fruit.benefits}
              </p>
              <p>
                <strong>Вкус:</strong> {fruit.taste}
              </p>
              <p>
                <strong>Где растёт:</strong> {fruit.location}
              </p>
              <p>
                <strong>Сезонность:</strong> {fruit.season}
              </p>
              <p>
                <strong>Цены:</strong> {fruit.price}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Другие фрукты во Вьетнаме</h2>
        <p>
          Во Вьетнаме также встречаются более привычные виды фруктов, такие как апельсин, лайм, лимон, виноград, ананас,
          дыня, арбуз и бананы. Эти фрукты широко доступны в большинстве регионов страны и могут быть отличным
          дополнением к вашему рациону во время путешествия.
        </p>
      </div>
      <div className="mt-16 text-center">
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

