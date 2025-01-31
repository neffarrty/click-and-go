import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string
}
