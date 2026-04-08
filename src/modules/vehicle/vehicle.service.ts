import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateVehicleDto, companyId: number) {
    const existingVehicle = await this.vehicleRepository.findOne({ where: { plate: dto.plate } });
    if (existingVehicle) {
      throw new ConflictException('Vehicle with this plate already exists');
    }

    const vehicle = this.vehicleRepository.create({
      ...dto,
      companyId,
      isAvailable: true,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async findAll(companyId: number) {
    const vehicles = await this.vehicleRepository.find({ 
      where: { companyId },
      relations: ['rentals']
    });

    return vehicles.map(vehicle => {
      const activeRental = vehicle.rentals?.find(r => r.isActive);
      if (activeRental) {
        vehicle.status = 'rented';
        vehicle.isAvailable = false;
      } else if (vehicle.status === 'rented') {
        // Se o status era locado mas não temos locação ativa, retornamos para disponível
        // Exceto se o status for manutenção, que deve ser preservado
        vehicle.status = 'available';
        vehicle.isAvailable = true;
      }
      return vehicle;
    });
  }

  async findOne(id: string, companyId: number) {
    const vehicle = await this.vehicleRepository.findOne({ where: { id, companyId } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async findByPlate(plate: string, companyId: number) {
    const vehicle = await this.vehicleRepository.findOne({ where: { plate, companyId } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle with this plate not found');
    }
    return vehicle;
  }

  async update(id: string, dto: UpdateVehicleDto, companyId: number) {
    const vehicle = await this.findOne(id, companyId);
    Object.assign(vehicle, dto);
    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: string, companyId: number) {
    const vehicle = await this.findOne(id, companyId);
    return this.vehicleRepository.remove(vehicle);
  }

  async countInMaintenance(companyId: number) {
    return this.vehicleRepository.count({
      where: { companyId, status: In(['maintenance', 'in maintenance']) }
    });
  }
}
