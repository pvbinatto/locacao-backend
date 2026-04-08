import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @ApiProperty({
    enum: ['In Maintenance', 'Waiting for Parts', 'Waiting for External Service', 'Finished'],
    default: 'In Maintenance',
  })
  @IsEnum(['In Maintenance', 'Waiting for Parts', 'Waiting for External Service', 'Finished'])
  @IsNotEmpty()
  status: string;
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
