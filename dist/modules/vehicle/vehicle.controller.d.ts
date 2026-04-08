import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    create(createVehicleDto: CreateVehicleDto, companyId: number): Promise<import("./entities/vehicle.entity").Vehicle>;
    findAll(companyId: number): Promise<import("./entities/vehicle.entity").Vehicle[]>;
    countInMaintenance(companyId: number): Promise<number>;
    findOne(id: string, companyId: number): Promise<import("./entities/vehicle.entity").Vehicle>;
    findByPlate(plate: string, companyId: number): Promise<import("./entities/vehicle.entity").Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto, companyId: number): Promise<import("./entities/vehicle.entity").Vehicle>;
    remove(id: string, companyId: number): Promise<import("./entities/vehicle.entity").Vehicle>;
}
