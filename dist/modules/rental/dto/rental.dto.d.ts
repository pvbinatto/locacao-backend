export declare class CreateRentalDto {
    customerId: string;
    vehicleId: string;
    rentalDate: string;
    expectedReturnDate: string;
    rentalValue: number;
    paymentMethod: string;
    observation?: string;
}
export declare class ReturnRentalDto {
    plate: string;
}
