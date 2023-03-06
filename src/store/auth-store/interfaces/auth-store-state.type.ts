import { User } from '../dtos/user.dto'

export type AuthStoreState = {
    token: string | null
    user: User | null
}
