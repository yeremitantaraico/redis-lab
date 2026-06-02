import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  user!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  text!: string;
}
