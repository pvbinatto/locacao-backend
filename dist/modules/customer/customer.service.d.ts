import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    create(dto: CreateCustomerDto, companyId: number): Promise<Customer>;
    findAll(companyId: number): Promise<Customer[]>;
    findOne(id: string, companyId: number): Promise<Customer>;
    update(id: string, dto: UpdateCustomerDto, companyId: number): Promise<Customer & {
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
    remove(id: string, companyId: number): Promise<Customer>;
    private getAddressByCep;
}
