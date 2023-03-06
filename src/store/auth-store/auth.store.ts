import { StateCreator } from 'zustand'
import { authService } from '../../shared/services/auth.service'
import { LoginDto } from './dtos/login.dto'
import { AuthStoreActions } from './interfaces/auth-store-actions.type'
import { AuthStoreState } from './interfaces/auth-store-state.type'
import { ProfessorRegistrationDto } from './dtos/professor-registration.dto'
import { toast } from 'react-toastify'

export type AuthStore = AuthStoreState & AuthStoreActions

const state: AuthStoreState = {
    token: null,
    user: null,
}

export const authStoreSlice: StateCreator<AuthStore> = (set) => ({
    ...state,
    login: async (dto: LoginDto) => {
        const token = await authService.login(dto)
        const user = await authService.getMe(token)
        set((state) => ({
            token,
            user,
        }))
    },
    registerProfessor: async (dto: ProfessorRegistrationDto) => {
        await authService.registerProfessor(dto)
    },
    logout: () => {
        set((state) => ({
            token: null,
            user: null,
        }))
    },
})
