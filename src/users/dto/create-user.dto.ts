import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'A senha deve conter pelo menos 10 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e 1 caractere especial.',
  })
  password: string;
}