import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateMaintenanceDto, companyId: number, userId: string) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: dto.vehicleId, companyId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (vehicle.status === 'rented' || !vehicle.isAvailable) {
      throw new BadRequestException('Vehicle is currently rented. It must be returned before maintenance.');
    }

    const maintenance = this.maintenanceRepository.create({
      vehicleId: dto.vehicleId,
      description: dto.description || null,
      value: dto.value,
      status: dto.status,
      date: new Date(dto.date),
      returnDate: dto.returnDate ? new Date(dto.returnDate) : null,
      companyId,
      userId,
    });

    const savedMaintenance = await this.maintenanceRepository.save(maintenance);

    // Update vehicle status
    if (dto.status !== 'Finished') {
      vehicle.status = 'maintenance';
      vehicle.isAvailable = false;
    } else {
      vehicle.status = 'available';
      vehicle.isAvailable = true;
    }
    await this.vehicleRepository.save(vehicle);

    return savedMaintenance;
  }

  async findAll(companyId: number) {
    return this.maintenanceRepository.find({
      where: { companyId },
      relations: ['vehicle', 'user'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string, companyId: number) {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id, companyId },
      relations: ['vehicle', 'user'],
    });

    if (!maintenance) {
      throw new NotFoundException('Maintenance record not found');
    }

    return maintenance;
  }

  async update(id: string, dto: UpdateMaintenanceDto, companyId: number) {
    const maintenance = await this.findOne(id, companyId);
    
    const oldStatus = maintenance.status;
    
    if (dto.vehicleId) maintenance.vehicleId = dto.vehicleId;
    if (dto.description !== undefined) maintenance.description = dto.description || null;
    if (dto.value !== undefined) maintenance.value = dto.value;
    if (dto.status !== undefined) maintenance.status = dto.status;
    if (dto.date) maintenance.date = new Date(dto.date);
    if (dto.returnDate !== undefined) maintenance.returnDate = dto.returnDate ? new Date(dto.returnDate) : null;

    const updatedMaintenance = await this.maintenanceRepository.save(maintenance);

    // If status changed to Finished, update vehicle
    if (dto.status && dto.status !== oldStatus) {
      const vehicle = await this.vehicleRepository.findOne({
        where: { id: maintenance.vehicleId, companyId },
      });

      if (vehicle) {
        if (dto.status === 'Finished') {
          vehicle.status = 'available';
          vehicle.isAvailable = true;
        } else {
          vehicle.status = 'maintenance';
          vehicle.isAvailable = false;
        }
        await this.vehicleRepository.save(vehicle);
      }
    }

    return updatedMaintenance;
  }

  async remove(id: string, companyId: number) {
    const maintenance = await this.findOne(id, companyId);
    const vehicleId = maintenance.vehicleId;

    await this.maintenanceRepository.remove(maintenance);

    // After deleting, return vehicle to available (as requested)
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId, companyId },
    });

    if (vehicle) {
      vehicle.status = 'available';
      vehicle.isAvailable = true;
      await this.vehicleRepository.save(vehicle);
    }

    return { message: 'Maintenance record deleted and vehicle returned to available status' };
  }
}
