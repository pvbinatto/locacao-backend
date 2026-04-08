import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CreateRentalDto } from './dto/rental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateRentalDto, companyId: number) {
    const vehicle = await this.vehicleRepository.findOne({ 
      where: { id: dto.vehicleId, companyId } 
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (!vehicle.isAvailable) {
      throw new BadRequestException('Vehicle is already rented');
    }

    const rental = this.rentalRepository.create({
      pickupDate: new Date(dto.rentalDate),
      returnDate: new Date(dto.expectedReturnDate),
      paymentMethod: dto.paymentMethod,
      observation: dto.observation,
      rentalValue: dto.rentalValue,
      customerId: dto.customerId,
      vehicleId: dto.vehicleId,
      companyId,
      isActive: true,
    });

    const savedRental = await this.rentalRepository.save(rental);

    // Mark vehicle as unavailable and set status to rented
    vehicle.isAvailable = false;
    vehicle.status = 'rented';
    await this.vehicleRepository.save(vehicle);

    return savedRental;
  }

  async returnVehicle(plate: string, companyId: number) {
    const vehicle = await this.vehicleRepository.findOne({ 
      where: { plate, companyId } 
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle with this plate not found');
    }

    const activeRental = await this.rentalRepository.findOne({
      where: { vehicleId: vehicle.id, isActive: true, companyId },
    });

    if (!activeRental) {
      throw new BadRequestException('No active rental found for this vehicle');
    }

    // Mark rental as completed
    activeRental.isActive = false;
    await this.rentalRepository.save(activeRental);

    // Mark vehicle as available again and reset status
    vehicle.isAvailable = true;
    vehicle.status = 'available';
    await this.vehicleRepository.save(vehicle);

    return { message: 'Vehicle returned successfully', rental: activeRental };
  }

  async findAll(companyId: number) {
    return this.rentalRepository.find({
      where: { companyId },
      relations: ['customer', 'vehicle'],
      order: { pickupDate: 'DESC' },
    });
  }

  async findActive(companyId: number) {
    return this.rentalRepository.find({
      where: { companyId, isActive: true },
      relations: ['customer', 'vehicle'],
    });
  }
}
