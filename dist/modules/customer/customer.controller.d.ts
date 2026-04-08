import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto, companyId: number): Promise<import("./entities/customer.entity").Customer>;
    findAll(companyId: number): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: string, companyId: number): Promise<import("./entities/customer.entity").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, companyId: number): Promise<import("./entities/customer.entity").Customer & {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        cep?: string | undefined;
        street?: string | undefined;
        number?: string | undefined;
        neighborhood?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
    }>;
    remove(id: string, companyId: number): Promise<import("./entities/customer.entity").Customer>;
}
