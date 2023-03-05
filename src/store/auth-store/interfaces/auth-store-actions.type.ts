import { LoginDto } from "../dtos/login.dto"

export type AuthStoreActions = {
    login: (dto: LoginDto) => void
    logout: () => void
    register: () => void
}