import { IsNotEmpty, IsString, IsBoolean, IsDate } from 'class-validator';

export class EncryptedCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  userId: number;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  expiry: Date;

  @IsNotEmpty()
  cvc: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @IsNotEmpty()
  @IsString()
  type: string;
}