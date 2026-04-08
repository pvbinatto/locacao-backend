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
exports.RentalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rental_entity_1 = require("./entities/rental.entity");
const vehicle_entity_1 = require("../vehicle/entities/vehicle.entity");
let RentalService = class RentalService {
    rentalRepository;
    vehicleRepository;
    constructor(rentalRepository, vehicleRepository) {
        this.rentalRepository = rentalRepository;
        this.vehicleRepository = vehicleRepository;
    }
    async create(dto, companyId) {
        const vehicle = await this.vehicleRepository.findOne({
            where: { id: dto.vehicleId, companyId }
        });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        if (!vehicle.isAvailable) {
            throw new common_1.BadRequestException('Vehicle is already rented');
        }
        const rental = this.rentalRepository.create({
            pickupDate: new Date(dto.rentalDate),
            returnDate: new Date(dto.expectedReturnDate),
            paymentMethod: dto.paymentMethod,
            observation: dto.observation,
            rentalValue: dto.rentalValue,
            customerId: dto.customerId,
            vehicleId: dto.vehicleId,
            companyId,
            isActive: true,
        });
        const savedRental = await this.rentalRepository.save(rental);
        vehicle.isAvailable = false;
        vehicle.status = 'rented';
        await this.vehicleRepository.save(vehicle);
        return savedRental;
    }
    async returnVehicle(plate, companyId) {
        const vehicle = await this.vehicleRepository.findOne({
            where: { plate, companyId }
        });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle with this plate not found');
        }
        const activeRental = await this.rentalRepository.findOne({
            where: { vehicleId: vehicle.id, isActive: true, companyId },
        });
        if (!activeRental) {
            throw new common_1.BadRequestException('No active rental found for this vehicle');
        }
        activeRental.isActive = false;
        await this.rentalRepository.save(activeRental);
        vehicle.isAvailable = true;
        vehicle.status = 'available';
        await this.vehicleRepository.save(vehicle);
        return { message: 'Vehicle returned successfully', rental: activeRental };
    }
    async findAll(companyId) {
        return this.rentalRepository.find({
            where: { companyId },
            relations: ['customer', 'vehicle'],
            order: { pickupDate: 'DESC' },
        });
    }
    async findActive(companyId) {
        return this.rentalRepository.find({
            where: { companyId, isActive: true },
            relations: ['customer', 'vehicle'],
        });
    }
};
exports.RentalService = RentalService;
exports.RentalService = RentalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RentalService);
//# sourceMappingURL=rental.service.js.map