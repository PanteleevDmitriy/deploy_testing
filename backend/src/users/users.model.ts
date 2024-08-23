import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreateAttributs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttributs> {
    
    @ApiProperty({ description: 'user_unique_id', example: '117' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true}) 
    id: number;

    @ApiProperty({ description: 'user_email', example: 'test_user@test.ru' })
    @Column({type: DataType.STRING, unique: true, allowNull: false}) 
    email: string;

    @ApiProperty({ description: 'user_password', example: 'qwerty123' })
    @Column({type: DataType.STRING, allowNull: false}) 
    password: string;

    @ApiProperty({ description: 'user_status', example: 'admin' })
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'user'}) 
    status: string;

    @ApiProperty({ description: 'user_ban_status', example: 'true' })
    @Column({type: DataType.BOOLEAN, defaultValue: false}) 
    banned: boolean;

    @ApiProperty({ description: 'user_ban_reason', example: 'unmaner' })
    @Column({type: DataType.STRING, allowNull: true}) 
    banReason: string;
}



/*
@ApiProperty({ description: 'user_phone_number', example: '88005553535' })
    @Column({type: DataType.STRING, unique: true, allowNull: false}) 
    phone_number: string;
*/