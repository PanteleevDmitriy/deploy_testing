import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreateAttributs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttributs> {
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) 
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false}) 
    email: string;

    @Column({type: DataType.STRING, allowNull: false}) 
    password: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'user'}) 
    status: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false}) 
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true}) 
    banReason: string;

    @Column({ allowNull: true })
    refreshToken: string;

    @Column({ defaultValue: false })
    isConfirmed: boolean;

    @Column({ allowNull: true })
    lastConfirmationEmailSentAt: Date;
}



/*
@ApiProperty({ description: 'user_phone_number', example: '88005553535' })
    @Column({type: DataType.STRING, unique: true, allowNull: false}) 
    phone_number: string;
*/