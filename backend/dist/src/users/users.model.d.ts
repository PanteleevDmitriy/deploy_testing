import { Model } from "sequelize-typescript";
interface UserCreateAttributs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreateAttributs> {
    id: number;
    email: string;
    password: string;
    status: string;
    banned: boolean;
    banReason: string;
}
export {};
