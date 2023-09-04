import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  userId: number;
}