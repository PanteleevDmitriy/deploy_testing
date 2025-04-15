export class ExcursionDto {
  
  readonly name: string;  // Название экскурсии

  readonly shortDescription?: string;  // Короткое описание

  readonly longDescription?: string;  // Длинное описание

  readonly schedule?: string;  // Расписание

  readonly price: number;  // Цена экскурсии

  readonly photoLinks?: string[];  // Список ссылок на фото

  readonly videoLinks?: string[];  // Список ссылок на видео

  readonly isAvailable?: boolean;  // Доступность экскурсии

  readonly isPopular?: boolean;  // Популярность экскурсии

  // Категории экскурсий
  readonly isWinter?: boolean;  // Зимняя экскурсия

  readonly isBeach?: boolean;  // Пляжная экскурсия

  readonly isFamilyFriendly?: boolean;  // Подходит для семьи

  readonly isOption1?: boolean;  // Опция 1

  readonly isOption2?: boolean;  // Опция 2

  readonly isOption3?: boolean;  // Опция 3
}
