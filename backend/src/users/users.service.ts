import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnbanUserDto } from './dto/unban-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { MakeAdminDto } from './dto/make-admin.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User ) {}

    async createNewUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        if (user) {
            return user;
        }
        return `Пользователя с id = ${id} нет в базе`
    }

    async makeAdmin(dto: MakeAdminDto) {
        const email = dto.email
        const user = await this.userRepository.findOne({where: {email}});
        const ban_status = user.banned
        if (user) {
            if (ban_status != true) {
                user.status = 'admin'
                await user.save()
                return user;
            }
            'Нельзя сделать админом пользователя, если он забанен!'
        }
        return `Пользователя с email = ${email} нет в базе`

    }

    async deleteUserByEmail(dto: DeleteUserDto) {
        const email = dto.email
        const user = await this.userRepository.findOne({where: {email}});
        if (user) {
            const id = user.id
            const ban_status = user.banned
            if (ban_status == true) {
                await this.userRepository.destroy({where: {id}});
                return user;
            }
            return 'Можно удалить пользователя, только если он забанен!'
            
        }
        return `Пользователя с email = ${email} нет в базе`
    }

    async banUser(dto: BanUserDto) {
        const email = dto.email
        const user = await this.userRepository.findOne({where: {email}});
        if (user) {
            if (user.banned == true) {
                return 'Пользователь уже забанен!'
            }
            if (user.status == 'admin') {
                return 'Нельзя забанить админа!'
            }
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            return user;
        }
        return `Пользователя с email = ${email} нет в базе`
    }

    async unbanUser(dto: UnbanUserDto) {
        const email = dto.email
        const user = await this.userRepository.findOne({where: {email}});
        if (user) {
            if (user.banned == false) {
                return 'Пользователь не забанен!'
            }
            user.banned = false
            user.banReason = null
            await user.save()
            return user;
        }
        return `Пользователя с email = ${email} нет в базе`
    }

}
