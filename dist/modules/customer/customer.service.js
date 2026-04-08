"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = __importDefault(require("axios"));
const customer_entity_1 = require("./entities/customer.entity");
let CustomerService = class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(dto, companyId) {
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
    async findAll(companyId) {
        return this.customerRepository.find({ where: { companyId } });
    }
    async findOne(id, companyId) {
        const customer = await this.customerRepository.findOne({ where: { id, companyId } });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async update(id, dto, companyId) {
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
    async remove(id, companyId) {
        const customer = await this.findOne(id, companyId);
        return this.customerRepository.remove(customer);
    }
    async getAddressByCep(cep) {
        try {
            const cleanCep = cep.replace(/\D/g, '');
            const response = await axios_1.default.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
            if (response.data.erro) {
                return {};
            }
            return response.data;
        }
        catch (error) {
            return {};
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map