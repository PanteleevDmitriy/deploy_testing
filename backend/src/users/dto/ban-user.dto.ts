import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class BanUserDto {

  @IsEmail({}, {message: 'некорректный email!'})
  @IsString({message: 'email должен быть строкой!'})
  @ApiProperty({ description: 'user_email', example: 'test_user@test.ru' })
  readonly email: string;

  @Length( 1, 20, {message: 'причина бана должна быт от 1 до 20 символов!'})
  @IsString({message: 'причина бана должна быть строкой!'})
  @ApiProperty({ description: 'user_ban_reason', example: 'unmaner' })
  readonly banReason: string;

}
