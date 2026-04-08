export declare class CreateCustomerDto {
    name: string;
    email: string;
    phone: string;
    cep: string;
    street?: string;
    number: string;
    neighborhood?: string;
    city?: string;
    state?: string;
}
declare const UpdateCustomerDto_base: import("@nestjs/common").Type<Partial<CreateCustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
export {};
