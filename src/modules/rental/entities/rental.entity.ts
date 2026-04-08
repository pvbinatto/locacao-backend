import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pickupDate: Date;

  @Column()
  returnDate: Date;

  @Column()
  paymentMethod: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column('decimal', { precision: 12, scale: 2 })
  rentalValue: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  customerId: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: string;

  @Column()
  companyId: number;
}
