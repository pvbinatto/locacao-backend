import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';
export declare class MaintenanceService {
    private maintenanceRepository;
    private vehicleRepository;
    constructor(maintenanceRepository: Repository<Maintenance>, vehicleRepository: Repository<Vehicle>);
    create(dto: CreateMaintenanceDto, companyId: number, userId: string): Promise<Maintenance>;
    findAll(companyId: number): Promise<Maintenance[]>;
    findOne(id: string, companyId: number): Promise<Maintenance>;
    update(id: string, dto: UpdateMaintenanceDto, companyId: number): Promise<Maintenance>;
    remove(id: string, companyId: number): Promise<{
        message: string;
    }>;
}
