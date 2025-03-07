import { IsEmail, IsString } from "class-validator";

export class MakeAdminDto {

  @IsEmail({}, {message: 'некорректный email!'})
  @IsString({message: 'email должен быть строкой!'})
  readonly email: string;
    
}
