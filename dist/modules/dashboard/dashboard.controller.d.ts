import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(companyId: number): Promise<{
        totalCustomers: number;
        totalVehicles: number;
        totalStockValue: number;
        revenue: {
            weekly: number;
            monthly: number;
            yearly: number;
        };
        lastRentals: {
            id: string;
            date: Date;
            customer: string;
            vehicle: string;
            value: number;
            status: string;
            isOverdue: boolean;
        }[];
        todaysReturns: {
            id: string;
            vehicle: string;
            customer: string;
            returnDate: Date;
            isOverdue: boolean;
        }[];
        maintenance: {
            monthlyValue: number;
            vehiclesInMaintenance: {
                id: string;
                model: string;
                plate: string;
                status: string;
            }[];
        };
    }>;
}
