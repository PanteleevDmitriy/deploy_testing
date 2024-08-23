import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { MakeAdminDto } from './dto/make-admin.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createNewUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<string | User>;
    makeAdmin(dto: MakeAdminDto): Promise<string | User>;
    deleteUserByEmail(dto: DeleteUserDto): Promise<string | User>;
    banUser(dto: BanUserDto): Promise<string | User>;
    unbanUser(dto: UnbanUserDto): Promise<string | User>;
}
