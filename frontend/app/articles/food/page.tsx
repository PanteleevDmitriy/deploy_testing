"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    section: "Вьетнамские супы",
    items: [
      {
        name: "Phở (Фо)",
        description:
          "Классический вьетнамский суп с рисовой лапшой в ароматном бульоне. Вариации: Phở bò (говядина), Phở gà (курица), Phở tái (тонко нарезанная сырая говядина, заваривается бульоном). Подаётся с зеленью, лаймом и соусами.",
        image: "pho.jpg",
      },
      {
        name: "Bún bò Huế (Бун бо Хюэ)",
        description:
          "Острый пряный суп из города Хюэ с говядиной и лимонной травой.",
        image: "bun-bo-hue.jpg",
      },
      {
        name: "Bún riêu (Бун риеу)",
        description:
          "Кисловатый суп с крабами, помидорами и тофу, ароматный и лёгкий.",
        image: "bun-rieu.jpg",
      },
      {
        name: "Bún mắm (Бун мам)",
        description:
          "Насыщенный суп на основе ферментированного рыбного соуса с морепродуктами.",
        image: "bun-mam.jpg",
      },
      {
        name: "Bò kho (Бо хо)",
        description:
          "Густое пряное рагу из говядины с морковью, подаётся с багетом или лапшой.",
        image: "bo-kho.jpg",
      },
      {
        name: "Hủ tiếu (Ху тьеу)",
        description:
          "Легкий южный суп с прозрачным бульоном, свининой и креветками.",
        image: "hu-tieu.jpg",
      },
      {
        name: "Lẩu (Лао)",
        description:
          "Вьетнамский хотпот — общий котёл с мясом, морепродуктами и овощами.",
        image: "lau.jpg",
      },
      {
        name: "Mì Quảng (Ми Куанг)",
        description:
          "Жёлтая лапша с креветками, свининой и зеленью, с небольшим количеством бульона.",
        image: "mi-quang.jpg",
      },
      {
        name: "Canh chua (Кан чуа)",
        description:
          "Традиционный кислый суп с тамариндом, ананасом, помидорами и рыбой или креветками.",
        image: "canh-chua.jpg",
      },
    ],
  },
  {
    section: "Выпечка и закуски",
    items: [
      {
        name: "Bánh mì (Бань ми)",
        description: "Вьетнамский багет с мясной или вегетарианской начинкой.",
        image: "banh-mi.jpg",
      },
      {
        name: "Bánh bao (Бань бао)",
        description: "Паровые булочки с мясом и яйцом.",
        image: "banh-bao.jpg",
      },
      {
        name: "Bánh xèo (Бань сэо)",
        description: "Хрустящие рисовые блинчики с креветками и свининой.",
        image: "banh-xeo.jpg",
      },
      {
        name: "Bánh khọt (Бань кхот)",
        description: "Маленькие кокосовые блинчики с креветками.",
        image: "banh-khot.jpg",
      },
      {
        name: "Bánh cuốn (Бань куон)",
        description:
          "Тонкие паровые блинчики из рисового теста с начинкой из фарша и грибов.",
        image: "banh-cuon.jpg",
      },
      {
        name: "Chả giò (Ча зё)",
        description: "Жареные спрингроллы с мясом и овощами.",
        image: "cha-gio.jpg",
      },
      {
        name: "Bánh chưng (Бань чунг)",
        description:
          "Традиционный новогодний рисовый рулет с зелёной фасолью и свининой в листьях банана.",
        image: "banh-chung.jpg",
      },
    ],
  },
  {
    section: "Другие важные блюда",
    items: [
      {
        name: "Bún chả (Бун ча)",
        description:
          "Жареные свиные котлетки с рисовой лапшой и зеленью, родом из Ханоя.",
        image: "bun-cha.jpg",
      },
      {
        name: "Bún thịt nướng (Бун тхит ныонг)",
        description:
          "Жареная свинина с лапшой и зеленью, сладковато-пряный вкус за счёт маринада.",
        image: "bun-thit-nuong.jpg",
      },
      {
        name: "Cao lầu (Кау лау)",
        description:
          "Толстая лапша с мясом, характерная для города Хойан, с уникальной текстурой.",
        image: "cao-lau.jpg",
      },
      {
        name: "Hủ tiếu khô",
        description:
          "Сухой вариант ху тьеу: лапша без бульона с соусом и добавками.",
        image: "hu-tieu-kho.jpg",
      },
      {
        name: "Cơm tấm (Ком там)",
        description:
          "Битый рис с мясом, яйцом и котлетой, одно из самых популярных повседневных блюд.",
        image: "com-tam.jpg",
      },
      {
        name: "Xôi (Сой)",
        description:
          "Клейкий рис на пару, подаётся сладким или солёным; популярный завтрак или перекус.",
        image: "xoi.jpg",
      },
      {
        name: "Bò lúc lắc (Бо лук лак)",
        description:
          "Говядина кубиками с луком и перцем, очень ароматное и сочное блюдо.",
        image: "bo-luc-lac.jpg",
      },
      {
        name: "Gỏi cuốn (Гой куон)",
        description: "Свежие не обжаренные спрингроллы с начинкой.",
        image: "goi-cuon.jpg",
      },
      {
        name: "Nem nướng (Нем нướng)",
        description:
          "Сочные свиные шашлычки на гриле, часто заворачивают в рисовую бумагу с зеленью и овощами.",
        image: "nem-nuong.jpg",
      },
    ],
  },
  {
    section: "Экзотические деликатесы Вьетнама",
    items: [
      {
        name: "Ếch xào sả ớt (Жареная лягушка с лимонником и чили)",
        description:
          "Мясо лягушки, обжаренное с ароматным лимонником и острым перцем. Вьетнамская дичь с нежной текстурой.",
        image: "frog-stir-fry.jpg",
      },
      {
        name: "Thịt cá sấu (Мясо крокодила)",
        description:
          "Мясо крокодила по вкусу напоминает курицу, часто готовится на гриле или тушится с пряностями.",
        image: "crocodile-meat.jpg",
      },
      {
        name: "Thịt đà điểu (Мясо страуса)",
        description:
          "Красное мясо с низким содержанием жира, подаётся жареным или в виде стейков.",
        image: "ostrich-meat.jpg",
      },
      {
        name: "Nhộng tằm (Личинки шелкопряда)",
        description:
          "Популярный белковый перекус, жареные или варёные личинки шелкопряда с пряностями.",
        image: "silkworm.jpg",
      },
      {
        name: "Cào cào chiên (Жареные сверчки)",
        description:
          "Хрустящая закуска из жареных сверчков с чесноком и специями, источник белка и витаминов.",
        image: "crickets.jpg",
      },
    ],
  },
];

