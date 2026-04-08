import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'joao@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11999999999' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'minha_senha_123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Minha Empresa Ltda' })
  @IsNotEmpty()
  @IsString()
  companyName: string;
}
