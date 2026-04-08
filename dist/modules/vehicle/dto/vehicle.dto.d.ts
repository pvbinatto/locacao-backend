export declare class CreateVehicleDto {
    brand: string;
    model: string;
    plate: string;
    color: string;
    km: number;
    vehicleValue: number;
    dailyRentalValue: number;
    isAvailable?: boolean;
    status?: string;
}
declare const UpdateVehicleDto_base: import("@nestjs/common").Type<Partial<CreateVehicleDto>>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
