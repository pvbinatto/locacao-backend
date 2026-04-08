import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Rental } from '../rental/entities/rental.entity';
import { Maintenance } from '../maintenance/entities/maintenance.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Vehicle, Rental, Maintenance])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
