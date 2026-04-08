import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  rentalDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  expectedReturnDate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rentalValue: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  observation?: string;
}

export class ReturnRentalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  plate: string;
}
