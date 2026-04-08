import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    create(dto: CreateMaintenanceDto, companyId: number, userId: string): Promise<import("./entities/maintenance.entity").Maintenance>;
    findAll(companyId: number): Promise<import("./entities/maintenance.entity").Maintenance[]>;
    findOne(id: string, companyId: number): Promise<import("./entities/maintenance.entity").Maintenance>;
    update(id: string, dto: UpdateMaintenanceDto, companyId: number): Promise<import("./entities/maintenance.entity").Maintenance>;
    remove(id: string, companyId: number): Promise<{
        message: string;
    }>;
}
