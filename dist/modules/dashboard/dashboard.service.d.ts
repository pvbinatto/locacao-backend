import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Rental } from '../rental/entities/rental.entity';
import { Maintenance } from '../maintenance/entities/maintenance.entity';
export declare class DashboardService {
    private customerRepository;
    private vehicleRepository;
    private rentalRepository;
    private maintenanceRepository;
    constructor(customerRepository: Repository<Customer>, vehicleRepository: Repository<Vehicle>, rentalRepository: Repository<Rental>, maintenanceRepository: Repository<Maintenance>);
    getStats(companyId: number): Promise<{
        totalCustomers: number;
        totalVehicles: number;
        totalStockValue: number;
        revenue: {
            weekly: number;
            monthly: number;
            yearly: number;
        };
        lastRentals: {
            id: string;
            date: Date;
            customer: string;
            vehicle: string;
            value: number;
            status: string;
            isOverdue: boolean;
        }[];
        todaysReturns: {
            id: string;
            vehicle: string;
            customer: string;
            returnDate: Date;
            isOverdue: boolean;
        }[];
        maintenance: {
            monthlyValue: number;
            vehiclesInMaintenance: {
                id: string;
                model: string;
                plate: string;
                status: string;
            }[];
        };
    }>;
}
