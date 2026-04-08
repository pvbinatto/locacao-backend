"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const company_module_1 = require("./modules/company/company.module");
const customer_module_1 = require("./modules/customer/customer.module");
const vehicle_module_1 = require("./modules/vehicle/vehicle.module");
const rental_module_1 = require("./modules/rental/rental.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
const company_entity_1 = require("./modules/company/entities/company.entity");
const user_entity_1 = require("./modules/user/entities/user.entity");
const customer_entity_1 = require("./modules/customer/entities/customer.entity");
const vehicle_entity_1 = require("./modules/vehicle/entities/vehicle.entity");
const rental_entity_1 = require("./modules/rental/entities/rental.entity");
const maintenance_entity_1 = require("./modules/maintenance/entities/maintenance.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3307),
                    username: configService.get('DB_USERNAME', 'user'),
                    password: configService.get('DB_PASSWORD', 'password'),
                    database: configService.get('DB_DATABASE', 'locacar'),
                    entities: [company_entity_1.Company, user_entity_1.User, customer_entity_1.Customer, vehicle_entity_1.Vehicle, rental_entity_1.Rental, maintenance_entity_1.Maintenance],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            company_module_1.CompanyModule,
            customer_module_1.CustomerModule,
            vehicle_module_1.VehicleModule,
            rental_module_1.RentalModule,
            dashboard_module_1.DashboardModule,
            maintenance_module_1.MaintenanceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map