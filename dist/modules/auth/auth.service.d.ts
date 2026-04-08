import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private companyRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, companyRepository: Repository<Company>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            company: Company;
            companyId: number;
        };
        access_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            company: Company;
            companyId: number;
        };
        access_token: string;
    }>;
    private generateToken;
}
