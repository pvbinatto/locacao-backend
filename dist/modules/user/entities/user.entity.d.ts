import { Company } from '../../company/entities/company.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    company: Company;
    companyId: number;
}
