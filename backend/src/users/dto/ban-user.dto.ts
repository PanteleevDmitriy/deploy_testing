import { IsEmail, IsString, Length } from "class-validator";

export class BanUserDto {

  @IsEmail({}, {message: 'некорректный email!'})
  @IsString({message: 'email должен быть строкой!'})
  readonly email: string;

  @Length( 1, 20, {message: 'причина бана должна быт от 1 до 20 символов!'})
  @IsString({message: 'причина бана должна быть строкой!'})
  readonly banReason: string;

}
