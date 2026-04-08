export declare class CreateMaintenanceDto {
    date: string;
    vehicleId: string;
    description?: string;
    value: number;
    returnDate?: string;
    status: string;
}
declare const UpdateMaintenanceDto_base: import("@nestjs/common").Type<Partial<CreateMaintenanceDto>>;
export declare class UpdateMaintenanceDto extends UpdateMaintenanceDto_base {
}
export {};
