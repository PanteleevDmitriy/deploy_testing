import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'weather'})
export class Weather extends Model<Weather> {
    
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true}) 
    time_point: number;

    @Column({type: DataType.STRING}) 
    time_value: string;

    @Column({type: DataType.REAL}) 
    temp: number;
    
    @Column({type: DataType.REAL}) 
    humidity: number;

    @Column({type: DataType.REAL}) 
    pressure: number;

    @Column({type: DataType.REAL}) 
    wind_speed: number;

    @Column({type: DataType.REAL}) 
    wind_gust: number;

    @Column({type: DataType.REAL}) 
    wind_deg: number;

    @Column({type: DataType.REAL}) 
    clouds: number;

    @Column({type: DataType.REAL}) 
    rain_1h: number;

    @Column({type: DataType.REAL}) 
    rain_3h: number;

    @Column({type: DataType.STRING}) 
    sunrise: string;
    
    @Column({type: DataType.STRING}) 
    sunset: string;
    
    @Column({type: DataType.STRING}) 
    icon: string;
    
    @Column({type: DataType.STRING}) 
    description: string;

    @Column({type: DataType.REAL}) 
    visibility: number;

    @Column({type: DataType.REAL}) 
    pop: number;

}

@Table({tableName: 'money_course'})
export class MoneyCourse extends Model<MoneyCourse> {
    
    @Column({type: DataType.REAL, primaryKey: true}) 
    usd: number;

    @Column({type: DataType.REAL}) 
    rub: number;
    
    @Column({type: DataType.REAL}) 
    vnd: number;

    @Column({type: DataType.REAL}) 
    china: number;

    @Column({type: DataType.REAL}) 
    japan: number;

    @Column({type: DataType.REAL}) 
    laos: number;

    @Column({type: DataType.REAL}) 
    tailand: number;

    @Column({type: DataType.REAL}) 
    kambodja: number;

    @Column({type: DataType.REAL}) 
    kz: number;

    @Column({type: DataType.REAL}) 
    korea: number;

    @Column({type: DataType.REAL}) 
    kirgizstan: number;

    @Column({type: DataType.REAL}) 
    uzbekistan: number;

    @Column({type: DataType.REAL}) 
    india: number;

    @Column({type: DataType.REAL}) 
    malaysia: number;

    @Column({type: DataType.REAL}) 
    euro: number;

    @Column({type: DataType.REAL}) 
    lira: number;

    @Column({type: DataType.REAL}) 
    funt: number;
    
    @Column({type: DataType.STRING}) 
    time: string;

}