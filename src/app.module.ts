import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { CustomerModule } from './modules/customer/customer.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { RentalModule } from './modules/rental/rental.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';

import { Company } from './modules/company/entities/company.entity';
import { User } from './modules/user/entities/user.entity';
import { Customer } from './modules/customer/entities/customer.entity';
import { Vehicle } from './modules/vehicle/entities/vehicle.entity';
import { Rental } from './modules/rental/entities/rental.entity';
import { Maintenance } from './modules/maintenance/entities/maintenance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3307),
        username: configService.get<string>('DB_USERNAME', 'user'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_DATABASE', 'locacar'),
        entities: [Company, User, Customer, Vehicle, Rental, Maintenance],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    CustomerModule,
    VehicleModule,
    RentalModule,
    DashboardModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
