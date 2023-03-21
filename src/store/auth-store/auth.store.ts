import { StateCreator } from 'zustand'
import { LoginDto } from './dtos/login.dto'
import { AuthStoreActions } from './interfaces/auth-store-actions.type'
import { AuthStoreState } from './interfaces/auth-store-state.type'

export type AuthStore = AuthStoreState & AuthStoreActions

const state: AuthStoreState = {
    token: null,
    user: null,
}

export const authStoreSlice: StateCreator<AuthStore> = (set, get) => ({
    ...state,
    login: async (dto: LoginDto) => {
        const tokenData = await get().getToken(dto)
        if (tokenData.error) return { data: null, error: tokenData.error }
        const userData = await get().getMe(tokenData.data ?? '')

        console.log(tokenData.data, userData.data)
        set((state) => ({
            token: tokenData.data,
            user: userData.data,
        }))

        return {
            data: userData,
            error: null,
        }
    },
    logout: () => {
        set((state) => ({
            token: null,
            user: null,
        }))
    },
    getToken: async ({ email, password }: LoginDto) => {
        try {
            const resp = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )
            const data = await resp.json()
            if (resp.status != 200) {
                return {
                    data: null,
                    error: data.message,
                }
            }
            return {
                data: data.access_token,
                error: null,
            }
        } catch (e: any) {
            return {
                data: null,
                error: e,
            }
        }
    },
    getMe: async (token: string) => {
        try {
            const resp = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const data = await resp.json()
            return {
                data,
                error: null,
            }
        } catch (e: any) {
            return {
                data: null,
                error: e,
            }
        }
    },
})
