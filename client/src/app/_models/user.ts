export interface User {
    username: string;
    token: string;
    orderCount: number;
    isBlocked : boolean;
    roles: string[];
}