import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsEmail({}, { message: 'некорректный email!' })
  @IsString({ message: 'email должен быть строкой!' })
  readonly email: string;
    
  @Length(6, 20, { message: 'пароль должен быть от 6 до 20 символов!' })
  @IsString({ message: 'пароль должен быть строкой!' })
  readonly password: string;

  @IsString({ message: 'captchaToken должен быть строкой!' })
  readonly captchaToken: string;
}
