import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { authService } from "../../shared/services/auth.service";
import { LoginDto } from "./dtos/login.dto";
import { AuthStoreActions } from "./interfaces/auth-store-actions.type";
import { AuthStoreState } from "./interfaces/auth-store-state.type";


export type AuthStore = AuthStoreState & AuthStoreActions


const state: AuthStoreState = {
    role: null,
    token: null,
}

export const authStoreSlice: StateCreator<
    AuthStore
> = (set) => ({
    ...state,
    login: async (dto: LoginDto) => {
        const token = await authService.login(dto);
        set(state => ({
            token,
            role: state.role
        }))
    },
    logout: () => {
        set(state => ({
            token: null,
            role: null
        }))
    },
    register: () => { }

})

