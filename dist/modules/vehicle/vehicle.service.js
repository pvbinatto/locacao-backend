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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./entities/vehicle.entity");
let VehicleService = class VehicleService {
    vehicleRepository;
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async create(dto, companyId) {
        const existingVehicle = await this.vehicleRepository.findOne({ where: { plate: dto.plate } });
        if (existingVehicle) {
            throw new common_1.ConflictException('Vehicle with this plate already exists');
        }
        const vehicle = this.vehicleRepository.create({
            ...dto,
            companyId,
            isAvailable: true,
        });
        return this.vehicleRepository.save(vehicle);
    }
    async findAll(companyId) {
        const vehicles = await this.vehicleRepository.find({
            where: { companyId },
            relations: ['rentals']
        });
        return vehicles.map(vehicle => {
            const activeRental = vehicle.rentals?.find(r => r.isActive);
            if (activeRental) {
                vehicle.status = 'rented';
                vehicle.isAvailable = false;
            }
            else if (vehicle.status === 'rented') {
                vehicle.status = 'available';
                vehicle.isAvailable = true;
            }
            return vehicle;
        });
    }
    async findOne(id, companyId) {
        const vehicle = await this.vehicleRepository.findOne({ where: { id, companyId } });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        return vehicle;
    }
    async findByPlate(plate, companyId) {
        const vehicle = await this.vehicleRepository.findOne({ where: { plate, companyId } });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle with this plate not found');
        }
        return vehicle;
    }
    async update(id, dto, companyId) {
        const vehicle = await this.findOne(id, companyId);
        Object.assign(vehicle, dto);
        return this.vehicleRepository.save(vehicle);
    }
    async remove(id, companyId) {
        const vehicle = await this.findOne(id, companyId);
        return this.vehicleRepository.remove(vehicle);
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map