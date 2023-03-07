import { User } from '../../../auth/model/user.model'

export type AuthStoreState = {
    token: string | null
    user: User | null
}
