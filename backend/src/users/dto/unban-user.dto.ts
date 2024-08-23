import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UnbanUserDto {

  @IsEmail({}, {message: 'некорректный email!'})
  @IsString({message: 'email должен быть строкой!'})
  @ApiProperty({ description: 'user_email', example: 'test_user@test.ru' })
  readonly email: string;
  
}