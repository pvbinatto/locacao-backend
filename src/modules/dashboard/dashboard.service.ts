import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Rental } from '../rental/entities/rental.entity';
import { Maintenance } from '../maintenance/entities/maintenance.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(Maintenance)
    private maintenanceRepository: Repository<Maintenance>,
  ) {}

  async getStats(companyId: number) {
    const totalCustomers = await this.customerRepository.count({ where: { companyId } });
    const totalVehicles = await this.vehicleRepository.count({ where: { companyId } });
    
    // Total Stock Value
    const vehicles = await this.vehicleRepository.find({ where: { companyId } });
    const totalStockValue = vehicles.reduce((acc, v) => acc + Number(v.vehicleValue), 0);

    // Revenue calculations
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const weeklyRentals = await this.rentalRepository.find({
      where: { companyId, pickupDate: MoreThan(startOfWeek) }
    });
    const monthlyRentals = await this.rentalRepository.find({
      where: { companyId, pickupDate: MoreThan(startOfMonth) }
    });
    const yearlyRentals = await this.rentalRepository.find({
      where: { companyId, pickupDate: MoreThan(startOfYear) }
    });

    const weeklyRevenue = weeklyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);
    const monthlyRevenue = monthlyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);
    const yearlyRevenue = yearlyRentals.reduce((acc, r) => acc + Number(r.rentalValue), 0);

    // Maintenance calculations
    const monthlyMaintenances = await this.maintenanceRepository.find({
      where: { companyId, date: MoreThan(startOfMonth) }
    });
    const monthlyMaintenanceValue = monthlyMaintenances.reduce((acc, m) => acc + Number(m.value), 0);

    const vehiclesInMaintenance = await this.vehicleRepository.find({
      where: { companyId, status: 'in maintenance' },
    });

    // Last 5 rentals
    const lastRentals = await this.rentalRepository.find({
      where: { companyId },
      relations: ['customer', 'vehicle'],
      order: { pickupDate: 'DESC' },
      take: 5,
    });

    // Pending returns (Today or overdue)
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todaysReturns = await this.rentalRepository.find({
      where: { 
        companyId, 
        isActive: true 
      },
      relations: ['customer', 'vehicle'],
      order: { returnDate: 'ASC' }
    });

    return {
      totalCustomers,
      totalVehicles,
      totalStockValue,
      revenue: {
        weekly: weeklyRevenue,
        monthly: monthlyRevenue,
        yearly: yearlyRevenue,
      },
      lastRentals: lastRentals.map(r => ({
        id: r.id,
        date: r.pickupDate,
        customer: r.customer.name,
        vehicle: `${r.vehicle.brand} ${r.vehicle.model}`,
        value: r.rentalValue,
        status: r.isActive ? 'active' : 'completed',
        isOverdue: new Date(r.returnDate) < new Date() && r.isActive,
      })),
      todaysReturns: todaysReturns.map(r => ({
        id: r.id,
        vehicle: `${r.vehicle.brand} ${r.vehicle.model} (${r.vehicle.plate})`,
        customer: r.customer.name,
        returnDate: r.returnDate,
        isOverdue: new Date(r.returnDate) < new Date(),
      })),
      maintenance: {
        monthlyValue: monthlyMaintenanceValue,
        vehiclesInMaintenance: vehiclesInMaintenance.map(v => ({
          id: v.id,
          model: `${v.brand} ${v.model}`,
          plate: v.plate,
          status: v.status,
        })),
      },
    };
  }
}
