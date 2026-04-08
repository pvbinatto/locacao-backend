import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  plate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  km: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vehicleValue: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dailyRentalValue: number;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ required: false, default: 'available' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
