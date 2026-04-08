import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto, companyId: number) {
    const addressData = await this.getAddressByCep(dto.cep);
    
    const customer = this.customerRepository.create({
      ...dto,
      street: addressData.logradouro || dto.street,
      neighborhood: addressData.bairro || dto.neighborhood,
      city: addressData.localidade || dto.city,
      state: addressData.uf || dto.state,
      companyId,
    });

    return this.customerRepository.save(customer);
  }

  async findAll(companyId: number) {
    return this.customerRepository.find({ where: { companyId } });
  }

  async findOne(id: string, companyId: number) {
    const customer = await this.customerRepository.findOne({ where: { id, companyId } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto, companyId: number) {
    const customer = await this.findOne(id, companyId);
    
    let addressUpdate = {};
    if (dto.cep && dto.cep !== customer.cep) {
      addressUpdate = await this.getAddressByCep(dto.cep);
    }

    const updated = Object.assign(customer, {
      ...dto,
      ...addressUpdate
    });

    return this.customerRepository.save(updated);
  }

  async remove(id: string, companyId: number) {
    const customer = await this.findOne(id, companyId);
    return this.customerRepository.remove(customer);
  }

  private async getAddressByCep(cep: string) {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (response.data.erro) {
        return {};
      }
      return response.data;
    } catch (error) {
      return {};
    }
  }
}
