import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsEmail({}, {message: 'некорректный email!'})
  @IsString({message: 'email должен быть строкой!'})
  @ApiProperty({ description: 'user_email', example: 'test_user@test.ru' })
  readonly email: string;
    
  @Length( 4, 20, {message: 'пароль должен быть от 4 до 20 символов!'})
  @IsString({message: 'пароль должен быть строкой!'})
  @ApiProperty({ description: 'user_password', example: 'qwerty123' })
  readonly password: string;

}