import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { JwtAdminGuard } from 'src/auth/jwt-admin.guard';
import { MakeAdminDto } from './dto/make-admin.dto';
import { ValidationPipe } from 'pipes/validation-pipe';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/get/:id')
    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Patch('/admin')
    makeAdmin(@Body() dto: MakeAdminDto) {
        return this.userService.makeAdmin(dto);
    }

    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Patch('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto);
    }

    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Patch('/unban')
    unbanUser(@Body() dto: UnbanUserDto) {
        return this.userService.unbanUser(dto);
    }

    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Delete('/delete')
    deleteUserByEmail(@Body() dto: DeleteUserDto) {
        return this.userService.deleteUserByEmail(dto);
    }

}
