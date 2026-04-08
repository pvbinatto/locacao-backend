import { Rental } from '../../rental/entities/rental.entity';
export declare class Vehicle {
    id: string;
    brand: string;
    model: string;
    plate: string;
    color: string;
    km: number;
    vehicleValue: number;
    dailyRentalValue: number;
    status: string;
    isAvailable: boolean;
    companyId: number;
    rentals: Rental[];
}
