import { UsersService } from './users.service';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { MakeAdminDto } from './dto/make-admin.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAllUsers(): Promise<import("./users.model").User[]>;
    getUserById(id: number): Promise<string | import("./users.model").User>;
    makeAdmin(dto: MakeAdminDto): Promise<string | import("./users.model").User>;
    banUser(dto: BanUserDto): Promise<string | import("./users.model").User>;
    unbanUser(dto: UnbanUserDto): Promise<string | import("./users.model").User>;
    deleteUserByEmail(dto: DeleteUserDto): Promise<string | import("./users.model").User>;
}
