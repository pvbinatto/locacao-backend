import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const company = this.companyRepository.create({
      name: dto.companyName,
    });
    const savedCompany = await this.companyRepository.save(company);

    const user = this.userRepository.create({
      name: dto.userName,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
      companyId: savedCompany.id,
    });
    const savedUser = await this.userRepository.save(user);

    const { password, ...result } = savedUser;
    
    // Auto login after registration
    return {
      user: result,
      access_token: this.generateToken(savedUser),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return {
      user: result,
      access_token: this.generateToken(user),
    };
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email, companyId: user.companyId };
    return this.jwtService.sign(payload);
  }
}
