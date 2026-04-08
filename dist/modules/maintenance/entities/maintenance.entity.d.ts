import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { User } from '../../user/entities/user.entity';
export declare class Maintenance {
    id: string;
    date: Date;
    vehicleId: string;
    vehicle: Vehicle;
    description: string | null;
    value: number;
    userId: string;
    user: User;
    returnDate: Date | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: number;
}
