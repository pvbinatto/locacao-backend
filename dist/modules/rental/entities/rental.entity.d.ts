import { Customer } from '../../customer/entities/customer.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
export declare class Rental {
    id: string;
    pickupDate: Date;
    returnDate: Date;
    paymentMethod: string;
    observation: string;
    rentalValue: number;
    isActive: boolean;
    customer: Customer;
    customerId: string;
    vehicle: Vehicle;
    vehicleId: string;
    companyId: number;
}
