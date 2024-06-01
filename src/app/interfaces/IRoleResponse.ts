export interface IRoleResponse {
    id: string;
    name: string; 
    normalizedName: string;
    concurrencyStamp: string;
    totalUsers: number;
}