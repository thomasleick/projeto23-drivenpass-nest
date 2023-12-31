import { IsNotEmpty, IsString, IsInt, IsBoolean } from 'class-validator';
import { IsDateAsString } from './custom-validators';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  userId: number;

  @IsNotEmpty()
  @IsInt()
  cardNumber: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateAsString() 
  expiry: string;

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