import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../../rental/entities/rental.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ unique: true })
  plate: string;

  @Column()
  color: string;

  @Column('int')
  km: number;

  @Column('decimal', { precision: 12, scale: 2 })
  vehicleValue: number;

  @Column('decimal', { precision: 12, scale: 2 })
  dailyRentalValue: number;

  @Column({ default: 'available' })
  status: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  companyId: number;

  @OneToMany(() => Rental, (rental) => rental.vehicle)
  rentals: Rental[];
}