export default function VietnameseNoodlesArticle() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="space-y-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mt-8 mb-12">
        Вьетнамская кухня: традиции и лучшие рецепты
      </h1>
      <p className="max-w-3xl mx-auto text-center mb-12 text-lg leading-relaxed">
        Вьетнамская кухня — это невероятное разнообразие ароматных, насыщенных и
        полезных блюд. Особое место занимают супы и блюда из лапши и риса, которые
        подают и на завтрак, и на обед, и на ужин. В этой статье познакомимся с
        самыми популярными видами супов, лапши и другими традиционными блюдами
        Вьетнама.
      </p>
  
      {sections.map((section) => (
        <section key={section.section}>
          <h2 className="text-center font-bold text-2xl my-6">{section.section}</h2>
          <div className="grid grid-cols-1 gap-4">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="border p-4 rounded-lg shadow w-full flex flex-col"
              >
                <h3 className="text-center text-xl font-semibold mb-4 whitespace-pre-line">
                  {item.name}
                </h3>
                <button
                  onClick={() => setSelectedImage(`/photo/vietnamese-food/${item.image}`)}
                  title="Нажмите для увеличения"
                  className="w-[200px] h-[200px] mx-auto overflow-hidden rounded-md cursor-pointer"
                  aria-label={`Открыть изображение ${item.name}`}
                >
                  <Image
                    src={`/photo/vietnamese-food/${item.image}`}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </button>
                <p className="mt-4 text-center text-sm md:text-base flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
  
      <div className="mt-16 text-center">
        <Link
          href="/articles"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 inline-block"
        >
          Назад к списку статей
        </Link>
      </div>
  
      {/* Модальное окно для увеличенного изображения */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Увеличенное изображение"
              width={800}
              height={600}
              className="max-w-full max-h-screen object-contain rounded-md"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}  