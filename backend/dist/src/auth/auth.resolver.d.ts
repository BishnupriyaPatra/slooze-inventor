import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<AuthResponse>;
}
