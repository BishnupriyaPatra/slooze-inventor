export declare class UserType {
    id: number;
    email: string;
    name: string;
    role: string;
}
export declare class AuthResponse {
    token: string;
    user: UserType;
}
