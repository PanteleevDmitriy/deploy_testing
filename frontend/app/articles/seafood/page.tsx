"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SeafoodArticle() {
  const seafoodSections = [
    {
      section: "Моллюски",
      items: [
        {
          name: "Мидии\nMussels\nVẹm xanh",
          description:
            "Мидии – ракушки с тёмной створкой и сочной оранжевой мякотью. Вкус морской, сладковатый, с лёгкой солёностью.",
          image: "mussels.jpg",
        },
        {
          name: "Устрицы\nOysters\nHàu",
          description:
            "Устрицы – крупные плоские раковины с нежной кремовой мякотью внутри. Вкус сливочный, с морским ароматом.",
          image: "oysters.jpg",
        },
        {
          name: "Гребешки\nScallops\nSò điệp",
          description:
            "Гребешки – раковины с круглой белой мышцей внутри. Вкус сладкий, нежный, чуть ореховый.",
          image: "scallops.jpg",
        },
        {
          name: "Кровавые моллюски\nBlood Cockles\nSò huyết",
          description:
            "Небольшие моллюски с красной мякотью. Вкус насыщенный, металлический, морской.",
          image: "blood_cockles.jpg",
        },
        {
          name: "Ракушка бабочка\nButterfly Clam\nSò lông",
          description:
            "Ракушки с длинными щетинками на поверхности. Вкус сладковатый, с лёгкой минеральной ноткой.",
          image: "butterfly_clam.jpeg",
        },
        {
          name: "Белая ракушка\nWhite Clam\nNgao trắng",
          description:
            "Небольшие светлые ракушки с упругой мякотью. Вкус мягкий, чуть сладкий, морской.",
          image: "white_clam.jpeg",
        },
        {
          name: "Бритва моллюск\nRazor Clam\nỐc móng tay",
          description:
            "Длинные тонкие раковины с нежной мясистой серединой. Вкус сладковатый, слегка хрустящий.",
          image: "razor_clam.jpg",
        },
        {
          name: "Турбо\nTurban Shell\nỐc mặt trăng",
          description:
            "Улиткообразные раковины с плотной мякотью. Вкус морской, слегка жёсткий, с ореховым оттенком.",
          image: "turban_shell.jpeg",
        },
        {
          name: "Раковина шип\nSpiny Shell\nỐc gai",
          description:
            "Ракушки с шипами, внутри плотная белая мякоть. Вкус плотный, слегка солёный.",
          image: "spiny_shell.jpg",
        },
        {
          name: "Слоновий моллюск\nGeoduck\nỐc vòi voi",
          description:
            "Огромные моллюски с длинной шейкой. Вкус сладковатый, хрустящий, очень сочный.",
          image: "geoduck.jpg",
        },
        {
          name: "Бородавчатый моллюск\nTop Shell\nỐc bươu",
          description:
            "Маленькие раковины с завитками. Вкус слегка резиновый, солоноватый.",
          image: "top_shell.jpeg",
        },
        {
          name: "Ракушка-бутон\nCockle\nSò lụa",
          description:
            "Маленькие округлые раковины с упругим мясом. Вкус сладковатый, с морским ароматом.",
          image: "cockle.jpg",
        },
        {
          name: "Гигантская раковина\nGiant Clam\nTrai tai tượng",
          description:
            "Огромные ракушки с толстой мясистой частью. Вкус насыщенный, мясной, сладковатый.",
          image: "giant_clam.jpg",
        },
        {
          name: "Жемчужница\nPearl Oyster\nTrai ngọc",
          description:
            "Моллюск, известный своими жемчужинами, с плотной мясистой частью. Вкус мягкий, с минеральными нотами.",
          image: "pearl_oyster.jpg",
        },
        {
          name: "Лимпет\nLimpet\nỐc cánh",
          description:
            "Маленькие конические раковины. Вкус морской, слегка резиновый.",
          image: "limpet.jpg",
        },
        {
          name: "Морской ушко\nAbalone\nBào ngư",
          description:
            "Плоские раковины с плотным мясом. Вкус сладковатый, слегка ореховый, с морским ароматом.",
          image: "abalone.jpg",
        },
      ],
    },
    {
      section: "Креветки и панцирные",
      items: [
        {
          name: "Креветка\nShrimp\nTôm",
          description:
            "Маленькие панцирные с упругим телом. Вкус сладкий, сочный, с морским ароматом.",
          image: "shrimp.jpg",
        },
        {
          name: "Тигровая креветка\nTiger Prawn\nTôm sú",
          description:
            "Крупные креветки с полосатым панцирем. Вкус плотный, сладковатый, сочный.",
          image: "tiger_prawn.jpg",
        },
        {
          name: "Лангуст\nSpiny Lobster\nTôm hùm",
          description: "Крупный панцирный с длинными усами, без больших клешней. Вкус нежный, сладкий, сливочный.",
          image: "spiny_lobster.jpeg",
        },
        {
          name: "Рак\nCrayfish\nTôm càng xanh",
          description:
            "Пресноводные раки с острыми клешнями. Вкус сладковатый, плотный, слегка ореховый.",
          image: "crayfish.jpg",
        },
        {
          name: "Краб\nCrab\nCua",
          description:
            "Панцирные с мясистыми клешнями и сладким белым мясом. Вкус сладковатый, морской, сочный.",
          image: "crab.jpg",
        },
        {
          name: "Голубой краб\nBlue Crab\nCua xanh",
          description:
            "Маленькие крабы с голубым оттенком панциря. Вкус нежный, сладкий, слегка солёный.",
          image: "blue_crab.jpg",
        },
        {
          name: "Королевский краб\nKing Crab\nCua hoàng đế",
          description:
            "Огромные крабы с толстыми клешнями. Вкус плотный, сладкий, насыщенный.",
          image: "king_crab.jpg",
        },
        {
          name: "Песочный краб\nSand Crab\nCua cát",
          description:
            "Маленькие крабы, живущие в песке. Вкус сладковатый, с морским ароматом.",
          image: "sand_crab.jpg",
        },
      ],
    },
    {
      section: "Головоногие и иглокожие",
      items: [
        {
          name: "Кальмар\nSquid\nMực",
          description:
            "Головоногие с длинным телом и щупальцами. Вкус мягкий, слегка сладкий, с морским ароматом.",
          image: "squid.jpeg",
        },
        {
          name: "Осьминог\nOctopus\nBạch tuộc",
          description:
            "Головоногие с множеством щупалец. Вкус плотный, слегка сладкий, жевательный.",
          image: "octopus.jpg",
        },
        {
          name: "Каракатица\nCuttlefish\nMực nang",
          description:
            "Головоногие с широким телом и короткими щупальцами. Вкус мягкий, сладковатый, нежный.",
          image: "cuttlefish.jpg",
        },
        {
          name: "Морской ёж\nSea Urchin\nNhím biển",
          description:
            "Шарообразное колючее существо. В пищу идут оранжевые икринки внутри — нежные, сливочные, с морским вкусом.",
          image: "sea_urchin.jpg",
        },
        {
          name: "Морской огурец\nSea cucumber\nHải sâm",
          description:
            "Мягкотелое морское животное с желеобразной текстурой. Вкус нежный, с лёгкими морскими нотками.",
          image: "sea_cucumber.jpg",
        },
        
      ],
    },
    {
      section: "Пресноводные рыбы",
      items: [
        {
          name: "Сом\nCatfish\nCá trê",
          description:
            "Большая пресноводная рыба с нежным мясом. Вкус мягкий, слегка жирный, сладковатый.",
          image: "catfish.jpg",
        },
        {
          name: "Тилапия\nTilapia\nCá rô phi",
          description:
            "Средняя пресноводная рыба с белым мясом. Вкус нейтральный, мягкий, слегка сладкий.",
          image: "tilapia.jpg",
        },
        {
          name: "Змееобразная рыба\nSnakehead\nCá lóc",
          description:
            "Длинная рыба с плотным мясом. Вкус сладкий, насыщенный, слегка хрустящий.",
          image: "snakehead.jpg",
        },
        {
          name: "Карп\nCarp\nCá chép",
          description:
            "Крупная рыба с нежным белым мясом. Вкус сладковатый, мягкий, слегка землистый.",
          image: "carp.jpg",
        },
        {
          name: "Гурами\nGourami\nCá tai tượng",
          description:
            "Плоская рыба с плотным мясом. Вкус мягкий, слегка сладкий, сочный.",
          image: "gourami.jpg",
        },
        {
          name: "Пангасиус\nPangasius\nCá tra",
          description:
            "Крупная пресноводная рыба с мягким мясом. Вкус нежный, сладковатый, сливочный.",
          image: "pangasius.jpg",
        },
        {
          name: "Сазан\nGrass Carp\nCá trắm cỏ",
          description:
            "Крупная рыба с плотным мясом. Вкус нейтральный, слегка сладкий, сочный.",
          image: "grass_carp.jpg",
        },
        {
          name: "Пескарь\nLoach\nCá bống",
          description:
            "Маленькая рыба с мягким мясом. Вкус сладковатый, нежный, слегка землистый.",
          image: "loach.jpg",
        },
        {
          name: "Мандариновая рыба\nMandarin Fish\nCá quả",
          description:
            "Яркая рыба с нежным мясом. Вкус мягкий, сладкий, сочный.",
          image: "mandarin_fish.jpg",
        },
        {
          name: "Осётр\nSturgeon\nCá tầm",
          description:
            "Крупная рыба с продолговатым телом и костяными щитками. Мясо плотное, нежное, с характерным насыщенным вкусом и лёгкой жирностью.",
          image: "sturgeon.jpg",
        },
      ],
    },
    {
      section: "Морские рыбы",
      items: [
        {
          name: "Групер\nGrouper\nCá mú",
          description:
            "Крупная морская рыба с плотным белым мясом. Вкус сладкий, нежный, слегка маслянистый.",
          image: "grouper.jpg",
        },
        {
          name: "Красный окунь\nRed Snapper\nCá hồng",
          description:
            "Средняя рыба с розовым мясом. Вкус сладковатый, сочный, слегка ореховый.",
          image: "red_snapper.jpg",
        },
        {
          name: "Тунец\nTuna\nCá ngừ",
          description:
            "Крупная рыба с плотным красным мясом. Вкус насыщенный, мясной, слегка металлический.",
          image: "tuna.jpg",
        },
        {
          name: "Скумбрия\nMackerel\nCá thu",
          description:
            "Средняя рыба с жирным мясом. Вкус яркий, солёный, насыщенный.",
          image: "mackerel.jpg",
        },
        {
          name: "Морской окунь\nSea Bass\nCá vược",
          description:
            "Средняя рыба с нежным белым мясом. Вкус мягкий, сладкий, слегка маслянистый.",
          image: "sea_bass.jpeg",
        },
        {
          name: "Дорадо\nDorado\nCá chỉ vàng",
          description:
            "Рыба среднего размера с нежным мясом. Вкус сладковатый, слегка ореховый, сочный.",
          image: "dorado.jpg",
        },
        {
          name: "Анчоус\nAnchovy\nCá cơm",
          description:
            "Маленькие рыбки с ярким вкусом. Вкус солёный, насыщенный, морской.",
          image: "anchovy.jpg",
        },
        {
          name: "Сардина\nSardine\nCá mòi",
          description:
            "Маленькая жирная рыба. Вкус насыщенный, солёный, слегка сладкий.",
          image: "sardine.jpg",
        },
        {
          name: "Кефаль\nMullet\nCá đối",
          description:
            "Средняя рыба с плотным мясом. Вкус мягкий, сладковатый, слегка землистый.",
          image: "kefal.jpg",
        },
        {
          name: "Рыба-луна\nOcean Sunfish\nCá mặt trăng",
          description:
            "Огромная плоская рыба, похожая на летающую тарелку. Мясо нежное, нейтральное на вкус, редко встречается.",
          image: "sunfish.jpeg",
        },
        {
          name: "Кобия\nCobia\nCá bớp",
          description:
            "Крупная рыба с тёмной спиной и светлым брюхом. Мясо плотное, слегка сладковатое, с мягким вкусом.",
          image: "cobia.jpg",
        },
        {
          name: "Парусник\nSailfish\nCá buồm",
          description:
            "Быстрая и стройная рыба с высоким парусом на спине. Мясо плотное, немного напоминает тунца.",
          image: "sailfish.jpg",
        },
      ],
    },
  ];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Местные морепродукты
      </h1>
  
      <div className="mb-8">
        <p>
          В этой статье представлена информация о морепродуктах Вьетнама, которые вы сможете попробовать во
          время вашего путешествия. Вьетнам славится своим богатым выбором свежих морепродуктов, многие из которых могут
          показаться необычными и экзотическими для туристов из других стран. Здесь вы найдете описание вкуса,
          текстуры и особенностей. Погрузитесь в мир морских сокровищ и откройте для себя новые гастрономические впечатления вместе с нами!
        </p>
      </div>
      <div className="space-y-12 px-4 md:px-8 lg:px-16">
        {seafoodSections.map((section) => (
          <div key={section.section}>
            <h2 className="text-center font-bold text-2xl my-6">{section.section}</h2>
            <div className="grid grid-cols-1 gap-4">
              {section.items.map((item) => (
                <div key={item.name} className="border p-4 rounded-lg shadow w-full">
                <h3 className="text-center text-xl font-bold mb-4 whitespace-pre-line">{item.name}</h3>
                <div className="flex justify-center">
                  <Image 
                    src={`/photo/seafood/${item.image}`} 
                    alt={item.name} 
                    width={300} 
                    height={200} 
                    className="rounded"
                  />
                </div>
                <p className="mt-4 text-center">{item.description}</p>
              </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link
          href="/articles"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Назад к списку статей
        </Link>
      </div>
  
      {/* Модальное окно для увеличенного изображения */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Увеличенное изображение"
              width={800}
              height={800}
              className="max-w-full max-h-screen object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}