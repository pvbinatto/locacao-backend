"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../customer/entities/customer.entity");
const vehicle_entity_1 = require("../vehicle/entities/vehicle.entity");
const rental_entity_1 = require("../rental/entities/rental.entity");
const maintenance_entity_1 = require("../maintenance/entities/maintenance.entity");
let DashboardService = class DashboardService {
    customerRepository;
    vehicleRepository;
    rentalRepository;
    maintenanceRepository;
    constructor(customerRepository, vehicleRepository, rentalRepository, maintenanceRepository) {
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.rentalRepository = rentalRepository;
        this.maintenanceRepository = maintenanceRepository;
    }
    async getStats(companyId) {
        const totalCustomers = await this.customerRepository.count({ where: { companyId } });
        const totalVehicles = await this.vehicleRepository.count({ where: { companyId } });
        const vehicles = await this.vehicleRepository.find({ where: { companyId } });
        const totalStockValue = vehicles.reduce((acc, v) => acc + Number(v.vehicleValue), 0);
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const weeklyRentals = await this.rentalRepository.find({
            where: { companyId, pickupDate: (0, typeorm_2.MoreThan)(startOfWeek) }
        });
        const monthlyRentals = await this.rentalRepository.find({
            where: { companyId, pickupDate: (0, typeorm_2.MoreThan)(startOfMonth) }
        });
        const yearlyRentals = await this.rentalRepository.find({
            where: { companyId, pickupDate: (0, typeorm_2.MoreThan)(startOfYear) }
        });
        const weeklyRevenue = weeklyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);
        const monthlyRevenue = monthlyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);
        const yearlyRevenue = yearlyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);
        const monthlyMaintenances = await this.maintenanceRepository.find({
            where: { companyId, date: (0, typeorm_2.MoreThan)(startOfMonth) }
        });
        const monthlyMaintenanceValue = monthlyMaintenances.reduce((acc, m) => acc + Number(m.value), 0);
        const vehiclesInMaintenance = await this.vehicleRepository.find({
            where: { companyId, status: 'maintenance' },
        });
        const lastRentals = await this.rentalRepository.find({
            where: { companyId },
            relations: ['customer', 'vehicle'],
            order: { pickupDate: 'DESC' },
            take: 5,
        });
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const todaysReturns = await this.rentalRepository.find({
            where: {
                companyId,
                isActive: true
            },
            relations: ['customer', 'vehicle'],
            order: { returnDate: 'ASC' }
        });
        return {
            totalCustomers,
            totalVehicles,
            totalStockValue,
            revenue: {
                weekly: weeklyRevenue,
                monthly: monthlyRevenue,
                yearly: yearlyRevenue,
            },
            lastRentals: lastRentals.map(r => ({
                id: r.id,
                date: r.pickupDate,
                customer: r.customer.name,
                vehicle: `${r.vehicle.brand} ${r.vehicle.model}`,
                value: r.rentalValue,
                status: r.isActive ? 'active' : 'completed',
                isOverdue: new Date(r.returnDate) < new Date() && r.isActive,
            })),
            todaysReturns: todaysReturns.map(r => ({
                id: r.id,
                vehicle: `${r.vehicle.brand} ${r.vehicle.model} (${r.vehicle.plate})`,
                customer: r.customer.name,
                returnDate: r.returnDate,
                isOverdue: new Date(r.returnDate) < new Date(),
            })),
            maintenance: {
                monthlyValue: monthlyMaintenanceValue,
                vehiclesInMaintenance: vehiclesInMaintenance.map(v => ({
                    id: v.id,
                    model: `${v.brand} ${v.model}`,
                    plate: v.plate,
                    status: v.status,
                })),
            },
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(3, (0, typeorm_1.InjectRepository)(maintenance_entity_1.Maintenance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map