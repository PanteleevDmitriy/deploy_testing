import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'excursions' })
export class Excursion extends Model<Excursion> {
    
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;  // Название экскурсии

    @Column({ type: DataType.STRING, allowNull: true })
    shortDescription: string;  // Короткое описание

    @Column({ type: DataType.TEXT, allowNull: true })
    longDescription: string;  // Длинное описание

    @Column({ type: DataType.TEXT, allowNull: true })
    schedule: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    price: number;  // Цена экскурсии

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
    photoLinks: string[];  // Список ссылок на фотографии

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
    videoLinks: string[];  // Список ссылок на видео

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isAvailable: boolean;  // Доступность экскурсии

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isPopular: boolean;  // Популярность экскурсии

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isWinter: boolean;  // Экскурсия в зимний период

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBeach: boolean;  // Экскурсия с пляжем

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isFamilyFriendly: boolean;  // Экскурсия для всей семьи

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isOption1: boolean;  // Экскурсия опция 1

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isOption2: boolean;  // Экскурсия опция 2

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isOption3: boolean;  // Экскурсия опция 3

}
