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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const maintenance_entity_1 = require("./entities/maintenance.entity");
const vehicle_entity_1 = require("../vehicle/entities/vehicle.entity");
let MaintenanceService = class MaintenanceService {
    maintenanceRepository;
    vehicleRepository;
    constructor(maintenanceRepository, vehicleRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.vehicleRepository = vehicleRepository;
    }
    async create(dto, companyId, userId) {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: dto.vehicleId, companyId },
        });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        if (vehicle.status === 'rented' || !vehicle.isAvailable) {
            throw new common_1.BadRequestException('Vehicle is currently rented. It must be returned before maintenance.');
        }
        const maintenance = this.maintenanceRepository.create({
            vehicleId: dto.vehicleId,
            description: dto.description || null,
            value: dto.value,
            status: dto.status,
            date: new Date(dto.date),
            returnDate: dto.returnDate ? new Date(dto.returnDate) : null,
            companyId,
            userId,
        });
        const savedMaintenance = await this.maintenanceRepository.save(maintenance);
        if (dto.status !== 'Finished') {
            vehicle.status = 'maintenance';
            vehicle.isAvailable = false;
        }
        else {
            vehicle.status = 'available';
            vehicle.isAvailable = true;
        }
        await this.vehicleRepository.save(vehicle);
        return savedMaintenance;
    }
    async findAll(companyId) {
        return this.maintenanceRepository.find({
            where: { companyId },
            relations: ['vehicle', 'user'],
            order: { date: 'DESC' },
        });
    }
    async findOne(id, companyId) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: { id, companyId },
            relations: ['vehicle', 'user'],
        });
        if (!maintenance) {
            throw new common_1.NotFoundException('Maintenance record not found');
        }
        return maintenance;
    }
    async update(id, dto, companyId) {
        const maintenance = await this.findOne(id, companyId);
        const oldStatus = maintenance.status;
        if (dto.vehicleId)
            maintenance.vehicleId = dto.vehicleId;
        if (dto.description !== undefined)
            maintenance.description = dto.description || null;
        if (dto.value !== undefined)
            maintenance.value = dto.value;
        if (dto.status !== undefined)
            maintenance.status = dto.status;
        if (dto.date)
            maintenance.date = new Date(dto.date);
        if (dto.returnDate !== undefined)
            maintenance.returnDate = dto.returnDate ? new Date(dto.returnDate) : null;
        const updatedMaintenance = await this.maintenanceRepository.save(maintenance);
        if (dto.status && dto.status !== oldStatus) {
            const vehicle = await this.vehicleRepository.findOne({
                where: { id: maintenance.vehicleId, companyId },
            });
            if (vehicle) {
                if (dto.status === 'Finished') {
                    vehicle.status = 'available';
                    vehicle.isAvailable = true;
                }
                else {
                    vehicle.status = 'maintenance';
                    vehicle.isAvailable = false;
                }
                await this.vehicleRepository.save(vehicle);
            }
        }
        return updatedMaintenance;
    }
    async remove(id, companyId) {
        const maintenance = await this.findOne(id, companyId);
        const vehicleId = maintenance.vehicleId;
        await this.maintenanceRepository.remove(maintenance);
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: vehicleId, companyId },
        });
        if (vehicle) {
            vehicle.status = 'available';
            vehicle.isAvailable = true;
            await this.vehicleRepository.save(vehicle);
        }
        return { message: 'Maintenance record deleted and vehicle returned to available status' };
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(maintenance_entity_1.Maintenance)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map