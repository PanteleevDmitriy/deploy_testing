import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { JwtAdminGuard } from 'src/auth/jwt-admin.guard';
import { MakeAdminDto } from './dto/make-admin.dto';
import { ValidationPipe } from 'pipes/validation-pipe';

@ApiTags('users') 
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'get all users' })
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/get/:id')
    @ApiOperation({ summary: 'get user by id' })
    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'make admin', description: 'только для авторизованных пользователей!' })
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Patch('/admin')
    makeAdmin(@Body() dto: MakeAdminDto) {
        return this.userService.makeAdmin(dto);
    }

    @ApiOperation({ summary: 'ban user', description: 'только для админов!' })
    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Patch('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto);
    }

    @ApiOperation({ summary: 'unban user', description: 'только для админов!' })
    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Patch('/unban')
    unbanUser(@Body() dto: UnbanUserDto) {
        return this.userService.unbanUser(dto);
    }

    @ApiOperation({ summary: 'delete user by email', description: 'только для админов!' })
    @UseGuards(JwtAdminGuard)
    @UsePipes(ValidationPipe)
    @Delete('/delete')
    deleteUserByEmail(@Body() dto: DeleteUserDto) {
        return this.userService.deleteUserByEmail(dto);
    }

}
