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
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vehicle_service_1 = require("./vehicle.service");
const vehicle_dto_1 = require("./dto/vehicle.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let VehicleController = class VehicleController {
    vehicleService;
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    create(createVehicleDto, companyId) {
        return this.vehicleService.create(createVehicleDto, companyId);
    }
    findAll(companyId) {
        return this.vehicleService.findAll(companyId);
    }
    countInMaintenance(companyId) {
        return this.vehicleService.countInMaintenance(companyId);
    }
    findOne(id, companyId) {
        return this.vehicleService.findOne(id, companyId);
    }
    findByPlate(plate, companyId) {
        return this.vehicleService.findByPlate(plate, companyId);
    }
    update(id, updateVehicleDto, companyId) {
        return this.vehicleService.update(id, updateVehicleDto, companyId);
    }
    remove(id, companyId) {
        return this.vehicleService.remove(id, companyId);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new vehicle' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicle_dto_1.CreateVehicleDto, Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all vehicles for the company' }),
    __param(0, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('maintenance/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total vehicles in maintenance' }),
    __param(0, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "countInMaintenance", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific vehicle by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('plate/:plate'),
    (0, swagger_1.ApiOperation)({ summary: 'Search vehicle by plate' }),
    __param(0, (0, common_1.Param)('plate')),
    __param(1, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "findByPlate", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle information' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vehicle_dto_1.UpdateVehicleDto, Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a vehicle' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "remove", null);
exports.VehicleController = VehicleController = __decorate([
    (0, swagger_1.ApiTags)('vehicles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map