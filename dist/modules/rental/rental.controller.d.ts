import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/rental.dto';
export declare class RentalController {
    private readonly rentalService;
    constructor(rentalService: RentalService);
    create(createRentalDto: CreateRentalDto, companyId: number): Promise<import("./entities/rental.entity").Rental>;
    returnVehicle(plate: string, companyId: number): Promise<{
        message: string;
        rental: import("./entities/rental.entity").Rental;
    }>;
    findAll(companyId: number): Promise<import("./entities/rental.entity").Rental[]>;
    findActive(companyId: number): Promise<import("./entities/rental.entity").Rental[]>;
}
