import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
export declare class VehicleService {
    private vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    create(dto: CreateVehicleDto, companyId: number): Promise<Vehicle>;
    findAll(companyId: number): Promise<Vehicle[]>;
    findOne(id: string, companyId: number): Promise<Vehicle>;
    findByPlate(plate: string, companyId: number): Promise<Vehicle>;
    update(id: string, dto: UpdateVehicleDto, companyId: number): Promise<Vehicle>;
    remove(id: string, companyId: number): Promise<Vehicle>;
}
