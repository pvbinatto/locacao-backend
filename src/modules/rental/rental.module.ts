import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Vehicle])],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
