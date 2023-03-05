import { LoginDto } from "../../store/auth-store/dtos/login.dto";
import { getAxios } from "./axios-instance";

class AuthService {
    async login({ email, password }: LoginDto) {
        try {
            const resp = await getAxios().post('/auth/login', { email, password })
            return resp.data.access_token
        } catch (e: any) {
            return null
        }
    }
}


export const authService = new AuthService();