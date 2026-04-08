import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CreateRentalDto } from './dto/rental.dto';
export declare class RentalService {
    private rentalRepository;
    private vehicleRepository;
    constructor(rentalRepository: Repository<Rental>, vehicleRepository: Repository<Vehicle>);
    create(dto: CreateRentalDto, companyId: number): Promise<Rental>;
    returnVehicle(plate: string, companyId: number): Promise<{
        message: string;
        rental: Rental;
    }>;
    findAll(companyId: number): Promise<Rental[]>;
    findActive(companyId: number): Promise<Rental[]>;
}
